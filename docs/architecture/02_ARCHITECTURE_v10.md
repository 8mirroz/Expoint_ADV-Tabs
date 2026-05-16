# Architecture Overview — Genesis v10

## System Architecture

### Presentation Framework Core (PFC)

```mermaid
graph TD
    A[PageBlueprint] -->|sections[]| B[PageRenderer]
    B -->|type lookup| C[SectionRegistry]
    C -->|lazy load| D[Component]
    D -->|props from| A
    
    E[prices.ts] -->|PageBlueprint| F[prices/page.tsx]
    F -->|PageShell + PageRenderer| G[/prices render]
    
    H[services.ts] -->|SERVICES[]| I[ServiceRates]
    H -->|SERVICES[]| J[Pricing]
    K[rules_902pp.ts] -->|rules[]| L[PricingCompliance]
```

### Data Architecture

```
Knowledge Layer (docs/knowledge/coverage/)
├── t1.md          → Page architecture patterns, Hero templates, FAQ
├── t2.md          → Pricing strategy, ultra-prompt, SEO keywords
├── t3_neon.md     → Flex neon: technology, pricing, segments
├── t4_lightbox.md → Lightbox: composition, m² pricing
├── t5_letters.md  → Volume letters: complexity tiers, pricing/cm
├── t6_navigation.md → Wayfinding: segment packages
└── t7_setup.md    → Installation: risk, compliance, pricing
        ↓ (manual synthesis by agent)
Data Layer (src/data/)
├── services.ts    → 6 Service objects with expertNotes
├── pages/prices.ts → PageBlueprint with section configs
├── pricing-matrix.ts → Raw pricing data
└── rules_902pp.ts → Compliance rules
        ↓ (PFC binding)
Component Layer (src/components/sections/)
├── HeroGeneric.tsx
├── PricingExplainer.tsx
├── ServiceRates.tsx
├── Pricing.tsx
├── PricingCompliance.tsx
├── StatsSection.tsx
├── FAQ.tsx
└── CTASection.tsx
```

### Design Token Architecture

```
tokens.css (Vercel Geist Light Theme)
├── Palette: --geist-ink, --geist-canvas, --geist-link
├── Mapped: --primary, --surface, --outline, --on-surface
├── Category: --category-volumetric, --category-neon, etc.
├── Geometry: --radius-*, --space-*
├── Elevation: --elevation-1..5
└── Motion: --motion-ease-standard, --motion-duration-*

globals.css (Utility Layer)
├── Fluid Scale: --text-xs..--text-6xl (clamp)
├── Display: .geist-display-sm..2xl
├── Labels: .verge-kicker, .verge-mono-label
├── Buttons: .geist-button-primary/secondary
├── Layout: .section-container, .section-padding
├── Cards: .glass-panel, .bento-card
└── Decorative: .geist-mesh-gradient
```

## v10 Component Enhancements

### HeroGeneric — Pricing Preview Extension

```
┌─────────────────────────────────────────────────────────┐
│ [verge-kicker] Commercial Pricing Hub                   │
│                                                         │
│ Цена начинается                    ┌─────────────────┐  │
│ с логики проекта.                  │ ● Буквы от 85₽/см│  │
│                                    │ ● Неон от 3900₽/м│  │
│ Description text...                │ ● Короба от 4500₽ │  │
│                                    │ ● Стелы от 180к₽  │  │
│ [Highlights grid - 3 cols]         │                   │  │
│                                    │ 📐 Расчёт 30 мин │  │
│ [CTA Primary] [CTA Secondary]     │ 🏗 3D-макет 24ч  │  │
│                                    └─────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### PricingExplainer — Numbered Drivers

```
┌────────────────────────────────────────────┐
│ 01                                         │
│ ▌ Габариты и объем символов               │
│   Описание фактора...                      │
│   «Evidence snippet»                       │
├────────────────────────────────────────────┤
│ 02                                         │
│ ▌ Материал и световой сценарий            │
│   ...                                      │
└────────────────────────────────────────────┘
```

### Pricing — Scenario Packages Timeline

```
 Start ──── Business ──── Premium ──── Network
  │           │              │            │
 40k₽       90k₽          150k₽      Custom
  │           │              │            │
 ПВЗ       Кафе/Клиники  Бутики      Сети
```

### PricingCompliance — Severity Matrix

```
┌─ LOW ────────────────────────┐
│ ⚡ Стандартный фасад         │
│ Риск: минимальный            │
│ Предотвращение: ...          │
└──────────────────────────────┘

┌─ HIGH ───────────────────────┐
│ 🔴 Исторический центр       │
│ Риск: штраф + демонтаж      │
│ Предотвращение: ...          │
└──────────────────────────────┘
```

## Decision Log

| ID | Decision | Rationale |
|---|---|---|
| ADR-v10-001 | Пакеты вместо абстрактных сценариев | B2B-клиенты мыслят бюджетами, а не типами принятия решений |
| ADR-v10-002 | pricingPreview как optional prop | Обратная совместимость с другими страницами |
| ADR-v10-003 | Severity markers в compliance | Визуальная сортировка рисков снижает cognitive load |
| ADR-v10-004 | 5 драйверов вместо 3 | Полное покрытие факторов из knowledge base |
| ADR-v10-005 | CTA → Калькулятор (не форма) | Калькулятор квалифицирует лид лучше, чем пустая форма |
