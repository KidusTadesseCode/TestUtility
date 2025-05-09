// src/app/api/github/websocket/route.js
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { nanoid } from "nanoid";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized. Please sign in." },
      { status: 401 }
    );
  }

  try {
    const token = nanoid();
    return NextResponse.json({
      url: `${
        process.env.NODE_ENV === "production" ? "wss" : "ws"
      }://${process.env.NEXT_PUBLIC_APP_URL.replace("https://", "").replace(
        "http://",
        ""
      )}/api/github/websocket?token=${encodeURIComponent(token)}`,
      token,
    });
  } catch (error) {
    console.error("Error generating WebSocket token:", error);
    return NextResponse.json(
      { error: "Failed to generate WebSocket token" },
      { status: 500 }
    );
  }
}
