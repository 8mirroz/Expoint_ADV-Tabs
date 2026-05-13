import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { behavioralSignals } from "@/db/schema";
import { desc } from "drizzle-orm";

/**
 * Genesis v5 Signal Export API
 * Endpoint for bulk signal retrieval by AI agents.
 * Path: /api/v5/reports/signals
 */
export async function GET(req: NextRequest) {
  try {
    // 1. Basic Security Check (Require admin signature/token)
    const authHeader = req.headers.get("authorization");
    const isLocalDev = process.env.NODE_ENV === "development";
    
    // In production, we'd verify a strong Bearer token or HMAC signature
    if (!isLocalDev && authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 2. Fetch the latest signals
    // To ensure we don't overwhelm the stream, we limit it to 1000 records
    const searchParams = req.nextUrl.searchParams;
    const limitParam = parseInt(searchParams.get("limit") || "1000", 10);
    
    const signals = await db.select()
      .from(behavioralSignals)
      .orderBy(desc(behavioralSignals.createdAt))
      .limit(limitParam);

    // 3. Format as JSON-L (JSON Lines) for efficient AI processing
    const jsonLines = signals.map(signal => JSON.stringify({
      id: signal.signalId,
      timestamp: signal.timestamp,
      source: signal.source,
      topic: signal.topic,
      priority: signal.priority,
      payload: signal.payload,
      metadata: signal.metadata
    })).join("\n");

    // 4. Return as a stream/text response
    return new NextResponse(jsonLines, {
      status: 200,
      headers: {
        "Content-Type": "application/x-ndjson",
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("[SignalExportAPI] Error exporting signals:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
