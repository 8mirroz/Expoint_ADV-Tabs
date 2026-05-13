import { createHmac, timingSafeEqual } from "crypto";

/**
 * Security Service for Genesis v5
 * Handles HMAC signing and verification for secure inter-service communication.
 */

const SECRET = process.env.LOG_INGRESS_SECRET;

/**
 * Sign a payload with HMAC SHA-256
 */
export function signPayload(payload: string): string {
  if (!SECRET) {
    throw new Error("LOG_INGRESS_SECRET is not defined");
  }
  return createHmac("sha256", SECRET).update(payload).digest("hex");
}

/**
 * Verify a payload signature
 */
export function verifySignature(payload: string, signature: string): boolean {
  const expected = signPayload(payload);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (signatureBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(signatureBuffer, expectedBuffer);
}
