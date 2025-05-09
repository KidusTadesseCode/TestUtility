// src/app/api/github/repositories/route.js
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/libs/prisma/prisma";
import { Octokit } from "@octokit/rest";
import { RequestError } from "@octokit/request-error";

const l = console.log;
async function fetchBranchesOctokit(owner, repo, octokit) {
  try {
    const response = await octokit.rest.repos.listBranches({
      owner,
      repo,
      per_page: 100,
    });
    return response.data || [];
  } catch (error) {
    l(`Error fetching branches for ${owner}/${repo}:`, error);
    return [];
  }
}

async function fetchLatestCommitOctokit(owner, repo, branchName, octokit) {
  try {
    const response = await octokit.rest.repos.getCommit({
      owner,
      repo,
      ref: branchName,
    });
    return response.data;
  } catch (error) {
    l(`Error fetching commit for ${owner}/${repo}/${branchName}:`, error);
    return null;
  }
}

async function fetchRepoBranchDetailsOctokit(repoFullName, octokit) {
  const [owner, repo] = repoFullName.split("/");
  if (!owner || !repo) {
    l(`Invalid repo full name: ${repoFullName}`);
    return [];
  }

  l(` > Fetching branches for ${owner}/${repo}...`);
  const githubBranches = await fetchBranchesOctokit(owner, repo, octokit);
  if (!githubBranches || githubBranches.length === 0) {
    l(` > No branches found or fetch failed for ${owner}/${repo}.`);
    return [];
  }
  l(
    ` > Found ${githubBranches.length} branches for ${owner}/${repo}. Fetching latest commits...`
  );

  const branchDetailsPromises = githubBranches.map(async (branch) => {
    const latestCommit = await fetchLatestCommitOctokit(
      owner,
      repo,
      branch.name,
      octokit
    );
    if (!latestCommit) {
      l(
        ` >> Warning: Skipping branch '${branch.name}' in ${repoFullName} due to commit fetch failure.`
      );
      return null;
    }
    return {
      name: branch.name,
      lastCommitSha: latestCommit.sha,
      lastCommitDate: latestCommit.commit?.committer?.date
        ? new Date(latestCommit.commit.committer.date)
        : latestCommit.commit?.author?.date
        ? new Date(latestCommit.commit.author.date)
        : null,
    };
  });

  const results = (await Promise.all(branchDetailsPromises)).filter(Boolean);
  l(
    ` > Finished fetching commit details for ${results.length} branches in ${owner}/${repo}.`
  );
  return results;
}

