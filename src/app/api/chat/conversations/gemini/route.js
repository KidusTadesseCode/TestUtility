// src/app/api/chat/conversations/gemini/route.js
import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

// GET: List user's conversations (Keep this as is)
export async function POST(request) {
  const { userId } = await auth();

  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { messages, modelName, temperature } = await request.json();
    // systemInstruction
    const model = modelName || "gemini-1.5-flash-latest";
    const aiTemperature = temperature || 1;
    if (!messages) {
      return NextResponse.json(
        { error: "Invalid message data" },
        { status: 400 }
      );
    }

    const result = streamText({
      model: google(model),
      // system: systemInstruction,
      temperature: aiTemperature,
      providerOptions: {
        google: { responseModalities: ["TEXT"] },
      },
      messages: [...messages],
      onError({ error }) {
        throw error;
      },
    });
    return result.toDataStreamResponse();

    // return NextResponse.json({ text: result.text }, { status: 201 });
  } catch (error) {
    console.error("Error adding message:", error);
    return NextResponse.json(
      { error: "Failed to add message" },
      { status: 500 }
    );
  }
}
