# ADR 001: Technology Stack Upgrade (v2)

## Status
Accepted

## Context
The project needs to move from a Vite SPA to an SEO-friendly, server-rendered application. Additionally, it requires backend capabilities for AI proxying and CRM webhook integration. Finally, the visual WOW-factor must be elevated using 3D rendering.

## Decision
1. **Next.js (App Router)**: Replace Vite to gain SSR, API routes, and advanced SEO capabilities.
2. **React-Three-Fiber (Three.js)**: Adopted for the 3D visualizer. Provides declarative 3D scenes within React.
3. **Vercel AI SDK**: Adopted for streaming chat interfaces and backend LLM proxying.
4. **Zustand**: Retained from v1 as the central state manager due to its simplicity and lack of boilerplate.
5. **Tailwind CSS v4 & Framer Motion**: Retained for UI styling and micro-animations.

## Consequences
- **Positive**: We gain SEO, secure backend API routes, and a premium 3D experience.
- **Negative**: Adds complexity (3D modeling, SSR hydration issues) and requires migrating existing Vite code to the Next.js `app/` directory structure.
