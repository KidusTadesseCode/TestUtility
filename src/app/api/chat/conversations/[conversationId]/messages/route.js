// src/app/api/chat/conversations/[conversationId]/messages/route.js
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/libs/prisma/prisma";

console.log(process.cwd());
// GET: Load messages for a specific conversation
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
    // Verify the conversation belongs to the user
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
    });
    console.log("conversation", conversation);

    if (!conversation || conversation.userId !== userId) {
      return NextResponse.json(
        { error: "Conversation not found or access denied" },
        { status: 404 }
      );
    }

    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
      select: {
        // Select specific fields to match frontend state structure
        id: true,
        content: true,
        sender: true,
        // costTokens: true,
        // costUSD: true,
        createdAt: true,
      },
    });

    // Map sender enum back to string ('user'/'bot') if needed by frontend
    const formattedMessages = messages.map((msg) => ({
      ...msg,
      text: msg.content, // Rename content to text
      sender: msg.sender.toString(), // Convert enum to string
      // cost: {
      //   // Reconstruct cost object
      //   totalTokens: msg.costTokens,
      //   totalCostUSD: msg.costUSD,
      // },
    }));

    return NextResponse.json(formattedMessages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

// POST: Add a message to a conversation
export async function POST(request, { params }) {
  console.log("\n\nPOST request", __dirname);
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
    const { messageID, createdAt, sender, text } = await request.json();
    // const cost = req.cost;
    const senderEnum = ["user", "bot"];
    if (!sender || !text || !senderEnum.includes(sender)) {
      return NextResponse.json(
        { error: "Invalid message data" },
        { status: 400 }
      );
    }

    if (sender === "user") {
      console.log("sender", sender.toUpperCase());
      console.log("text", text);
    }

    const createdat = new Date(createdAt);

    // Verify the conversation belongs to the user before adding message
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
    });
    if (!conversation || conversation.userId !== userId) {
      return NextResponse.json(
        { error: "Conversation not found or access denied" },
        { status: 404 }
      );
    }

    // Use a transaction to create message and update conversation timestamp
    const newMessage = await prisma.$transaction(async (tx) => {
      const createdMsg = await tx.message.create({
        data: {
          id: messageID,
          createdAt: createdat,
          conversationId: conversationId,
          sender: sender === "user" ? "user" : "bot",
          content: text,
          // costTokens: cost?.totalTokens,
          // costUSD: cost?.totalCostUSD,
        },
      });
      // Update the conversation's updatedAt timestamp
      await tx.conversation.update({
        where: { id: conversationId },
        data: { updatedAt: new Date() },
      });
      // Update title with first user message if it's the default
      if (sender === "user" && conversation.title === "New Chat") {
        await tx.conversation.update({
          where: { id: conversationId },
          data: {
            title: text.substring(0, 50) + (text.length > 50 ? "..." : ""),
          }, // Limit title length
        });
      }

      return createdMsg;
    });

    // Return the created message (or just success status)
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

// saveMessageToDatabase message.createdAt: Wed May 07 2025 16:05:34 GMT-0400 (Eastern Daylight Time)
// Wed May 07 2025 16:05:34 GMT-0400 (Eastern Daylight Time)
// 2025-05-07T20:01:03.405Z
// 2025-05-07T20:01:03.405Z
