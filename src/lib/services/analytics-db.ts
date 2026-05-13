import { db } from "@/db"; // Assuming db is exported from src/db/index.ts
import { behavioralSignals } from "@/db/schema";
import { SignalEnvelope } from "../validators/analytics";

/**
 * Persists a validated and redacted SignalEnvelope to the database.
 * @param signal The standardized SignalEnvelope payload
 */
export async function persistSignal(signal: SignalEnvelope): Promise<void> {
  try {
    await db.insert(behavioralSignals).values({
      signalId: signal.signal_id,
      timestamp: new Date(signal.timestamp),
      source: signal.source,
      topic: signal.topic,
      priority: signal.priority,
      payload: signal.payload,
      metadata: signal.metadata,
      signature: signal.signature || null,
    });
  } catch (error) {
    console.error("[AnalyticsDB] Failed to persist signal:", error);
    throw new Error("Database persistence failed for signal");
  }
}
