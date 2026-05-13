# Skill: AI Signal Envelope Standard

## Goal
Standardize behavioral log structure into a "Signal Envelope" format optimized for ingestion and evaluation by AI agents.

## Trigger Conditions
- Defining new analytics schemas
- Implementing LOG ingress routes
- Preparing training data from session logs

## Steps
1. **Schema Adherence**: Use `SignalEnvelopeSchema` (Zod) for all telemetry payloads.
2. **Deterministic Metadata**: Include `timestamp`, `event_uuid`, `source_component`, and `session_id`.
3. **Behavioral Context**: Capture "intent signals" (e.g., `hesitation_detected`, `sequence_order`).
4. **Encoding**: Ensure payload is JSON-serializable and UTF-8 encoded.
5. **Integrity Check**: Use HMAC signatures for server-to-server or high-risk signal transfers.

## Anti-Patterns
- Flat logs without structured metadata.
- Non-standard timestamp formats (use ISO-8601).
- Including bulky UI state that doesn't contribute to intent analysis.

## Success Criteria
- Logs are 100% parsable by standard AI evaluation prompts.
- Metadata overhead < 20% of total payload.
- Signature verification success rate > 99.9%.
