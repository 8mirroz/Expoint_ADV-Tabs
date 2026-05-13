# System Design: Pricing & Conversion Engine (PCE)

## 1. System Overview
PCE (Pricing & Conversion Engine) manages the core B2B conversion mechanics of the Expoint V6 platform. It provides interactive, transparent pricing calculators, handles the dynamic display of cost estimates, and manages the Bento-style lead capture widgets.

## 2. Architecture & Components
PCE is heavily client-side interactive but relies on server-provided base configurations to prevent manipulation.

### 2.1 Core Modules
1.  **Dynamic Calculator Logic**
    *   State machine for complex pricing calculations (e.g., Size × Material × Illumination Type).
    *   Uses transparent "Formula View" to build trust (showing exactly how the price is formed).

2.  **Bento Conversion Widgets**
    *   Modular UI components designed to be slotted into various layouts (Landing Pages, Portfolios).
    *   Includes quick-action buttons ("Calculate specific size", "Download PDF presentation").

3.  **Anchoring & Psychology Triggers**
    *   Visual hierarchy emphasizes the calculated value vs. competitor average.
    *   Integration with social proof (e.g., "3 similar projects completed this month").

## 3. Data Flow

1.  Server renders the page with base pricing parameters (e.g., base cost per cm for neon).
2.  User interacts with the Calculator Widget (sliders, toggles).
3.  PCE computes the estimated price locally.
4.  User clicks "Submit for precise calculation".
5.  PCE packages the selected parameters and passes them to the ASH (Analytics & Security Hub) for submission.

## 4. API Design & Data Structures

### Configuration Data
```typescript
interface PricingConfig {
  serviceId: string;
  basePrice: number;
  multipliers: {
    materials: Record<string, number>;
    complexity: Record<string, number>;
  }
}
```

### Lead Payload
```typescript
interface CalculationLead {
  estimatedPrice: number;
  parameters: Record<string, any>;
  contactMethod: 'phone' | 'email' | 'telegram';
}
```

## 5. Technology Stack
*   **React (Client Components)**: For intensive local state management in calculators.
*   **Zustand / React Context**: To share pricing state across multiple conversion widgets on the same page.
*   **Tailwind CSS**: For adaptive Bento grid layouts.

## 6. Trade-offs & Decisions
*   **Client-Side vs Server-Side Calculation**: Initial estimates are calculated client-side for immediate feedback (zero latency). Final quotes require a sales rep, so complex backend calculation engines are not needed at this stage.
*   **Bento Layout**: Chosen for its high information density and modern aesthetic, allowing multiple conversion paths (form, messenger, direct call) to coexist without cluttering the UI.
