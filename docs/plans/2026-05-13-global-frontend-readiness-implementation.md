# Global Frontend Readiness Implementation - 2026-05-13

## Batch 2 (Wave 1 foundation) - in progress

- [x] Task 1: Normalize light-first design tokens and motion/focus policy (`src/styles/tokens.css`, `src/app/globals.css`)
- [x] Task 2: Align core UI primitives to the normalized token system (`Button`, `Card`, `Input`, `ThemeToggle`, `LanguageSwitcher`, `ConsultationModal`)
- [x] Task 3: Remove dead CTA links (`href="#"`) and route them to real next steps (`Footer`, `Quiz`, policy routes)

## Verification gates

- [x] `npm run lint`
- [x] `npx tsc --noEmit`
- [x] `npm run build`
