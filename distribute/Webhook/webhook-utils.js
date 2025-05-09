// src/libs/clerk/webhookUtils.js
import crypto from 'crypto';

/**
 * Verify that the webhook request is coming from Clerk
 * @param {Request} request - The incoming request
 * @param {string} secret - The webhook secret from Clerk
 * @returns {Promise<boolean>} - Whether the webhook signature is valid
 */
export async function verifyClerkWebhookSignature(request, secret) {
  try {
    // Get the Clerk webhook signature
    const svix_id = request.headers.get('svix-id');
    const svix_timestamp = request.headers.get('svix-timestamp');
    const svix_signature = request.headers.get('svix-signature');

    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error('Error verifying webhook: Missing SVIX headers');
      return false;
    }

    // Get the request body as text
    const payload = await request.text();
    
    if (!payload) {
      console.error('Error verifying webhook: Empty request body');
      return false;
    }

    // Create the signature message
    const signatureMessage = `${svix_id}.${svix_timestamp}.${payload}`;
    
    // Split the signature header to get the signatures
    const signatures = svix_signature.split(' ');
    
    // Verify one of the signatures
    for (const signature of signatures) {
      const [versionStr, signatureValue] = signature.split(',');
      
      if (!versionStr || !signatureValue) continue;
      
      // Get the version
      const version = versionStr.split('=')[1];
      // Get the signature
      const sig = signatureValue.split('=')[1];
      
      if (!version || !sig) continue;
      
      // Create the expected signature
      const hmac = crypto.createHmac('sha256', secret);
      hmac.update(signatureMessage);
      const expectedSignature = hmac.digest('hex');
      
      // Compare signatures
      if (crypto.timingSafeEqual(
        Buffer.from(sig),
        Buffer.from(expectedSignature)
      )) {
        return true;
      }
    }
    
    console.error('Error verifying webhook: Invalid signature');
    return false;
  } catch (error) {
    console.error('Error verifying webhook:', error);
    return false;
  }
}

/**
 * Parse webhook event data
 * @param {Request} request - The incoming request
 * @returns {Promise<Object>} - The parsed webhook event data
 */
export async function parseWebhookEvent(request) {
  const payload = await request.text();
  return JSON.parse(payload);
}
