# ADR 001: Tech Stack Selection (Genesis V6)

## Status
Accepted

## Context
Для реализации мульти-лендинговой архитектуры, внедрения SEO, контура безопасности и премиальных анимаций (GSAP) требуется утвердить технологический стек, который обеспечит баланс между Server-Side Rendering (SEO) и Client-Side Interactivity (GSAP).

## Decision
Мы выбираем следующий стек:
1. **Core Framework**: Next.js 15 (App Router). Идеален для динамического роутинга (`/services/[slug]`) и SSR (для SEO метаданных).
2. **Styling**: Tailwind CSS v4 + `clsx` + `tailwind-merge`. Обеспечивает дизайн-токены для темы 'Luxury Industrial'.
3. **Motion / Animations**: 
   - **GSAP**: Для сложных scroll-based таймлайнов и staggered анимаций.
   - **Framer Motion**: Для микро-интеракций (hover, click, modal).
   - **Lenis**: Для smooth scroll.
4. **Forms & Validation**: React Hook Form + Zod.
5. **Security & Telemetry**: 
   - Cloudflare Turnstile (вместо reCAPTCHA).
   - Server Actions для безопасной обработки лидов.
   - Vercel Analytics / Custom Telemetry Sink (Edge middleware).
6. **Content Source**: Local MDX или headless CMS (в зависимости от частоты обновления, пока статические JSON/TypeScript объекты `data/services`).

## Consequences
- **Positive**: Высокая производительность, превосходное SEO, безопасные формы, впечатляющий UX.
- **Negative**: Сложность настройки GSAP внутри React (необходимость использования `@gsap/react` и строгий контроль очистки `useGSAP` во избежание утечек памяти).
