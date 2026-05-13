# Skill: PII Redaction & 152-FZ Compliance

## Goal
Ensure all behavioral analytics data is stripped of Personally Identifiable Information (PII) before transmission, adhering to Russian 152-FZ regulations.

## Trigger Conditions
- Handling user input in analytics
- Processing lead form data
- Forwarding logs to external sinks (PostHog, Sentry)

## Steps
1. **Identify Sensitive Fields**: Mark fields containing names, phones, emails, and full IP addresses.
2. **Apply Redaction**: Use the `sanitizeSignal` utility to recursively mask PII.
3. **Pattern Matching**: Use hardened regex for Russian phone formats and email structures.
4. **Local Processing**: Always redact on the client or in a secure server-side middleware before egress.
5. **Audit**: Periodically check egress logs for accidental leakage.

## Anti-Patterns
- Sending raw input values to analytics.
- Storing unmasked logs in persistent storage accessible by AI agents.
- Relying solely on external tool's (e.g. PostHog) built-in anonymization without local pre-scrubbing.

## Success Criteria
- 100% of detected emails and phones are masked.
- No raw IP addresses sent to external cloud sinks.
- Compliance report passes the "Zero Leakage" test.
