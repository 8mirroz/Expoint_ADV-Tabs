# Research: Content Delivery Frontend

## Next.js App Router Cookie Consent Best Practices (2025)
1. **Default Denied (Privacy by Default)**: Scripts must not load until explicit consent. Google Consent Mode v2 initializes with `default` states set to `denied`.
2. **Client-Side Triggering**: Use `'use client'` component to manage state and `useEffect` to trigger third-party scripts post-consent.
3. **Cookie Storage**: Store preferences in a first-party cookie or `localStorage`. Handle hydration mismatch by defaulting to denied on the server.
4. **Third-Party Scripts**: Use `next/script` with `strategy="afterInteractive"` and load conditionally based on consent state.
5. **Security**: Ensure `Secure` and `SameSite=Lax` for consent cookies.

## Form Consent Logging
1. Checkboxes must not be prefilled.
2. Consent actions should be bundled with the form payload to the backend API.
