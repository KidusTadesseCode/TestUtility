// src/libs/clerk/webhookUtils.js
// import crypto from "crypto";
import { Webhook } from "svix";
import { headers } from "next/headers";
/**
 * Verify that the webhook request is coming from Clerk
 * @param {Request} request - The incoming request
 * @param {string} secret - The webhook secret from Clerk
 * @returns {Promise<{ isValid: boolean, payload: string, error?: string }>}
 */
export async function verifyClerkWebhookSignature(request, secret) {
  try {
    if (!secret) {
      console.error("Missing webhook secret");
      return { isValid: false, payload: "", error: "Missing webhook secret" };
    }

    const wh = new Webhook(secret);
    const headerPayload = await headers();

    // Get the Clerk webhook headers
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error("Error verifying webhook: Missing required headers");
      return {
        isValid: false,
        payload: "",
        error: "Missing required Svix headers",
      };
    }

    // Get the raw request body as text
    const payload = await request.json();

    if (!payload) {
      console.error("Error verifying webhook: Empty request body");
      return {
        isValid: false,
        payload: "",
        error: "Empty request body",
      };
    }

    const body = JSON.stringify(payload);
    try {
      const event = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      });
      return { isValid: true, payload: event };
    } catch (error) {
      console.error("Error: Could not verify webhook:", error);
      return new Response("Error: Verification error", {
        status: 400,
      });
    }
  } catch (error) {
    console.error("Error verifying webhook:", error);
    return {
      isValid: false,
      payload: "",
      error: error.message,
    };
  }
}
