# Exploration Report: B2B Signage Configurator & Pricing Engines

**Date**: 2026-05-11
**Explorer**: AI Explorer (Antigravity) - Synthesized from User Data

---

## 1. Problem & Scope

**Core Question**: How to design a modern, conversion-focused "Sign Configurator" (Conversion Layer) for channel letters that replaces standard lead forms?

**Exploration Scope**:
- Included: UX patterns of domestic and international competitors, real-time pricing models, visual previews, data collection for manufacturing specifications.
- Excluded: Full 3D rendering (React Three Fiber) in MVP, backend PDF generation implementation.

---

## 2. Key Insights

> The best calculators in this niche function more like **automotive configurators** than simple web forms.

1. **Visual Feedback is Paramount**: Users need a *real-time preview* (SVG/Canvas) of their selections (font, color, glow) to build trust.
2. **Price as a Trust Range**: Instead of a single final number, showing a realistic *price range* (e.g., 82k - 108k ₽) alongside a detailed breakdown (materials, labor, mounting) reduces friction and leaves room for managerial upselling.
3. **Structured Specification over Chat**: The configurator must output a complete technical specification (TЗ) for the factory, eliminating back-and-forth emails.

---

## 3. Detailed Findings

### 3.1 Competitive Analysis (Russian Market)
**Strengths**:
- Step-by-step logic (e.g., "Vyveski33").
- Technical transparency (listing materials like PVC 5mm, ORACAL 8500).
- Explicit height-based calculation matrices (e.g., Reklamastroy's base rates per cm height).

**Weaknesses**:
- Lack of visual representation (mostly text fields).
- No explanation of *why* an option costs more or what value it adds.

### 3.2 Competitive Analysis (International Market)
**Strengths**:
- Real-time preview (e.g., Channel Letter Designer).
- 360-degree / 3D previews (e.g., ChannelLetter.com).
- Direct "Quote-to-Order" automation.
- Pricing engines explicitly modeling margin, labor, and overhead (e.g., Sign Customiser).

### 3.3 UX & Conversion Strategy
**Exploration Method**: 🧠 Diverge

**Findings**:
- **Progressive Disclosure**: Show the visual result first, hide complex technical settings behind "advanced" toggles.
- **Value-Selling Upgrades**: Options shouldn't just be checkboxes (e.g., "IP67"). They should explain value ("IP67: best for outdoor weather resistance").
- **AI Integration**: AI can guide users ("I have a cafe -> AI suggests Halo-lit warm letters") and explain price breakdowns.

---

## 4. Action Recommendations

| Priority | Recommendation | Reason |
|:--------:|----------------|--------|
| P0 | Build an SVG/Canvas Live Preview | Critical for user engagement and trust. |
| P0 | Implement a Multi-variable Pricing Engine | Allows business to easily adjust rates (BaseRate, MaterialCoef, LightingCoef). |
| P1 | Output structured `SignProject` JSON | Crucial for CRM integration and accurate manufacturing quotes. |

---

## 5. Limitations & To-Explore
- MVP will use 2D SVG previews. Future versions will explore `react-three-fiber` for 2.5D/3D previews.
- Deep CRM integration (e.g., AmoCRM/Bitrix24 webhooks) requires backend API alignment.
