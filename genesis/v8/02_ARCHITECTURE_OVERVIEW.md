# Architecture Overview — Genesis v8: Presentation Landing Framework

## 1. System Decomposition

Архитектура v8 расширяет существующие 4 контура (LPG, MIC, ASH, PCE) новым мета-слоем:

### System 5: Presentation Framework Core (PFC) — NEW

- **Responsibility**: Единый фреймворк рендеринга страниц. Декларативная сборка страниц из типизированных секций. Управление layout, навигацией и SEO-мета.
- **Source Root**: `src/components/framework/`
- **Boundaries**: Server + Client Components. PageShell — Server, PageRenderer — Server, Sections — Client (where motion needed).

#### Подкомпоненты PFC:

| Компонент | Тип | Назначение |
|---|---|---|
| `PageShell` | Server Component | Обёртка: Header + main + Footer + Modals |
| `SectionRegistry` | Config Module | Маппинг `sectionType → Component` |
| `PageRenderer` | Server Component | Итерация PageBlueprint.sections |
| `BreadcrumbsBar` | Client Component | Навигационные крошки |

### Сохранённые системы из v6/v7:

| System | Responsibility | Source Root |
|---|---|---|
| LPG (Landing Page Generator) | SEO-лендинги услуг | `src/app/(marketing)/services/[slug]` |
| MIC (Motion & Interaction Core) | GSAP, Framer Motion, Lenis | `src/components/motion/` |
| ASH (Analytics & Security Hub) | Трекинг, 152-ФЗ, Turnstile | `src/lib/analytics/` |
| PCE (Pricing & Conversion Engine) | Калькулятор, корзина, каталог | `src/components/calculator/`, `src/store/` |

---

## 2. Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Next.js App Router                        │
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │ /about   │  │ /contacts│  │/portfolio │  │ /cases (refactor)│ │
│  │ page.tsx │  │ page.tsx │  │ page.tsx  │  │ page.tsx         │ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────────────┘ │
│       │              │              │              │              │
│       └──────────────┴──────────────┴──────────────┘              │
│                              │                                    │
│                    ┌─────────▼──────────┐                        │
│                    │     PageShell      │ ← Единый Layout        │
│                    │  Header + Footer   │                        │
│                    │  + Breadcrumbs     │                        │
│                    │  + Modals          │                        │
│                    └─────────┬──────────┘                        │
│                              │                                    │
│                    ┌─────────▼──────────┐                        │
│                    │   PageRenderer     │ ← Рендерит sections    │
│                    └─────────┬──────────┘                        │
│                              │                                    │
│              ┌───────────────┼───────────────┐                   │
│              │               │               │                    │
│     ┌────────▼───┐  ┌───────▼────┐  ┌───────▼────┐             │
│     │ HeroGeneric│  │StatsSection│  │ CTASection │  ...more     │
│     └────────────┘  └────────────┘  └────────────┘             │
│                                                                  │
│                    ┌───────────────────┐                         │
│                    │  SectionRegistry  │ ← type → Component     │
│                    └───────────────────┘                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Data Flow

```
PageBlueprint (data/pages/*.ts)
  │
  ├── metadata: { title, description, og, schema }
  ├── headerVariant: 'default' | 'immersive' | 'minimal'
  ├── breadcrumbs: [{ label, href }]
  └── sections: [
        { type: 'hero-generic', props: { title, subtitle, bgImage } },
        { type: 'stats', props: { items: [...] } },
        { type: 'values', props: { items: [...] } },
        { type: 'team', props: { members: [...] } },
        { type: 'cta', props: { title, buttonText, href } },
      ]
              │
              ▼
page.tsx → PageShell(blueprint) → PageRenderer(sections) → SectionRegistry.resolve(type) → Component(props)
```

---

## 4. Shared Section Components

