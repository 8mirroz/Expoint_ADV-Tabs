# ADR 003: AI-Ready Analytics Stack

## Context
Expoint needs a behavioral analytics system that satisfies two conflicting requirements:
1. High-fidelity data for AI evaluation (detailed session traces).
2. Strict 152-FZ compliance (no PII leakage).

## Decision
We will implement a **Hybrid Analytics Architecture**:
1. **PostHog (Main Engine)**: Used for session recording, heatmaps, and event tracking. Its API allows structured data extraction for AI agents.
2. **Custom Middleware (Data Stripper)**: A Next.js middleware or client-side wrapper to anonymize data before it hits PostHog.
3. **Postgres + JSON-B**: Local storage for "Interaction Snapshots" to allow quick local AI audits without external dependencies.

## Alternatives Considered
- **Google Analytics 4**: Rejected due to PII compliance complexity in RU and proprietary data formats that are harder for non-Google AI to consume.
- **Amplitude**: Rejected due to high cost for session replay features.
- **Microsoft Clarity**: Good for heatmaps, but lacks the advanced event-piping needed for custom AI evaluators.

## Consequences
- **Positive**: Full control over data format; excellent visibility into user friction points.
- **Negative**: Requires careful configuration to avoid logging PII; small performance overhead for the client-side tracker.

## Implementation Details
- Initialize PostHog with `capture_pageview: true`.
- Create a `AnalyticsProvider` React context to wrap the application.
- Implement `trackEvent(name, properties)` with automatic context enrichment.
