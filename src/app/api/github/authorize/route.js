// src/app/api/github/authorize/route.js
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { nanoid } from "nanoid";

export async function GET(request) {
  const { userId } = await auth();

  if (!userId)
    return NextResponse.json(
      { error: "Unauthorized. Please sign in." },
      { status: 401 }
    );

  // Parse URL to get query parameters
  const url = new URL(request.url);
  const repositories = url.searchParams.get("repositories");

  // Generate a random state value to prevent CSRF attacks
  const state = nanoid();

  let authUrl = new URL(
    "https://github.com/apps/codeutilityapp/installations/new"
  );

  // Set the state parameter
  authUrl.searchParams.set("state", state);

  // If specific repositories are requested, add the repository IDs
  if (repositories) {
    authUrl.searchParams.set("suggested_target_id", repositories);
  }

  // Create the response
  const response = NextResponse.json({
    url: authUrl.toString(),
  });

  // Set the state as a cookie to validate on callback
  response.cookies.set("github_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10, // 10 minutes
    path: "/",
  });

  return response;
}
