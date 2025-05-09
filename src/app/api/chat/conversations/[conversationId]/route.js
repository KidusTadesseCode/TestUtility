// src/app/api/chat/conversations/[conversationId]/route.js
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/libs/prisma/prisma";

// --- GET (Keep existing GET handler for messages) ---
export async function GET(request, { params }) {
  console.log("\n\nGET request", __dirname);
  const { userId } = await auth();
  const { conversationId } = await params;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!conversationId) {
    return NextResponse.json(
      { error: "Conversation ID required" },
      { status: 400 }
    );
  }

  try {
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
        userId: userId,
      },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
          select: {
            id: true,
            content: true,
            sender: true,
            // costTokens: true,
            // costUSD: true,
            createdAt: true,
          },
        },
      },
    });

    const aiModelName = conversation.modelName;
    console.log("conversation", conversation);

    if (!conversation || conversation.userId !== userId) {
      return NextResponse.json(
        { error: "Conversation not found or access denied" },
        { status: 404 }
      );
    }

    const formattedMessages = conversation.messages.map((msg) => ({
      id: msg.id,
      text: msg.content,
      sender: msg.sender.toString(),
      // cost: {
      //   totalTokens: msg.costTokens,
      //   totalCostUSD: msg.costUSD,
      // },
      createdAt: msg.createdAt,
    }));

    return NextResponse.json({
      title: conversation.title,
      messages: formattedMessages,
      modelName: aiModelName,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

// --- POST (Keep existing POST handler for messages) ---
export async function POST(request, { params }) {
  console.log("\n\nPOST request", __dirname);
  const { userId } = await auth();
  const { conversationId } = await params;

  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!conversationId) {
    return NextResponse.json(
      { error: "Conversation ID required" },
      { status: 400 }
    );
  }

  try {
    const { sender, text } = await request.json();
    const senderEnum = ["user", "bot"];
    if (!sender || !text || !senderEnum.includes(sender)) {
      return NextResponse.json(
        { error: "Invalid message data" },
        { status: 400 }
      );
    }

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation || conversation.userId !== userId) {
      return NextResponse.json(
        { error: "Conversation not found or access denied" },
        { status: 404 }
      );
    }

    const newMessage = await prisma.$transaction(async (tx) => {
      const createdMsg = await tx.message.create({
        data: {
          conversationId: conversationId,
          sender: sender === "user" ? "user" : "bot",
          content: text,
          // costTokens: cost?.totalTokens,
          // costUSD: cost?.totalCostUSD,
        },
      });

      await tx.conversation.update({
        where: { id: conversationId },
        data: { updatedAt: new Date() },
      });

      if (sender === "user" && conversation.title === "New Chat") {
        await tx.conversation.update({
          where: { id: conversationId },
          data: {
            title: text.substring(0, 50) + (text.length > 50 ? "..." : ""),
          },
        });
      }
      return createdMsg;
    });

    return NextResponse.json(
      {
        id: newMessage.id,
        sender: newMessage.sender.toString(),
        text: newMessage.content,
        // cost: {
        //   totalTokens: newMessage.costTokens,
        //   totalCostUSD: newMessage.costUSD,
        // },
        createdAt: newMessage.createdAt,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding message:", error);
    return NextResponse.json(
      { error: "Failed to add message" },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  const { userId } = await auth();
  const { conversationId } = await params;
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!conversationId) {
    return NextResponse.json(
      { error: "Conversation ID required" },
      { status: 400 }
    );
  }
  try {
    const { title } = await request.json();
    if (title === undefined) {
      return NextResponse.json(
        { error: "Title is required in the request body" },
        { status: 400 }
      );
    }

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
        userId: userId,
      },
      data: {
        title: title.substring(0, 50) + (title.length > 50 ? "..." : ""),
      },
    });
    return NextResponse.json(updatedConversation, { status: 200 });
  } catch (error) {
    console.error("Error adding message:", error);
    return NextResponse.json(
      { error: "Failed to change message" },
      { status: 500 }
    );
  }
}

// --- NEW: DELETE Handler ---
export async function DELETE(request, { params }) {
  const { userId } = await auth();
  const { conversationId } = await params;

  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!conversationId) {
    return NextResponse.json(
      { error: "Conversation ID required" },
      { status: 400 }
    );
  }

  try {
    // Use deleteMany to ensure we only delete if the userId matches.
    // This also handles the case where the conversation might not exist (count will be 0).
    // The `onDelete: Cascade` in the schema handles deleting associated messages.
    const deleteResult = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userId: userId, // IMPORTANT: Ensure the user owns this conversation
      },
    });

    if (deleteResult.count === 0) {
      // Either conversation didn't exist or user didn't own it
      return NextResponse.json(
        { error: "Conversation not found or access denied" },
        { status: 404 }
      );
    }

    // Successfully deleted
    return NextResponse.json(
      { message: "Conversation deleted successfully" },
      { status: 200 }
    );
    // Or return 204 No Content
    // return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting conversation:", error);
    return NextResponse.json(
      { error: "Failed to delete conversation" },
      { status: 500 }
    );
  }
}
