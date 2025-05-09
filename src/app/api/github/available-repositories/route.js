// src/app/api/github/available-repositories/route.js
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { Octokit } from "@octokit/rest";

export async function GET() {
  const { userId } = await auth();

  console.log("userId:", userId);
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized. Please sign in." },
      { status: 401 }
    );
  }

  try {
    // Create a personal access token for this API call only
    // This is just to list repositories before installation
    const octokit = new Octokit({
      auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
    });

    // For a real implementation, you should have the user authenticate with GitHub
    // first using OAuth, then use their token to fetch repositories
    // This is a simplified example that uses a personal access token

    // Fetch the first page of repositories (100 per page)
    const response = await octokit.repos.listForAuthenticatedUser({
      per_page: 100,
      sort: "updated",
    });

    // Format the repositories
    const repositories = response.data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      private: repo.private,
      description: repo.description || "",
      default_branch: repo.default_branch,
      owner: {
        login: repo.owner.login,
        id: repo.owner.id,
      },
    }));

    return NextResponse.json({ repositories });
  } catch (error) {
    console.error("Error fetching available repositories:", error);
    return NextResponse.json(
      { error: "Failed to fetch available repositories" },
      { status: 500 }
    );
  }
}
