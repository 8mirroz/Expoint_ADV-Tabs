# Frontend Release Checklist (Wave 0)

Цель: минимальный gate для frontend-ready сборки перед UX/UI волнами.

## Automated Gates

- [x] `npm run build`
- [x] `npx tsc --noEmit`
- [x] `npm run lint`

## Smoke Gates

- [ ] Responsive smoke: `390px`, `768px`, `1440px`
- [ ] Reduced motion smoke: `prefers-reduced-motion: reduce`
- [ ] Lead-flow smoke: `home -> services -> service detail -> calculator -> submit`

## Notes

- Любой `error` в build/typecheck/lint блокирует релиз.
- Любой dead CTA на release-пути (`href="#"`) блокирует релиз.
- Любая тяжелая анимация, мешающая чтению/CTA на mobile, блокирует релиз.
- Checkpoint: automated gates green on `2026-05-13`.
