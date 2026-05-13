# ADR 002: Dynamic Segment Routing Strategy

## Context
Expoint needs to serve multiple B2B industries with tailored content without duplicating code.

## Decision
We will use Next.js **Dynamic Routes** (`/segments/[id]`) and a **Content-Mapping Object** in `src/data/segments.ts`. 

## Implementation
- `src/data/segments.ts` will export a `SEGMENTS` object where keys are segment IDs.
- Each segment will have `heroContent`, `uspList`, `caseStudyIds`, and `pricingPreset`.
- The common components (e.g. `Benefits.tsx`) will be refactored to accept an optional `segmentData` prop.

## Consequences
- **Positive**: High maintainability, easy to add new segments (e.g. "Banks").
- **Negative**: Increased complexity in shared components to handle dynamic props.
