# Phase 1: Frontend System Discovery & Audit Report

## 1. Current Architecture State

The current project (`Expoint_ADV Tabs`) is a **Vite-based React Single Page Application (SPA)**. It relies on standard client-side React rendering, which means it currently lacks Server-Side Rendering (SSR) capabilities.

**Key characteristics:**
- **Framework:** React + Vite
- **Styling:** Tailwind CSS v4 (using `@tailwindcss/vite`)
- **State Management:** Zustand (`zustand`)
- **Animation:** Motion (`motion`) - Note: The new design calls for GSAP and Lenis, indicating a required migration of animation libraries.
- **AI/Backend Integration:** Express backend code or references exist (`express`, `@google/genai`), along with `dotenv`.

---

## 2. Component Inventory Map

**Entry & Core Files:**
- `src/main.tsx`, `src/App.tsx`, `src/index.css`

**Sections (Static & Layout):**
- `Hero.tsx`, `Pricing.tsx`, `Safety.tsx`, `Services.tsx`, `Footer.tsx`, `Segmentation.tsx`, `Header.tsx`, `Cases.tsx`, `Process.tsx`, `FAQ.tsx`, `Benefits.tsx`

**Core UI Primitives:**
- `Card.tsx`, `ServiceCard.tsx`, `Button.tsx`, `Input.tsx`

**Conversion & Interaction (Stateful):**
- `LeadForm.tsx`, `LivePreview.tsx`, `Calculator.tsx`, `Quiz.tsx`

**AI & Store & Logic:**
- `AssistantWidget.tsx`, `useSignProject.ts` (Zustand)
- `pricingEngine.ts`, `notebooklm.ts`
- `portfolio.ts`, `services.ts` (Static data)

---

## 3. Architecture Gap Report

| Current State (Vite SPA) | Target State (Next.js App Router) | Gap Description |
| :--- | :--- | :--- |
| **Routing:** Client-side React routing (or single-page conditional rendering) | **Next.js App Router:** Server-first file-based routing | Need to refactor `App.tsx` and sections into a `/app` directory with `page.tsx` and `layout.tsx`. |
| **SEO:** Poor (Client-side rendering only) | **SEO:** Premium (SSR + Metadata) | Static sections must be converted to React Server Components (RSC) to serve pre-rendered HTML and metadata. |
| **Animation:** `motion` library | **Motion:** GSAP + Lenis Smooth Scroll | Need to replace `motion` with `@gsap/react`, `gsap`, and `lenis` for the premium scroll-driven B2B experience. |
| **3D Rendering:** `LivePreview.tsx` (Currently unknown 3D, perhaps DOM-based or early Three.js) | **3D Rendering:** `react-three-fiber` + `drei` | `LivePreview.tsx` needs an upgrade to a fully integrated Three.js canvas with Draco compression and fallback images. |
| **Business Logic:** `pricingEngine.ts` inside `/src` | **Backend API:** Authoritative pricing on Server | `pricingEngine.ts` currently leaks business pricing formulas to the client bundle. It must be moved to a secure API Route or Server Action. |

---

## 4. Server/Client Boundary Violations

In the Next.js migration, we must enforce strict RSC/Client boundaries:

**Must become React Server Components (RSC):**
- All components in `src/components/sections/` (except Interactive ones).
- `Hero.tsx`, `Services.tsx`, `Cases.tsx`, `FAQ.tsx`, `Footer.tsx`, `Header.tsx`.
- Static data files (`portfolio.ts`, `services.ts`) should be fetched/read exclusively on the server.

**Must remain Client Components (`"use client"`):**
- `Calculator.tsx`, `LeadForm.tsx`, `Quiz.tsx` (Form state).
- `LivePreview.tsx` (3D Canvas cannot be SSR'd).
- `AssistantWidget.tsx` (Chat interface).
- `useSignProject.ts` (Zustand state).

---

## 5. Migration Risk List

1. **SEO Cannibalization during Migration:** Migrating from a SPA to Next.js changes URL structures and how bots crawl the site.
   - *Mitigation:* Ensure `metadata` is properly defined for all catalog pages immediately upon migration.
2. **GSAP + React 19 Hydration Issues:** Complex animations can cause layout shifts or hydration mismatches if not isolated correctly.
   - *Mitigation:* Use `useGSAP` strictly within isolated wrapper components.
3. **Three.js Performance Hit:** Adding a 3D configurator might spike the JS bundle size and drop FPS on mobile devices.
   - *Mitigation:* Use `next/dynamic` to lazy load the 3D canvas with `ssr: false` and implement a static image fallback.
4. **Leaking Pricing Secrets:** If `pricingEngine.ts` is imported into a Client Component by accident, Next.js might bundle it to the browser.
   - *Mitigation:* Move authoritative pricing entirely to `/app/api/quote` and only keep a `previewEstimate` function for UI feedback.
5. **Tailwind CSS v4 Integration:** Project is using Tailwind v4. Moving to Next.js might require adjustments to how `index.css` is built and injected, although Next.js 15+ supports v4 natively with PostCSS/Vite plugins.

---

## 6. Next Steps Recommendation
**Proceed to Phase 2 — Architecture Stabilization:**
- Initialize the Next.js App Router structure (`/app`).
- Set up route groups (`(marketing)`, `(catalog)`, `(calculator)`).
- Port static sections into Server Components.
- Implement strictly bounded Client Components for forms and state.
