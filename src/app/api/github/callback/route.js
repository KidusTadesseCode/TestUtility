// src/app/api/github/callback/route.js
import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import prisma from "@/libs/prisma/prisma"; // Ensure this path is correct
import { createAppAuth } from "@octokit/auth-app";
import { Octokit } from "@octokit/rest";

const l = console.log; // Keep console logs for debugging as requested

// Initialize Octokit for app authentication
const appAuth = createAppAuth({
  appId: process.env.GITHUB_APP_ID,
  privateKey: process.env.GITHUB_PRIVATE_KEY,
  clientId: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
});

export async function GET(request) {
  l("\n--- GitHub Callback Start ---");
  // l("appAuth", appAuth); // Logging the function itself might not be useful

  const { userId } = await auth();
  l("Clerk User ID:", userId);

  if (!userId) {
    console.error("GitHub Callback Error: User not authenticated via Clerk.");
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/sign-in`);
  }

  // --- 1. Extract Parameters & Validate State ---
  const url = new URL(request.url);
  const code = url.searchParams.get("code"); // OAuth code for user auth (keep for potential future use)
  const state = url.searchParams.get("state");
  const installationId = url.searchParams.get("installation_id");

  l("URL:", url.href);
  l("Code:", code);
  l("State:", state);
  l("Installation ID:", installationId);

  if (!installationId) {
    console.error("GitHub Callback Error: Missing installation_id parameter.");
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/github?error=missing_installation_id`
    );
  }

  // Get the stored state from cookie
  const storedState = request.cookies.get("github_oauth_state")?.value;
  l("Stored State Cookie:", storedState);

  // Validate state to prevent CSRF attacks
  if (!storedState || state !== storedState) {
    console.error(
      "GitHub Callback Error: Invalid state parameter. Potential CSRF attack."
    );
    const response = NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/github?error=invalid_state`
    );
    // Clear the invalid cookie
    response.cookies.delete("github_oauth_state");
    return response;
  }

  // Prepare response and clear the state cookie (do this early)
  const successRedirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/github?success=connected`;
  const errorRedirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/github?error=callback_failed`; // More specific generic error
  const response = NextResponse.redirect(successRedirectUrl); // Start with optimistic redirect
  response.cookies.delete("github_oauth_state"); // Clear cookie

  try {
    // --- 2. Authenticate as the App Installation ---
    const authResult = await appAuth({
      type: "installation",
      installationId: installationId, // Use the number directly if required by library, or string
    });
    l("authResult:", authResult);
    const { token: installationToken } = authResult;
    l("installationToken:", installationToken); // Don't log the full token

    // Create an Octokit instance authenticated with the installation token
    const octokit = new Octokit({
      auth: installationToken,
    });

    // l("octokit:", octokit);

    // --- 3. Ensure Local User Exists ---
    let user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      l(`User ${userId} not found locally, creating...`);
      const clerkUser = await clerkClient.users.getUser(userId);
      // Prioritize primary email, but fall back if needed
      const primaryEmail = clerkUser.emailAddresses.find(
        (e) => e.id === clerkUser.primaryEmailAddressId
      );
      const email =
        primaryEmail?.emailAddress || clerkUser.emailAddresses[0]?.emailAddress;

      if (!email) {
        console.error(
          `GitHub Callback Error: Could not find email for Clerk user ${userId}.`
        );
        // Redirect with error immediately
        response.headers.set(
          "Location",
          `${process.env.NEXT_PUBLIC_APP_URL}/github?error=missing_user_email`
        );
        return response;
        // throw new Error("User email not found in Clerk."); // Or throw if preferred
      }

      user = await prisma.user.create({
        data: {
          id: userId,
          email,
        },
      });
      l(`Created local user ${userId} with email ${email}.`);
    } else {
      l(`Found existing local user ${userId}.`);
    }

    // --- 4. Upsert GitHub Account Link ---
    // Link the installation to the local user.
    // We store installationId. Other GitHub user fields remain null/optional here.
    const githubAccountData = {
      userId: userId,
      accessToken: installationToken,
      installationId: installationId.toString(), // Ensure it's a string for the schema
      // Do NOT add user-specific GitHub details (githubUserId, username, accessToken) here
      // They come from a separate user OAuth flow if you implement it
    };
    l("Attempting to upsert GithubAccount with data:", githubAccountData);

    const githubAccount = await prisma.githubAccount.upsert({
      where: {
        // Use the composite unique key defined in the schema: @@unique([userId, installationId])
        // Prisma generates the name `userId_installationId` by default
        userId_installationId: {
          userId: userId,
          installationId: installationId.toString(),
        },
      },
      update: {
        // Only update timestamp or fields that might change on reinstall
        updatedAt: new Date(),
        // Potentially update installationId if it could change for the same user? Unlikely.
      },
      create: {
        // Spread the base data, includes userId and installationId
        ...githubAccountData,
        // Explicitly set other required fields if any, or rely on schema defaults/optionality
        // Ensure schema allows nulls for githubUserId, githubUsername, accessToken etc.
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    l(
      `Upserted GitHubAccount. ID: ${githubAccount.id}, UserID: ${githubAccount.userId}, InstallationID: ${githubAccount.installationId}`
    );

    // --- 5. Fetch and Process Repositories ---
    l("Fetching accessible repositories for installation...");
    // Use pagination for installations with many repositories
    const repoPaginator = octokit.paginate.iterator(
      octokit.rest.apps.listReposAccessibleToInstallation,
      {
        per_page: 100, // Fetch 100 repos per page
      }
    );

    let repositoriesProcessed = 0;
    for await (const { data: reposPage } of repoPaginator) {
      l(`Processing page with ${reposPage.length} repositories.`);
      for (const repo of reposPage) {
        const repoData = {
          githubAccountId: githubAccount.id, // Link to the upserted GithubAccount record
          githubRepoId: repo.id.toString(), // Store GitHub's unique repo ID (as string)
          name: repo.name,
          fullName: repo.full_name,
          private: repo.private,
          description: repo.description || "", // Handle null description
          defaultBranch: repo.default_branch,
          // lastSyncedAt: new Date(), // Update this only when you actually sync content
          updatedAt: new Date(),
        };

        l(`Upserting Repository: ${repo.full_name} (ID: ${repo.id})`);
        await prisma.repository.upsert({
          where: {
            // Use the composite unique key: @@unique([githubAccountId, githubRepoId])
            // Prisma generates the name `githubAccountId_githubRepoId`
            githubAccountId_githubRepoId: {
              githubAccountId: githubAccount.id,
              githubRepoId: repo.id.toString(),
            },
          },
          update: {
            // Update fields that might change (name, description, private, defaultBranch)
            name: repo.name,
            fullName: repo.full_name,
            private: repo.private,
            description: repo.description || "",
            defaultBranch: repo.default_branch,
            updatedAt: new Date(),
            // Reset sync timestamp maybe? Or keep it? Depends on logic.
            // lastSyncedAt: null,
          },
          create: {
            ...repoData,
            createdAt: new Date(), // Set createdAt only on creation
          },
        });
        repositoriesProcessed++;
      }
    }
    l(`Processed ${repositoriesProcessed} repositories in total.`);

    // --- 6. Redirect on Success ---
    l(
      "GitHub Callback: Process completed successfully. Redirecting to:",
      successRedirectUrl
    );
    return response;
  } catch (error) {
    console.error("GitHub Callback Error: Failed during processing:", error);
    response.headers.set("Location", errorRedirectUrl);
    return response;
  } finally {
    l("--- GitHub Callback End ---");
  }
}
