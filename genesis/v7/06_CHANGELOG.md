# Changelog - Genesis v7

> This file records tweaks during this version iteration (handled by /change). New features/tasks require creating a new version (handled by /genesis).

## Format
- **[ADD]** Новая функциональность
- **[CHANGE]** Твик существующей задачи (via /change)
- **[FIX]** Исправление
- **[REMOVE]** Удаление

---

## 2026-05-13 - Initialization
- [ADD] Created Genesis v7 version
- [ADD] Scope: Prices page, Calculator page, Catalog page, Cart system

## 2026-05-13 - Tweak Change
- [CHANGE] UI-05: Card & StoryStream Components
  - User Original Words: "другое оформление этих карточек - больше инфографики, кнопка подробнее заменить 2в раздел"
  - Modification Content: Added requirements for infographics and button text change ("В раздел" instead of "Подробнее").
  - Impact Scope: `src/components/ui/StoryCard.tsx`
  - PRD Trace: [REQ-001], [REQ-022]

## 2026-05-14 - Tweak Change
- [CHANGE] UI-10: Responsive Tuning & Hover Audits (Extended scope)
  - User Original Words: "убери карту из подвала, перенастрой верстку верно правила ui ux в нашем стиле . Карту ссделай последним блоком перед подвалом - фул сайз блоком вайд скрин адаптив с чб фильтром"
  - Modification Content: Moved Map from Footer to a dedicated full-width MapSection with grayscale filter. Refactored Footer to align with "Verge 2024" industrial premium style.
  - Impact Scope: `src/components/sections/Footer.tsx`, `src/components/sections/MapSection.tsx`, `src/app/(marketing)/page.tsx`, `theme-styling-system.md`
  - PRD Trace: [NFR-002] [FE-002]
