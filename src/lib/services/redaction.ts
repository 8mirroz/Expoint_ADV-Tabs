/**
 * PII Redaction Service
 * Ensures 152-FZ compliance by stripping emails, phone numbers, and potential names
 * from analytics payloads before transmission.
 */

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const PHONE_REGEX = /(\+7|8)[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}/g;

/**
 * Mask string content if it matches PII patterns
 */
export function maskPII(text: string): string {
  let redacted = text;
  redacted = redacted.replace(EMAIL_REGEX, "[EMAIL_REDACTED]");
  redacted = redacted.replace(PHONE_REGEX, "[PHONE_REDACTED]");
  return redacted;
}

/**
 * Recursively walk an object/array and mask all string values
 */
export function redactObject<T>(obj: T): T {
  if (typeof obj !== "object" || obj === null) {
    if (typeof obj === "string") {
      return maskPII(obj) as unknown as T;
    }
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => redactObject(item)) as unknown as T;
  }

  const redactedObj: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    // If key explicitly looks like PII, mask it entirely regardless of value type
    const lowKey = key.toLowerCase();
    if (["email", "phone", "fullname", "name", "address", "passport"].some(pii => lowKey.includes(pii))) {
      redactedObj[key] = "[PII_KEY_REDACTED]";
      continue;
    }

    redactedObj[key] = redactObject(value);
  }

  return redactedObj as T;
}

/**
 * Middleware-friendly wrapper for analytics signals
 */
export function sanitizeSignal<T>(signal: T): T {
  return redactObject(signal);
}
