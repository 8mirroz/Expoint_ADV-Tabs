# System Design: Analytics & Security Hub (ASH)

## 1. System Overview
ASH (Analytics & Security Hub) is responsible for the security perimeter, lead validation, and user behavior analytics within the Expoint V6 architecture. It ensures seamless conversion tracking while maintaining strict adherence to 152-FZ (Russian personal data protection law) and protecting endpoints from automated bot attacks.

## 2. Architecture & Components
ASH operates primarily at the Edge (Middleware) and Server (Next.js Server Actions) layers, with lightweight client-side scripts for telemetry.

### 2.1 Core Modules
1.  **Security Perimeter (Edge & Server)**
    *   **Cloudflare Turnstile**: Invisible CAPTCHA replacement. Validates form submissions without degrading UX.
    *   **Rate Limiting**: Implementation at the Edge/Middleware to prevent API abuse.
    *   **Input Validation**: Zod schemas for all incoming data (leads, callbacks) on both client and server.

2.  **Compliance Engine (152-FZ)**
    *   **Consent Management**: Universal state manager for cookie and data processing consents.
    *   **Checkbox Enforcement**: Automatic validation of consent status before dispatching any lead data.
    *   **Data Masking**: PII (Personally Identifiable Information) masking in non-secure logs.

3.  **Telemetry & Analytics Pipeline**
    *   **Client-Side Tracker**: Lightweight script to capture scroll depth, time-on-site, and interaction points.
    *   **Server-Side Sink**: Next.js API endpoints to receive telemetry data asynchronously without blocking the main thread.
    *   **Conversion Webhooks**: Secure transmission of validated leads to the CRM system.

## 3. Data Flow

### Lead Submission Flow
1.  User fills out a form. Client-side Zod validation occurs.
2.  Turnstile token is generated invisibly.
3.  Client calls a Server Action with form data + Turnstile token.
4.  Server Action validates the Turnstile token via Cloudflare API.
5.  Server Action validates data against Zod schemas.
6.  If valid, lead is routed to the CRM via Webhook.
7.  Success/Error response is sent back to the client.

## 4. API Design

### Server Actions
*   `submitLead(data: LeadFormData, token: string)`: Main endpoint for new leads.
*   `submitCallback(data: CallbackFormData, token: string)`: Endpoint for simple callback requests.

### Analytics Endpoints
*   `POST /api/telemetry`: Asynchronous endpoint for receiving user behavior data.

## 5. Technology Stack
*   **Next.js Middleware**: Edge execution for rate limiting.
*   **Next.js Server Actions**: Secure backend logic execution.
*   **Zod**: Schema validation.
*   **Cloudflare Turnstile**: Bot protection.

## 6. Trade-offs & Decisions
*   **Turnstile over reCAPTCHA**: Chosen for better UX (invisible) and privacy focus.
*   **Server Actions over API Routes for Leads**: Simplifies client-server communication and provides better type safety out-of-the-box.
*   **Custom Telemetry Sink**: To maintain full control over data ownership and avoid third-party script overhead, a lightweight custom sink is used for basic interactions.
