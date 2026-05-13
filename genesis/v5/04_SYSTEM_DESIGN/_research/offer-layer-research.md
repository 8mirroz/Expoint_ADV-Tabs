# Exploration Report: B2B Service Catalog & Productization Architecture

**Date**: 2026-05-11
**Explorer**: AI Explorer (Antigravity)

---

## 1. Problem & Scope

**Core Question**: How to structure the "Offer Layer" (Services, Pricing, Case Studies) for a B2B signage production company transitioning to a productized service model?

**Exploration Scope**:
- Included: Data decoupling strategies, UI patterns for B2B catalogs, Segment-based routing, Component architecture for product packs.
- Excluded: Checkout flows (e-commerce), Backend CMS integration details.

---

## 2. Key Insights

> The shift from "custom project quotes" to "productized service packs" requires a highly structured data model decoupled from the UI components.

1. **Decoupled Data Architecture**: Hardcoding service details inside React components limits scalability. Using a local `src/data` directory (as a precursor to a Headless CMS) allows for easy updates and segment filtering.
2. **"Good, Better, Best" Tiering**: Pricing should be presented in 3 tiers (Product Packs) to reduce cognitive load and anchor prices for B2B buyers.
3. **Segment-Driven Content**: Case studies and service highlights convert better when dynamically filtered by the user's industry (e.g., HoReCa vs. Retail), requiring URL parameter or React Context state management.

---

## 3. Detailed Findings

### 3.1 Data Management & Decoupling

**Exploration Method**: 🔍 Search / 🧠 Diverge

**Findings**:
- React components in `src/components/sections/` (like `Services.tsx` or `Cases.tsx`) should act purely as "Presenters".
- A "Container" component or a custom hook (e.g., `useCatalog(segment)`) should handle fetching/filtering the JSON data.
- This pattern ensures that when transitioning to an API/CMS in Phase 2, the UI components remain untouched.

### 3.2 Product Packs (Pricing) Architecture

**Exploration Method**: 🔍 Search

**Findings**:
- B2B buyers prefer transparent base pricing.
- The UI should highlight the "Recommended" tier.
- Data Model for a pack requires: `id`, `name`, `price`, `features[]`, `isPopular`.

### 3.3 Segment Routing & Deep Linking

**Exploration Method**: 🧠 Diverge

**Findings**:
- Relying solely on React state (e.g., `const [segment, setSegment]`) breaks browser history and SEO.
- Best practice: Use URL search parameters (e.g., `?segment=horeca`) to store the active segment, allowing sales reps to send direct links to tailored portfolio views.

---

## 4. Action Recommendations

| Priority | Recommendation | Reason |
|:--------:|----------------|--------|
| P0 | Extract Data to `src/data/*.json` or `.ts` | Prepares the architecture for CMS integration and cleans up JSX files. |
| P0 | Implement URL-based Segment State | Improves SEO and enables deep-linking for sales processes. |
| P1 | Create a Container/Presenter Pattern | Separates data fetching from visual rendering in `src/components/sections/`. |

---

## 5. Limitations & To-Explore

- Advanced SEO (Server-Side Rendering): If the project remains on Vite (SPA), SEO relies on pre-rendering or client-side meta tags. If SEO is critical for the catalog, migrating to Next.js App Router might be required in the future.
