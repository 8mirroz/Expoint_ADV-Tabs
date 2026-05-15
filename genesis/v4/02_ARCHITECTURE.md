# Architecture Specification
**Project:** Expoint ADV - Premium AI-Ready B2B Sales Engine
**Version:** 1.0.0
**Status:** STABLE

## 1. System Overview
The system is designed as a modern, decoupled web application. It follows a 5-layer conceptual architecture:
1. **Brand Layer:** Visual identity, UI components, typography, animations.
2. **Offer Layer:** Productized services, catalogs, segment routing.
3. **Conversion Layer:** Calculators, lead forms, CRM integrations.
4. **AI-Ready Layer:** Assistant interfaces, prompt orchestration, context management.
5. **Knowledge Layer:** NotebookLM integration, static content, SEO metadata.

## 2. Technology Stack
- **Frontend Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS + Design Tokens ( Geist System )
- **State Management:** Zustand (Cart, Consent, UI state)
- **Database / ORM:** Drizzle ORM + PostgreSQL
- **Security:** Cloudflare Turnstile, custom Edge Middleware (CSP, Rate Limiting)
- **Knowledge Base:** Internal Markdown-based storage with NotebookLM-ready prompts. (Live integration via `src/lib/notebooklm.ts` is currently STUBBED).

## 3. Data Flow & Integrations

### 3.1. Lead Generation Flow
1. User interacts with a Calculator or AI Assistant form.
2. Client-side state manages input validation and dynamic price estimation.
3. Upon submission, data is sent to an API route.
4. API route queues the lead for CRM integration and triggers email notifications.

### 3.2. AI Assistant Architecture (Future)
- **UI:** A persistent or modal chat widget.
- **Context:** Feeds the user's current segment and page context into the prompt.
- **Backend:** Communicates with an LLM (e.g., via LangChain/LlamaIndex) grounded with static exported knowledge and system prompts.

## 4. Component Hierarchy (Proposed)

```text
src/
├── components/
│   ├── core/           # Buttons, Inputs, Typography, Layouts
│   ├── sections/       # Hero, Services, CaseStudies, TrustSignals
│   ├── conversion/     # Calculator, LeadForm, SegmentSelector
│   └── ai/             # AssistantWidget, ChatBubbles
├── config/
│   └── integrations/   # notebooklm.json, crm.json
├── hooks/
│   └── useCalculator.ts
├── lib/
│   └── notebooklm.ts   # Utilities for interacting with the KB
└── pages/ or app/      # Routing structure
```

## 5. Security & Stability
- Strict client-side and server-side validation for all forms.
- Environment variables for all integration keys.
- Deterministic rendering to prevent hydration errors (especially in calculators).