| Section Type | Component | Назначение |
|---|---|---|
| `hero-generic` | `HeroGeneric` | Универсальный Hero с заголовком, описанием, CTA, фоном |
| `hero-home` | `Hero` (existing) | Главный Hero с 3D-сценой |
| `stats` | `StatsSection` | Анимированные числа-метрики |
| `values` | `ValuesSection` | Карточки ценностей/преимуществ |
| `team` | `TeamSection` | Карточки команды |
| `cta` | `CTASection` | Призыв к действию |
| `testimonials` | `TestimonialsSection` | Отзывы клиентов |
| `contact-info` | `ContactInfoSection` | Контакты + форма |
| `gallery-grid` | `GalleryGrid` | Фильтруемая фото-галерея |
| `cases-archive` | `CasesArchive` | Список кейсов с фильтрацией |
| `faq` | `FAQ` (existing) | Вопросы и ответы |
| `map` | `MapSection` (existing) | Карта |
| `services` | `Services` (existing) | Сетка услуг |
| `safety` | `Safety` (existing) | Безопасность и 902-ПП |
| `process` | `Process` (existing) | Процесс работы |
| `clients` | `Clients` (existing) | Логотипы клиентов |
| `pricing` | `Pricing` (existing) | Ценовые карточки |
| `production-daily` | `ProductionDaily` (existing) | Лента производства |
| `calculator` | `CalculatorSection` (existing) | Калькулятор |

---

## 5. Project Tree (v8 additions)

```text
Expoint_ADV Tabs/
├── genesis/v8/                          # Данная архитектура
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   │   ├── page.tsx                 # Главная (рефакторинг → PageShell)
│   │   │   ├── about/
│   │   │   │   └── page.tsx             # О компании (NEW)
│   │   │   ├── contacts/
│   │   │   │   └── page.tsx             # Контакты (NEW)
│   │   │   ├── portfolio/
│   │   │   │   └── page.tsx             # Портфолио (NEW)
│   │   │   ├── cases/
│   │   │   │   └── page.tsx             # Кейсы (REFACTOR)
│   │   │   ├── academy/
│   │   │   │   ├── page.tsx             # Академия (REFACTOR)
│   │   │   │   └── [slug]/page.tsx      # Статья
│   │   │   ├── prices/page.tsx          # Цены (EXISTS)
│   │   │   ├── services/
│   │   │   │   ├── page.tsx             # Индекс услуг (EXISTS)
│   │   │   │   └── [slug]/page.tsx      # Лендинг услуги (EXISTS)
│   │   │   └── segments/[id]/page.tsx   # Сегмент (EXISTS)
│   │   ├── (catalog)/catalog/page.tsx   # Каталог (EXISTS)
│   │   ├── (calculator)/...             # Калькулятор (EXISTS)
│   │   ├── (cart)/cart/page.tsx          # Корзина (EXISTS)
│   │   └── (checkout)/checkout/page.tsx  # Оформление (EXISTS)
│   ├── components/
│   │   ├── framework/                   # NEW — PFC Core
│   │   │   ├── PageShell.tsx
│   │   │   ├── PageRenderer.tsx
│   │   │   ├── SectionRegistry.ts
│   │   │   └── BreadcrumbsBar.tsx
│   │   ├── sections/                    # Existing + NEW shared sections
│   │   │   ├── Header.tsx               # MODIFY — full route navigation
│   │   │   ├── Footer.tsx               # EXISTS
│   │   │   ├── Hero.tsx                 # EXISTS
│   │   │   ├── HeroGeneric.tsx          # NEW
│   │   │   ├── StatsSection.tsx         # NEW
│   │   │   ├── CTASection.tsx           # NEW
│   │   │   ├── ValuesSection.tsx        # NEW
│   │   │   ├── TeamSection.tsx          # NEW
│   │   │   ├── TestimonialsSection.tsx  # NEW
│   │   │   ├── ContactInfoSection.tsx   # NEW
│   │   │   ├── GalleryGrid.tsx          # NEW
│   │   │   ├── CasesArchive.tsx         # NEW
│   │   │   └── ... (existing sections)
│   │   └── ...
│   └── data/
│       ├── services.ts                  # EXISTS
│       ├── cases.ts                     # EXISTS
│       ├── segments.ts                  # EXISTS
│       ├── company.ts                   # NEW — О компании данные
│       ├── team.ts                      # NEW — Команда
│       └── testimonials.ts              # NEW — Отзывы
```

---

## 6. TypeScript Contracts

```typescript
// src/components/framework/types.ts

export interface SectionConfig {
  type: string;           // Key in SectionRegistry
  id: string;             // Unique section ID for scroll targeting
  props?: Record<string, unknown>;
  condition?: 'mobile-only' | 'desktop-only';
}

export interface PageBlueprint {
  slug: string;
  metadata: {
    title: string;
    description: string;
    ogImage?: string;
    schemaType?: 'Organization' | 'LocalBusiness' | 'WebPage' | 'Article';
  };
  headerVariant?: 'default' | 'immersive' | 'minimal';
  breadcrumbs?: { label: string; href: string }[];
  sections: SectionConfig[];
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}
```
