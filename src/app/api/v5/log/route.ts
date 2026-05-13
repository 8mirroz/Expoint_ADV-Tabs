import { NextRequest, NextResponse } from "next/server";
import { SignalEnvelopeSchema } from "@/lib/validators/analytics";
import { sanitizeSignal } from "@/lib/services/redaction";
import { verifySignature } from "@/lib/services/security";
import { persistSignal } from "@/lib/services/analytics-db";

/**
 * Genesis v5 LOG Ingress API
 * Secure entry point for all behavioral and system signals.
 * Path: /api/v5/log
 */

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const body = JSON.parse(rawBody);

    // 1. HMAC Security Check (Mandatory in production)
    const signature = req.headers.get("x-genesis-signature");
    if (process.env.NODE_ENV === "production") {
      if (!signature || !verifySignature(rawBody, signature)) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      }
    }

    // 2. Schema Validation
    const validation = SignalEnvelopeSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid signal envelope", details: validation.error.format() },
        { status: 400 }
      );
    }

    // 3. PII Sanitization (Defense in Depth)
    const cleanSignal = sanitizeSignal(validation.data);

    // 4. Processing & Routing
    console.log(`[GENESIS-LOG] Received ${cleanSignal.topic} signal from ${cleanSignal.source}:`, {
      id: cleanSignal.signal_id,
      priority: cleanSignal.priority,
    });
    
    // Asynchronously persist the signal to not block the response
    // Using fire-and-forget to keep latency low, but catching errors to not crash
    persistSignal(cleanSignal).catch(err => {
      console.error("[GENESIS-LOG-DB-ERROR]", err);
    });

    // We return 202 Accepted to acknowledge receipt without waiting for processing
    return NextResponse.json(
      { status: "accepted", signal_id: cleanSignal.signal_id },
      { status: 202 }
    );
  } catch (error) {
    console.error("[GENESIS-LOG-ERROR]", error);
    return NextResponse.json({ error: "Internal processing error" }, { status: 500 });
  }
}
