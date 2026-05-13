# Architecture Overview - v2

## System Decomposition

### 1. Presentation Layer (Frontend)
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS v4, Framer Motion
- **3D Engine**: Three.js, React-Three-Fiber
- **Responsibility**: SSR rendering of landing pages, 3D visualization, interactive forms.

### 2. State & Conversion Logic
- **Store**: Zustand
- **Responsibility**: Managing the sign configuration state (text, type, size, color) and calculating prices.

### 3. API & Integration Layer (Backend)
- **Framework**: Next.js Route Handlers
- **Responsibility**: 
  - Receiving webhook payloads from the frontend.
  - Forwarding leads to CRM (AmoCRM/Bitrix24) or Telegram.
  - Proxying chat requests to the LLM.

### 4. AI Consultant Proxy
- **Framework**: Vercel AI SDK
- **Provider**: Google Gemini (`@ai-sdk/google`)
- **Responsibility**: Injecting the user's Zustand state as a system prompt to guide the LLM's responses.

## Physical Code Structure
```text
src/
├── app/                  # Next.js App Router (pages & API routes)
├── components/           # React Components (UI, 3D, Forms)
├── lib/                  # Utilities (Pricing logic, Webhook clients)
├── store/                # Zustand State
└── data/                 # Static data models
```
