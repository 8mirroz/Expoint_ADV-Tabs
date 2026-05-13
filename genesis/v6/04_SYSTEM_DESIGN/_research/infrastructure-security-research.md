# Research: Infrastructure & Security

## Next.js App Router Security Headers & CSP (2025)
1. **Nonce-Based CSP**: Generate a unique nonce per request in `middleware.ts` to secure inline scripts without `'unsafe-inline'`.
2. **Middleware vs next.config.ts**: Static headers (HSTS, X-Frame-Options) go in `next.config.ts`. Dynamic headers (CSP with nonces) require `middleware.ts`.
3. **`force-dynamic`**: Pages relying on middleware nonces often require `force-dynamic` to avoid static caching breaking the nonce.
4. **Essential Headers**:
   - `Strict-Transport-Security (HSTS)`
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: DENY` / `SAMEORIGIN`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Permissions-Policy`: Block camera, microphone if unused.
5. **Report-Only**: Always deploy CSP in `report-only` mode first to whitelist third-party scripts (like Metrica/Analytics) before enforcing.
