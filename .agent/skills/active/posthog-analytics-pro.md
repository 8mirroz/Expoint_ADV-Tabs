# Skill: PostHog Analytics Pro

## Goal
Implement high-fidelity behavioral tracking using PostHog in a Next.js App Router environment while maintaining performance and privacy.

## Trigger Conditions
- Integrating PostHog
- Adding interaction tracking to components
- Setting up session replays or heatmaps
- Configuring feature flags

## Steps
1. **Initialize Provider**: Use `PostHogProvider` with `Suspense` to prevent SSR de-optimization.
2. **Instrumentation**: Use the `useAnalytics` hook to capture events.
3. **Context Enrichment**: Always include `segment`, `theme`, and `page_type` in event properties.
4. **Data Minimization**: Capture only necessary interactions to stay within token budgets for AI evaluation.
5. **Validation**: Verify that events appear in the PostHog dashboard with correct properties.

## Anti-Patterns
- Initializing PostHog in `layout.tsx` without `Suspense`.
- Capturing PII (emails, phones) in raw properties.
- Logging high-frequency events (scroll, mousemove) without throttling/sampling.

## Success Criteria
- 100% capture rate for high-intent conversion events.
- Zero PII leakage in PostHog properties.
- Performance impact < 50ms TBT.