// --- API Route Handler (GET) ---
export async function GET() {
  l("\n--- GitHub Repositories Sync Start ---");
  // ... (Keep Authentication, GitHub Account Fetching, Octokit setup, Repo/Branch fetching logic) ...
  let session;
  try {
    // 1. Authentication & Authorization
    session = await auth();
    const userId = session?.userId;

    if (!userId) {
      l("Unauthorized access attempt: No userId found in session.");
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    l(`Sync initiated for user: ${userId}`);

    // 2. Get User's GitHub Account Info
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { githubAccounts: { take: 1 } },
    });

    if (!user?.githubAccounts || user.githubAccounts.length === 0) {
      l(`No GitHub account found linked for user: ${userId}`);
      return NextResponse.json(
        { error: "GitHub account not connected." },
        { status: 404 }
      );
    }

    const githubAccount = user.githubAccounts[0];
    const { accessToken, id: githubAccountId, installationId } = githubAccount;

    if (!accessToken) {
      l(
        `GitHub access token (assumed Installation Token) is missing for user ${userId}.`
      );
      return NextResponse.json(
        { error: "GitHub access token missing. Cannot authenticate." },
        { status: 401 }
      );
    }
    l(`Using GitHub Account ID: ${githubAccountId}`);

    // 3. Initialize Octokit
    const octokit = new Octokit({ auth: accessToken });

    // 4. Fetch Repositories
    l("Fetching repositories from GitHub API (/installation/repositories)...");
    let githubRepos = [];
    try {
      const iterator = octokit.paginate.iterator(
        octokit.rest.apps.listReposAccessibleToInstallation,
        {
          per_page: 100,
          headers: { "X-GitHub-Api-Version": "2022-11-28" },
        }
      );
      for await (const { data: reposPage } of iterator) {
        githubRepos.push(...reposPage);
      }
      l(
        `Fetched ${githubRepos.length} repositories accessible to the installation.`
      );
    } catch (error) {
      // ... (keep existing repo fetch error handling) ...
      l("GitHub API error fetching installation repositories:", error);
      if (error instanceof RequestError) {
        l(
          `GitHub API RequestError: Status ${error.status}, Message: ${error.message}`
        );
        if (error.status === 401) {
          l("GitHub Installation Token is invalid or expired.");
          return NextResponse.json(
            {
              error:
                "GitHub authorization failed (Invalid/Expired Installation Token).",
            },
            { status: 401 }
          );
        }
        if (error.status === 404 && error.message.includes("installation")) {
          l("GitHub App Installation not found.");
          return NextResponse.json(
            { error: "GitHub App Installation not found or access revoked." },
            { status: 404 }
          );
        }
        if (error.status === 403) {
          l(`GitHub API Forbidden: ${error.message}`);
          return NextResponse.json(
            { error: `GitHub API Forbidden: ${error.message}` },
            { status: 403 }
          );
        }
        if (error.status === 429) {
          const retryAfter = error.response?.headers?.["retry-after"];
          const rateLimitReset = error.response?.headers?.["x-ratelimit-reset"];
          let message = "GitHub API rate limit exceeded.";
          if (rateLimitReset) {
            message += ` Please try again after ${new Date(
              parseInt(rateLimitReset, 10) * 1000
            ).toLocaleTimeString()}.`;
          }
          l(message);
          return NextResponse.json(
            { error: message },
            {
              status: 429,
              headers: retryAfter ? { "Retry-After": retryAfter } : {},
            }
          );
        }
        throw error;
      }
      throw error;
    }

    // 5. Fetch Branch Details
    l("Fetching branch and commit details for all repositories...");
    const repoBranchDetailsMap = new Map();
    const fetchBranchDetailsPromises = githubRepos.map((repo) =>
      fetchRepoBranchDetailsOctokit(repo.full_name, octokit)
        .then((details) => {
          repoBranchDetailsMap.set(repo.full_name, details || []);
        }) // Ensure always set array
        .catch((error) => {
          l(`Error processing branch details for ${repo.full_name}:`, error);
          repoBranchDetailsMap.set(repo.full_name, []);
        })
    );
    await Promise.all(fetchBranchDetailsPromises);
    l("Finished fetching all branch and commit details.");

    // 6. Get Existing DB Repos
    l("Fetching existing repositories from database...");
    const existingDbRepos = await prisma.repository.findMany({
      where: { githubAccountId },
    });
    l(`Found ${existingDbRepos.length} existing repositories in DB.`);
    const existingDbRepoMap = new Map(
      existingDbRepos.map((repo) => [String(repo.githubRepoId), repo])
    );
    const githubRepoMap = new Map(
      githubRepos.map((repo) => [String(repo.id), repo])
    );

    // 7. Perform Database Sync within a Transaction
    l("Starting database synchronization transaction...");

    // **** INCREASE TIMEOUT HERE ****
    const TRANSACTION_TIMEOUT_MS = 20000; // Increase to 20 seconds (adjust as needed)
    l(` > Setting transaction timeout to ${TRANSACTION_TIMEOUT_MS}ms`);

    const syncResults = await prisma.$transaction(
      async (tx) => {
        // --- (Transaction Logic: Deletes, Creates, Updates - Keep this logic) ---
        const transactionPromises = [];
        const githubRepoIdsFetched = new Set(githubRepoMap.keys());

        // --- Deletes ---
        l(" > Checking for repositories to delete...");
        const reposToDelete = existingDbRepos.filter(
          (dbRepo) => !githubRepoIdsFetched.has(String(dbRepo.githubRepoId))
        );
        if (reposToDelete.length > 0) {
          l(
            ` >> Scheduling deletion for ${reposToDelete.length} repositories...`
          );
          transactionPromises.push(
            tx.repository.deleteMany({
              where: { id: { in: reposToDelete.map((r) => r.id) } },
            })
          );
        } else {
          l(" >> No repositories need deletion.");
        }

        // --- Creates / Updates ---
        l(" > Checking for repositories to create or update...");
        for (const githubRepo of githubRepos) {
          const githubRepoIdStr = String(githubRepo.id);
          const repoFullName = githubRepo.full_name;
          const existingRepo = existingDbRepoMap.get(githubRepoIdStr);
          const branchDetails = repoBranchDetailsMap.get(repoFullName) || [];
          const repoData = {
            name: githubRepo.name,
            fullName: repoFullName,
            private: githubRepo.private,
            description: githubRepo.description ?? "",
            defaultBranch: githubRepo.default_branch,
            lastSyncedAt: new Date(),
          };

          if (existingRepo) {
            // UPDATE
            l(
              ` >> Updating repository: ${repoFullName} (DB ID: ${existingRepo.id})`
            );
            const githubBranchNames = new Set(branchDetails.map((b) => b.name));
            transactionPromises.push(
              tx.repository.update({
                where: {
                  githubAccountId_githubRepoId: {
                    githubAccountId: githubAccountId,
                    githubRepoId: githubRepoIdStr,
                  },
                },
                data: {
                  ...repoData,
                  updatedAt: new Date(),
                  branches: {
                    deleteMany: {
                      name: { notIn: Array.from(githubBranchNames) },
                    },
                    upsert: branchDetails.map((branch) => ({
                      where: {
                        repositoryId_name: {
                          repositoryId: existingRepo.id,
                          name: branch.name,
                        },
                      },
                      create: {
                        name: branch.name,
                        lastCommitSha: branch.lastCommitSha,
                        lastCommitDate: branch.lastCommitDate,
                      },
                      update: {
                        lastCommitSha: branch.lastCommitSha,
                        lastCommitDate: branch.lastCommitDate,
                        updatedAt: new Date(),
                      },
                    })),
                  },
                },
              })
            );
          } else {
            // CREATE
            l(` >> Creating new repository: ${repoFullName}`);
            transactionPromises.push(
              tx.repository.create({
                data: {
                  ...repoData,
                  githubAccountId: githubAccountId,
                  githubRepoId: githubRepoIdStr,
                  branches: {
                    create: branchDetails.map((branch) => ({
                      name: branch.name,
                      lastCommitSha: branch.lastCommitSha,
                      lastCommitDate: branch.lastCommitDate,
                    })),
                  },
                },
              })
            );
          }
        } // End loop

        l(
          ` > Executing ${transactionPromises.length} database operations batches...`
        );
        // This Promise.all is where the timeout was likely occurring
        const results = await Promise.all(transactionPromises);
        l(" > Transaction database operations completed.");
        return results; // Transaction commits here if successful
      },
      {
        // Pass the options object here
        timeout: TRANSACTION_TIMEOUT_MS,
      }
    ); // End $transaction

    l(
      `Transaction successful. Processed operations (results count may vary): ${syncResults.length}.`
    );

    // 8. Fetch final state
    l("Fetching final repository state from database...");
    const finalRepositories = await prisma.repository.findMany({
      where: { githubAccountId },
      include: { branches: { orderBy: { updatedAt: "desc" } } },
      orderBy: { updatedAt: "desc" },
    });

    l(
      `--- GitHub Repositories Sync End --- Returning ${finalRepositories.length} repositories post-sync.`
    );
    return NextResponse.json({ repositories: finalRepositories });
  } catch (error) {
    // ... (Keep existing generic error handling) ...
    l("--- GitHub Repositories Sync Error ---");
    console.error("Error during GitHub repository sync:", error); // Log the full error server-side
    let status = 500;
    let message = "Failed to synchronize GitHub repositories.";
    let details;

    // Check if it's the specific transaction timeout error
    if (error instanceof Error && "code" in error && error.code === "P2028") {
      status = 504; // Gateway Timeout might be more appropriate than 500
      message =
        "Database transaction timed out during synchronization. The process took too long.";
      details =
        process.env.NODE_ENV === "development"
          ? `Transaction timeout occurred. Consider increasing the timeout beyond ${TRANSACTION_TIMEOUT_MS}ms or optimizing the sync process.`
          : undefined;
    } else if (error instanceof RequestError) {
      // Handle Octokit errors
      status = error.status || 500;
      message = `GitHub API Error: ${error.message}`;
      details =
        process.env.NODE_ENV === "development" ? error.message : undefined;
    } else if (error instanceof Error) {
      details =
        process.env.NODE_ENV === "development" ? error.message : undefined;
    } else {
      details =
        process.env.NODE_ENV === "development" ? String(error) : undefined;
    }

    return NextResponse.json(
      { error: message, details: details },
      { status: status }
    );
  }
}
