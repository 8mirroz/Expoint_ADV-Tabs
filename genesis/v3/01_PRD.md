# Expoint ADV - Genesis v3 PRD (B2B Sales Engine)

## Executive Summary
Expoint ADV v3 evolves from a premium site to a **High-Intent B2B Sales Engine**. It focuses on segment-specific user journeys and establishing absolute technical authority through a Compliance Hub and Expert Academy.

## Target Audience (Segmented)
1. **Retail Chains:** Focus on scale, brand consistency, and speed of rollout.
2. **Horeca:** Focus on aesthetic impact, "Instagrammability," and night visibility.
3. **Corporate/Office:** Focus on prestige, brand identity, and long-term reliability.
4. **Clinics/Public:** Focus on safety, compliance, and clear navigation.

## Core Objectives (New for v3)
1. **[REQ-001] Dynamic Segment Routing:** Implement landing pages that adapt content (USPs, cases, pricing) to the specific industry segment.
2. **[REQ-002] Compliance Protocol (902-PP):** Build an interactive legal audit tool to mitigate B2B buyer risk.
3. **[REQ-003] Expert Academy:** A technical content hub leveraging the 19 research docs to provide deep-dive insights on materials and engineering.
4. **[REQ-004] TCO (Total Cost of Ownership) Calculator:** Move beyond "Price" to "Value" by showing long-term savings of premium materials.

## Technical Requirements
- **Routing:** Next.js Dynamic Routes for segments (`/segments/[id]`).
- **Data Layer:** Enhanced `data/segments.ts` and `data/academy.ts`.
- **UI:** New `SegmentHero`, `ComplianceBadge`, and `AcademyGrid` components.
- **Analytics:** Track segment-specific conversion rates.

## Success Metrics
- 30% increase in lead quality (high-intent form fills).
- >2 minutes average time on page (engagement with Academy content).
- Zero "Compliance Risk" mentions in initial customer calls.
