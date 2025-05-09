// src/app/api/github/status/route.js
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/libs/prisma/prisma";

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized. Please sign in." },
      { status: 401 }
    );
  }

  try {
    // Check if the user has a GitHub account connected
    const githubAccount = await prisma.githubAccount.findFirst({
      where: { userId },
    });

    if (!githubAccount) {
      return NextResponse.json({ connected: false });
    }

    // Check if the token is still valid by making a simple GitHub API call
    try {
      const response = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${githubAccount.accessToken}`,
          Accept: "application/vnd.github+json",
        },
      });

      if (response.status === 401) {
        // Token is invalid, attempt to refresh if possible
        if (githubAccount.refreshToken) {
          const refreshed = await refreshGitHubToken(githubAccount);
          return NextResponse.json({ connected: refreshed });
        } else {
          // Cannot refresh, token is invalid
          return NextResponse.json({ connected: false });
        }
      }

      // Token is valid
      return NextResponse.json({
        connected: true,
        username: githubAccount.githubUsername,
      });
    } catch (error) {
      console.error("Error verifying GitHub token:", error);
      return NextResponse.json({ connected: false, error: error.message });
    }
  } catch (error) {
    console.error("Error checking GitHub connection status:", error);
    return NextResponse.json(
      { error: "Failed to check GitHub connection status" },
      { status: 500 }
    );
  }
}

// Helper function to refresh GitHub token
async function refreshGitHubToken(githubAccount) {
  try {
    if (!githubAccount.refreshToken) {
      return false;
    }

    const response = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          refresh_token: githubAccount.refreshToken,
          grant_type: "refresh_token",
        }),
      }
    );

    const data = await response.json();

    if (data.error || !data.access_token) {
      return false;
    }

    // Update token in database
    await prisma.githubAccount.update({
      where: { id: githubAccount.id },
      data: {
        accessToken: data.access_token,
        refreshToken: data.refresh_token || githubAccount.refreshToken,
        expiresAt: data.expires_in
          ? new Date(Date.now() + data.expires_in * 1000)
          : null,
        updatedAt: new Date(),
      },
    });

    return true;
  } catch (error) {
    console.error("Error refreshing GitHub token:", error);
    return false;
  }
}
