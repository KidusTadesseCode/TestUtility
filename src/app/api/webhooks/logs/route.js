// src/app/api/webhooks/logs/route.js
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/libs/prisma/prisma";

// Create a Prisma model for webhook logs if you want to persist them
// For now we'll use an in-memory array for simplicity
const webhookLogs = [];
const MAX_LOGS = 100;

export async function GET(request) {
  const { userId, sessionId } = auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized. Please sign in." },
      { status: 401 }
    );
  }

  try {
    // Get the user to check if they're an admin
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // In a real app, check if user is an admin
    // For now we'll just return the logs

    return NextResponse.json({ logs: webhookLogs });
  } catch (error) {
    console.error("Error fetching webhook logs:", error);
    return NextResponse.json(
      { error: "Failed to fetch webhook logs" },
      { status: 500 }
    );
  }
}

/**
 * Log a webhook event
 * @param {string} eventType - The type of event
 * @param {string} status - The status of the event (success, error)
 * @param {Object} data - The event data
 * @param {string} [error] - Error message if applicable
 */
export function logWebhookEvent(eventType, status, data, error = null) {
  const logEntry = {
    id: Date.now().toString(),
    timestamp: new Date(),
    eventType,
    status,
    data: JSON.stringify(data),
    error,
  };

  // Add to the beginning of the array
  webhookLogs.unshift(logEntry);

  // Keep only the latest MAX_LOGS entries
  if (webhookLogs.length > MAX_LOGS) {
    webhookLogs.pop();
  }

  console.log(
    `Webhook log: ${eventType} - ${status}${error ? ` - Error: ${error}` : ""}`
  );
}
