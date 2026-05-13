# Architecture Overview - Genesis v3

## System Decomposition

### 1. SegmentEngine
- **Responsibility**: Manages industry-specific user journeys.
- **Source**: `src/app/(marketing)/segments/[id]/`
- **Data**: `src/data/segments.ts`
- **Boundary**: Injects data into shared components (Hero, Benefits, Portfolio).

### 2. ComplianceHub
- **Responsibility**: Interactive risk assessment for Moscow 902-PP regulations.
- **Source**: `src/components/compliance/`
- **Boundary**: Standalone tool + Global "Safe" badges on configurator results.

### 3. AcademyPlatform
- **Responsibility**: Technical knowledge delivery.
- **Source**: `src/app/(marketing)/academy/`
- **Data**: `src/data/academy.ts`
- **Boundary**: Detail-overlays for the 3D Configurator and blog-style pages.

### 4. ConversionLayer (Enhanced)
- **Responsibility**: Lead capture with segment-tagging.
- **Source**: `src/app/api/quote/`
- **Boundary**: Sends metadata about the user's segment to CRM/Telegram.

## Project Tree
```text
src/
├── app/
│   ├── (marketing)/
│   │   ├── segments/        # [NEW] Segment-specific landing pages
│   │   │   └── [id]/page.tsx
│   │   └── academy/         # [NEW] Expert Academy / Knowledge Base
│   └── api/
│       └── quote/route.ts   # [UPD] Enhanced lead tagging
├── components/
│   ├── compliance/          # [NEW] Interactive 902-PP tools
│   ├── segments/            # [NEW] Segment-specific UI blocks
│   └── shared/              # Refactored common components
└── data/
    ├── segments.ts          # [NEW] USPs, Pain points per industry
    └── academy.ts           # [NEW] Technical deep-dives
```
