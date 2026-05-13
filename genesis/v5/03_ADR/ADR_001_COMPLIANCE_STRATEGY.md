# ADR 001: Compliance & Security Strategy (Genesis v4)

**Status**: Accepted
**Date**: 2026-05-11

## Context
The platform must comply with Russian Federation laws (152-FZ) and maintain a hardened security posture. We need to define how consent is gathered and logged, and how security policies are enforced.

## Decision
1.  **Consent Manager**: We will implement a categorized cookie consent manager. Analytics and Marketing scripts will be blocked by default until explicit consent is granted.
2.  **Consent Logging**: Form submissions will require explicit checkboxes. A dedicated API endpoint (`/api/compliance/consent`) will log the consent version and metadata to a localized database before proceeding with the lead submission to any external CRM.
3.  **Security Headers**: We will enforce `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and a restrictive `Content-Security-Policy` via `next.config.ts`.
4.  **Localization**: All databases holding personal data must be physically hosted within the Russian Federation.

## Consequences
- Requires updating all existing forms to include non-prefilled checkboxes.
- Requires building a consent logging backend.
- CSP may require careful tuning to ensure analytics and third-party widgets (chats, maps) function correctly.
