// src/app/api/webhooks/clerk/route.js
import { NextResponse } from "next/server";
import { verifyClerkWebhookSignature } from "@/libs/clerk/webhookUtils";
import { PrismaClient } from "@prisma/client";
import { logWebhookEvent } from "../logs/route";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    // Clone the request to preserve its body for verification
    const requestClone = request.clone();

    // Get webhook secret from environment variables
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

    // Verify the webhook signature first
    const { isValid, payload, error } = await verifyClerkWebhookSignature(
      requestClone,
      webhookSecret
    );

    if (!isValid) {
      console.error("Error verifying webhook:", error);
      logWebhookEvent("signature_verification", "error", {}, error);
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 401 }
      );
    }

    // Parse the webhook event from the payload
    const eventData = payload;
    const { type, data } = eventData;

    console.log(`✅ Processing webhook event: ${type}`);
    logWebhookEvent(type, "received", data);

    // Handle different event types
    switch (type) {
      case "user.created":
        await handleUserCreated(data);
        break;
      case "user.updated":
        await handleUserUpdated(data);
        break;
      case "user.deleted":
        await handleUserDeleted(data);
        break;
      // Add other event types as needed
      default:
        logWebhookEvent(type, "unhandled", data);
        console.log(`⚠️ Unhandled webhook event type: ${type}`);
    }

    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error processing webhook:", error);
    logWebhookEvent("webhook_processing", "error", {}, error.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Handle user.created event
 * @param {Object} userData - The user data from Clerk
 */
async function handleUserCreated(userData) {
  try {
    const { id, email_addresses } = userData;
    if (!id) {
      console.error("Missing user ID in webhook data");
      logWebhookEvent("user.created", "error", userData, "Missing user ID");
      return;
    }

    // Get primary email
    const primaryEmail = email_addresses?.find(
      (email) => email.id === userData.primary_email_address_id
    );
    const emailValue = primaryEmail?.email_address;

    if (!emailValue) {
      console.error("User has no primary email address");
      logWebhookEvent(
        "user.created",
        "error",
        userData,
        "Missing primary email"
      );
      return;
    }

    // Check if user already exists (should not, but let's be safe)
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (existingUser) {
      logWebhookEvent(
        "user.created",
        "skipped",
        userData,
        "User already exists"
      );
      return;
    }

    // Create user in database
    await prisma.user.create({
      data: {
        id,
        email: emailValue,
        // Add any other fields you want to store
      },
    });
    logWebhookEvent("user.created", "success", userData);
  } catch (error) {
    console.error("❌ Error handling user.created event:", error);
    logWebhookEvent("user.created", "error", userData, error.message);
  }
}

/**
 * Handle user.updated event
 * @param {Object} userData - The user data from Clerk
 */
async function handleUserUpdated(userData) {
  try {
    console.log("👤 Processing user.updated event");
    const { id, email_addresses } = userData;

    if (!id) {
      console.error("Missing user ID in webhook data");
      logWebhookEvent("user.updated", "error", userData, "Missing user ID");
      return;
    }

    // Get primary email
    const primaryEmail = email_addresses?.find(
      (email) => email.id === userData.primary_email_address_id
    );
    const emailValue = primaryEmail?.email_address;

    if (!emailValue) {
      console.error("User has no primary email address");
      logWebhookEvent(
        "user.updated",
        "error",
        userData,
        "Missing primary email"
      );
      return;
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      // User doesn't exist, create it
      await prisma.user.create({
        data: {
          id,
          email: emailValue,
        },
      });
      console.log(`👤 User ${id} didn't exist, created in database`);
      logWebhookEvent(
        "user.updated",
        "created",
        userData,
        "User did not exist, created new user"
      );
      return;
    }

    // Update user in database
    await prisma.user.update({
      where: { id },
      data: {
        email: emailValue,
        updatedAt: new Date(),
      },
    });

    console.log(`✅ Updated user ${id} in database`);
    logWebhookEvent("user.updated", "success", userData);
  } catch (error) {
    console.error("❌ Error handling user.updated event:", error);
    logWebhookEvent("user.updated", "error", userData, error.message);
  }
}

/**
 * Handle user.deleted event
 * @param {Object} userData - The user data from Clerk
 */
async function handleUserDeleted(userData) {
  try {
    console.log("👤 Processing user.deleted event");
    const { id } = userData;

    if (!id) {
      console.error("Missing user ID in webhook data");
      logWebhookEvent("user.deleted", "error", userData, "Missing user ID");
      return;
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      console.log(`👤 User ${id} doesn't exist in database, nothing to delete`);
      logWebhookEvent(
        "user.deleted",
        "skipped",
        userData,
        "User does not exist in database"
      );
      return;
    }

    // Delete user from database
    await prisma.user.delete({
      where: { id },
    });

    console.log(`✅ Deleted user ${id} from database`);
    logWebhookEvent("user.deleted", "success", userData);
  } catch (error) {
    console.error("❌ Error handling user.deleted event:", error);
    logWebhookEvent("user.deleted", "error", userData, error.message);
  }
}
