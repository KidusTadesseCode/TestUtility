// src/app/api/chat/conversations/route.js
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/libs/prisma/prisma";

// GET: List user's conversations (Keep this as is)
export async function GET() {
  console.log("\n\nGET request", __dirname);
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const conversations = await prisma.conversation.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      select: { id: true, title: true, updatedAt: true, modelName: true },
    });
    console.log("conversations:", conversations);
    return NextResponse.json(conversations);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return NextResponse.json(
      { error: "Failed to fetch conversations" },
      { status: 500 }
    );
  }
}

// POST: Create a NEW conversation
export async function POST(request) {
  console.log("\n\nPOST request", __dirname);
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { modelName } = await request.json();
    if (!modelName) {
      return NextResponse.json(
        { error: "AI model name (modelName) is required in the request body" },
        { status: 400 }
      );
    }
    // Always create a new conversation
    const newConversation = await prisma.conversation.create({
      data: {
        userId: userId,
        title: "New Chat", // Default title, will be updated on first message
        modelName: modelName,
      },
    });

    // Return the new conversation ID
    return NextResponse.json(
      { conversationId: newConversation.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating conversation:", error);
    return NextResponse.json(
      { error: "Failed to create conversation" },
      { status: 500 }
    );
  }
}
