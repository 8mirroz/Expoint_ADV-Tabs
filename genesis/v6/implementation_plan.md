# Implementation Plan: Genesis V6 Foundation (Sprint 1)

This plan covers the foundational tasks for the Expoint V6 architecture: ASH (Security) and MIC (Motion).

## Phase 1: Security & Motion Foundations

### Step 1: Security Middleware [ASH-01]
- **File**: `src/middleware.ts`
- **Action**: Implement rate limiting and secure headers.
- **Verification**: Run local dev and check headers.

### Step 2: Turnstile Component [ASH-01]
- **File**: `src/components/ui/TurnstileWidget.tsx`
- **Action**: Create a client-side component for Cloudflare Turnstile.
- **Verification**: Import into a test page.

### Step 3: Lead Validation & Server Actions [ASH-02]
- **File**: `src/app/api/leads/actions.ts`
- **Action**: Implement `submitLead` action with Zod and Turnstile verification.
- **Verification**: Mock submission test.

### Step 4: Lenis Smooth Scroll [MIC-01]
- **File**: `src/components/motion/SmoothScrollProvider.tsx`
- **Action**: Setup Lenis provider for React.
- **Verification**: Test scroll smoothness.

### Step 5: GSAP & ScrollTrigger Setup [MIC-02]
- **File**: `src/lib/gsap.ts`
- **Action**: Register GSAP plugins and export configured instance.
- **Verification**: Check if ScrollTrigger is registered.

## Phase 2: Core Features (Routing & Components)

### Step 6: Dynamic Route [LPG-01]
- **File**: `src/app/(marketing)/services/[slug]/page.tsx`
- **Action**: Scaffold dynamic route with metadata.

### Step 7: Bento Components [PCE-01]
- **File**: `src/components/ui/bento/*.tsx`
- **Action**: Build UI for bento widgets.

### Step 8: Calculator Logic [PCE-02]
- **File**: `src/components/calculator/PricingCalculator.tsx`
- **Action**: Implement pricing state machine.

## Execution Matrix
- **ASH Tasks**: Assigned to Engineer (Logic)
- **MIC Tasks**: Assigned to Design Lead (Animation)
- **Reviewer**: Mistral Small (Quality Gate)
- **Status**: 🟢 Phase 1 Verified. Ready for Phase 2 (LPG-01).
