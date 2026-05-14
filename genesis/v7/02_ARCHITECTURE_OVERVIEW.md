# Architecture Overview (Genesis V6)

## 1. System Decomposition

Система разделена на 4 основных контура (подсистемы):

### System 1: Landing Page Generator (LPG)
- **Responsibility**: Рендеринг индивидуальных SEO-лендингов для каждой услуги.
- **Source Root**: `src/app/(marketing)/services/[slug]`
- **Boundaries**: Работает в Server Components, генерирует `generateMetadata` и `generateStaticParams`.

### System 2: Motion & Interaction Core (MIC)
- **Responsibility**: GSAP анимации, ScrollTrigger, Smooth Scroll (Lenis), Framer Motion interactions.
- **Source Root**: `src/components/motion/`
- **Boundaries**: Client Components (`"use client"`), оборачивают статический контент.

### System 3: Analytics & Security Hub (ASH)
- **Responsibility**: Трекинг конверсий, 152-ФЗ consent, защита от ботов (Turnstile), Edge middleware.
- **Source Root**: `src/lib/analytics/`, `src/app/api/leads/`, `middleware.ts`
- **Boundaries**: Интегрируется через API routes и Server Actions, не блокирует UI.

### System 4: Pricing & Conversion Engine (PCE)
- **Responsibility**: Интерактивные калькуляторы, Bento-виджеты заявок, динамическое изменение цены.
- **Source Root**: `src/components/calculator/`
- **Boundaries**: Client Components, валидация через Zod.

## 2. Project Tree

```text
Expoint_ADV Tabs/
├── genesis/v6/                        # Данная архитектура
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   │   ├── services/
│   │   │   │   ├── page.tsx           # Индекс услуг
│   │   │   │   └── [slug]/page.tsx    # Динамический лендинг
│   │   ├── api/
│   │   │   └── leads/route.ts         # Защищенный endpoint
│   ├── components/
│   │   ├── motion/                    # GSAP / Framer Motion
│   │   ├── ui/                        # Tailwind/Bento компоненты
│   │   └── calculator/                # PCE
│   ├── lib/
│   │   ├── analytics/                 # ASH
│   │   └── seo/                       # Утилиты Schema.org
│   └── data/
│       └── services.ts                # БД услуг и контента
```
