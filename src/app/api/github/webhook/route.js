// src/app/api/github/webhook/route.js
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/libs/prisma/prisma";
import crypto from "crypto";

export async function POST(request) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized. Please sign in." },
      { status: 401 }
    );
  }

  try {
    const { repositoryId } = await request.json();

    if (!repositoryId) {
      return NextResponse.json(
        { error: "Repository ID is required" },
        { status: 400 }
      );
    }

    // Get repository from database
    const repository = await prisma.repository.findUnique({
      where: { id: repositoryId },
      include: { githubAccount: true },
    });

    if (!repository) {
      return NextResponse.json(
        { error: "Repository not found" },
        { status: 404 }
      );
    }

    // Check if user owns this repository
    if (repository.githubAccount.userId !== userId) {
      return NextResponse.json(
        { error: "Unauthorized to access this repository" },
        { status: 403 }
      );
    }

    // Check if webhook already exists
    if (repository.webhookId) {
      return NextResponse.json({
        message: "Webhook already exists for this repository",
        webhookId: repository.webhookId,
      });
    }

    // Generate webhook secret
    const webhookSecret = crypto.randomBytes(32).toString("hex");

    // Create webhook in GitHub repository
    const response = await fetch(
      `https://api.github.com/repos/${repository.fullName}/hooks`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${repository.githubAccount.accessToken}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "web",
          active: true,
          events: ["push", "pull_request"],
          config: {
            url: `${process.env.NEXT_PUBLIC_APP_URL}/api/github/webhook/receive`,
            content_type: "json",
            secret: webhookSecret,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`GitHub API error: ${errorData.message}`);
    }

    const hookData = await response.json();

    // Update repository with webhook info
    await prisma.repository.update({
      where: { id: repositoryId },
      data: {
        webhookId: hookData.id.toString(),
        webhookSecret: webhookSecret,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      message: "Webhook created successfully",
      webhookId: hookData.id.toString(),
    });
  } catch (error) {
    console.error("Error setting up GitHub webhook:", error);
    return NextResponse.json(
      { error: "Failed to set up webhook" },
      { status: 500 }
    );
  }
}
