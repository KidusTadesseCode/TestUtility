// src/app/api/github/webhook/receive/route.js
import { NextResponse } from "next/server";
import prisma from "@/libs/prisma/prisma";
import crypto from "crypto";
import WebSocketServer from "../websocketServer";

export async function POST(request) {
  const signature = request.headers.get("x-hub-signature-256");
  const event = request.headers.get("x-github-event");
  const deliveryId = request.headers.get("x-github-delivery");

  // Only process push events
  if (event !== "push") {
    return NextResponse.json({ message: "Event ignored" });
  }

  // Get request payload
  const payload = await request.json();

  // Get repository information from payload
  const fullName = payload.repository?.full_name;
  if (!fullName) {
    return NextResponse.json(
      { error: "Invalid payload: repository name missing" },
      { status: 400 }
    );
  }

  try {
    // Find repository in database
    const repository = await prisma.repository.findUnique({
      where: { fullName },
    });

    if (!repository) {
      return NextResponse.json(
        { error: "Repository not found in our database" },
        { status: 404 }
      );
    }

    // Verify webhook signature
    if (!verifySignature(request, signature, repository.webhookSecret)) {
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 401 }
      );
    }

    // Extract branch name from ref (refs/heads/branch-name)
    const refParts = payload.ref.split("/");
    const branchName = refParts[refParts.length - 1];

    // Find the branch in our database
    let branch = await prisma.branch.findUnique({
      where: {
        repositoryId_name: {
          repositoryId: repository.id,
          name: branchName,
        },
      },
    });

    // Get the head commit
    const headCommit = payload.head_commit;

    // Update or create branch
    if (branch) {
      branch = await prisma.branch.update({
        where: { id: branch.id },
        data: {
          lastCommitSha: headCommit?.id || branch.lastCommitSha,
          lastCommitMsg: headCommit?.message || branch.lastCommitMsg,
          lastCommitDate: headCommit?.timestamp
            ? new Date(headCommit.timestamp)
            : branch.lastCommitDate,
          updatedAt: new Date(),
        },
      });
    } else if (headCommit) {
      // Create new branch if it doesn't exist
      branch = await prisma.branch.create({
        data: {
          repositoryId: repository.id,
          name: branchName,
          lastCommitSha: headCommit.id,
          lastCommitMsg: headCommit.message,
          lastCommitDate: headCommit.timestamp
            ? new Date(headCommit.timestamp)
            : new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }

    // Update repository last synced time
    await prisma.repository.update({
      where: { id: repository.id },
      data: {
        lastSyncedAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Notify connected clients about the update
    if (branch) {
      WebSocketServer.notifyClients({
        type: "BRANCH_UPDATE",
        repositoryId: repository.id,
        branchName: branch.name,
        updates: {
          lastCommitSha: branch.lastCommitSha,
          lastCommitMsg: branch.lastCommitMsg,
          lastCommitDate: branch.lastCommitDate,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing GitHub webhook:", error);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}

// Helper function to verify webhook signature
function verifySignature(request, signature, secret) {
  if (!signature || !secret) return false;

  const payload = JSON.stringify(request.body);
  const hmac = crypto.createHmac("sha256", secret);
  const digest = "sha256=" + hmac.update(payload).digest("hex");

  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
}
