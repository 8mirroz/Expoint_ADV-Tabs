"use client";

import { usePostHog } from "posthog-js/react";
import { SignalEnvelope, SignalTopic, SignalPriority } from "@/lib/validators/analytics";
import { sanitizeSignal } from "@/lib/services/redaction";
import crypto from "crypto";

/**
 * Genesis v5 Analytics Hook
 * Provides a standardized way to capture behavioral signals.
 */
export function useAnalytics() {
  const posthog = usePostHog();

  const captureSignal = (params: {
    topic: SignalTopic;
    priority?: SignalPriority;
    payload: Record<string, unknown>;
    metadata?: Record<string, unknown>;
  }) => {
    const { topic, priority = "P3", payload, metadata = {} } = params;

    // 1. Construct the Signal Envelope
    const signal: Partial<SignalEnvelope> = {
      signal_id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      source: "ims",
      topic,
      priority,
      payload,
      metadata: {
        session_id: posthog?.get_distinct_id() || "unknown",
        user_segment: "unknown", // Should be dynamically updated
        redacted: true,
        ...metadata,
      },
    };

    // 2. Sanitize PII
    const cleanSignal = sanitizeSignal(signal);

    // 3. Capture in PostHog
    posthog?.capture(`genesis_${topic}`, cleanSignal);

    // 4. (Optional) Forward to LOG Ingress for P0/P1 signals
    if (priority === "P0" || priority === "P1") {
      forwardToLog(cleanSignal);
    }
  };

  const forwardToLog = async (signal: Partial<SignalEnvelope>) => {
    try {
      // In a real scenario, we would sign this with a public key or use a session token
      await fetch("/api/v5/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signal),
      });
    } catch (e) {
      console.warn("[Analytics] Failed to forward signal to LOG", e);
    }
  };

  return { captureSignal };
}
