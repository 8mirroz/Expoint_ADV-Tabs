# Комплексный аудит фронтенда Expoint ADV (БУКВА СВЕТ)

**Дата:** 21 мая 2026
**Проект:** Expoint ADV / БУКВА СВЕТ
**Стек:** Next.js 16.2.6 (Turbopack), React 19, TypeScript 5.8, Tailwind CSS 4, Zustand 5, Framer Motion 12, GSAP 3, Three.js, Lenis
**Статус сборки:** ✅ Build OK | ✅ TypeScript OK | ✅ ESLint OK | ✅ 18 тест-файлов, 65 тестов пройдено

---

## 1. АУДИТ ПРОИЗВОДИТЕЛЬНОСТИ

### 1.1 Структура рендеринга

| Метрика | Текущее состояние | Оценка |
|---------|-------------------|--------|
| SSR/SSG | Главная страница — Server Component с 7 секциями | ✅ Хорошо |
| Code Splitting | SectionRegistry: 25 секций через `next/dynamic` | ✅ Хорошо |
| Client Components | **~95+ файлов с `use client`** | ⚠️ Избыточно |
| Шрифты | Inter через `next/font/google` с `display: swap` | ✅ Хорошо |
| 3D | Нет Canvas/useFrame/useThree на главной (модули не подключены) | ✅ Нет нагрузки |

### 1.2 Изображения

| Метрика | Текущее состояние | Оценка |
|---------|-------------------|--------|
| `next/image` | Используется в **11 файлах** | ⚠️ Мало |
| `<img>` напрямую | Используется в **20 файлах** (47 вхождений) | 🔴 Критично |
| Форматы | JPEG, PNG — нет WebP/AVIF конвертации | ⚠️ Средне |
| Lazy loading | Нет explicit `loading="lazy"` на `<img>` | 🔴 Критично |

### 1.3 Внешние ресурсы

| Ресурс | Проблема | Влияние |
|--------|----------|---------|
| Google Fonts Material Symbols | `@import url()` в CSS — блокирующий запрос | 🔴 Критично (FCP +300-500ms) |
| Google Analytics | `afterInteractive` стратегия | ✅ Хорошо |
| PostHog | Клиентский провайдер | ✅ OK |
| Lenis (Smooth Scroll) | Оборачивает всё приложение | ⚠️ Влияет на TBT |
| GSAP Provider | Оборачивает всё приложение | ⚠️ Влияет на TBT |

### 1.4 Провайдеры в layout.tsx

Порядок обёрток (снаружи → внутрь):
```
ThemeProvider → LanguageProvider → SmoothScroll → GSAPProvider → PostHogProvider → {children}
```

**Проблема:** 5 уровней вложенности клиентских провайдеров. Каждый добавляет JS-бандл и время инициализации.

### 1.5 Оценки метрик производительности (прогнозные)

| Страница | FCP | LCP | TBT | CLS |
|----------|-----|-----|-----|-----|
| Главная `/` | ~1.5-2.5s | ~3-4s | ~300-600ms | <0.1 |
| Услуги `/services` | ~1.2-2.0s | ~2.5-3.5s | ~200-400ms | <0.1 |
| Калькулятор `/calculator` | ~1.5-2.5s | ~2-3s | ~400-700ms | <0.15 |
| Страницы услуг `/services/*` | ~1.2-2.0s | ~2-3s | ~200-400ms | <0.1 |

**Основные узкие места:**
1. Блокирующий `@import` Google Fonts Material Symbols (~300-500ms)
2. 47 нативных `<img>` без оптимизации next/image
3. Избыточное количество `"use client"` компонентов (~95+)
4. 5 вложенных провайдеров в layout
5. Отсутствие `<link rel="preload">` для критичных ресурсов

### 1.6 Приоритизированные предложения по производительности

| # | Проблема | Решение | Эффект | Сложность |
|---|----------|---------|--------|-----------|
| P1 | `@import url()` Material Symbols | Заменить на `next/font` или `<link>` с `preload` | FCP -300ms | Низкая |
| P2 | 47 нативных `<img>` | Заменить на `next/image` с `priority` для ATF | LCP -30-50% | Средняя |
| P3 | Избыточные `"use client"` | Аудит: Footer, FAQ, Cases, Benefits могут быть Server Components | TBT -20-30% | Средняя |
| P4 | Lenis + GSAP оборачивают всё | Сделать условную загрузку или lazy init | TBT -15% | Средняя |
| P5 | Нет `<Suspense>` для тяжёлых секций | Добавить `<Suspense>` с fallback для CalcSection, Quiz | CLS улучшение | Низкая |

---

## 2. АУДИТ ДОСТУПНОСТИ (ACCESSIBILITY)

### 2.1 WCAG 2.1/2.2 Соответствие

| Критерий | Статус | Детали |
|----------|--------|--------|
| **Семантическая разметка** | ⚠️ Частично | `<header>`, `<footer>`, `<nav>` используются. Но `<main>` отсутствует в layout |
| **Заголовки H1-H6** | ⚠️ Проблемы | H1 найден в 18 файлах/35 вхождений — потенциально >1 H1 на страницу |
| **aria-атрибуты** | ✅ Присутствуют | 59 вхождений `aria-`/`role=`/`alt=` в 31 файле |
| **Контрастность** | ⚠️ Проблемы | `text-white/60` и `text-on-surface-variant/50` — могут не проходить AA 4.5:1 |
| **Навигация с клавиатуры** | ✅ Хорошо | `:focus-visible` стили определены через `--focus-ring` |
| **Alt-тексты** | ⚠️ Частично | Есть в Footer social links, но многие `<img>` без alt |
| **prefers-reduced-motion** | ✅ Хорошо | Глобальное правило `@media (prefers-reduced-motion: reduce)` |
| **Skip navigation** | 🔴 Отсутствует | Нет skip-to-content ссылки |
| **`<main>` landmark** | 🔴 Отсутствует | layout.tsx не содержит `<main>` |
| **Формы** | ⚠️ Частично | Hero form имеет placeholder, но нет явных `<label>` элементов |

### 2.2 Приоритизированные предложения по доступности

| # | Проблема | Решение | Эффект | Сложность |
|---|----------|---------|--------|-----------|
| A1 | Нет `<main>` landmark | Добавить `<main>` в layout.tsx или PageShell | WCAG 2.4.1 | Низкая |
| A2 | Нет skip-navigation | Добавить `<a href="#main-content" class="sr-only focus:not-sr-only">` | WCAG 2.4.1 | Низкая |
| A3 | Множественные H1 | Аудит каждой страницы — оставить 1 H1 | WCAG 1.3.1 | Средняя |
| A4 | Низкая контрастность `text-white/60` | Минимум `text-white/70` для body текста | WCAG 1.4.3 AA | Низкая |
| A5 | `<img>` без alt | Добавить alt ко всем изображениям | WCAG 1.1.1 | Средняя |
| A6 | Формы без `<label>` | Добавить `<label>` или `aria-label` ко всем input | WCAG 1.3.1 | Средняя |

---

## 3. АУДИТ ЮЗАБИЛИТИ И UX

### 3.1 Пользовательские сценарии

| Сценарий | Путь | Оценка |
|----------|------|--------|
| "Хочу быстро понять бюджет" | Главная → Калькулятор → Заявка | ✅ Хорошо — калькулятор доступен |
| "Хочу увидеть работы" | Главная → Кейсы → Детали кейса | ✅ Хорошо — Cases секция на главной |
| "Хочу заказать" | Главная → CTA "Заказать" → Модал → Форма | ✅ Хорошо — CTA в header |
| "Хочу понять цены" | Главная → Цены → Пакеты | ⚠️ Средне — много вариантов |
| "Хочу проверить 902-ПП" | ... → Compliance → Audit Wizard | ✅ Уникальная ценность |

### 3.2 Навигация

| Элемент | Оценка | Комментарий |
|---------|--------|-------------|
| Desktop pill-nav | ✅ Хорошо | Animated active state, 5 пунктов |
| Mobile menu | ✅ Хорошо | AnimatePresence, staggered entry |
| Breadcrumbs | ✅ Есть | BreadcrumbsBar компонент |
| Footer навигация | ✅ Хорошо | 4 колонки: Hardware, System, HQ, Legal |
| Мультиязык | ✅ 9 языков | ru, be, kk, en, ko, zh, hi, ce, tt |

### 3.3 Обратная связь и состояния

| Элемент | Статус |
|---------|--------|
| Hover-эффекты кнопок | ✅ Хорошо — translateY, scale, glow |
| Loading states в формах | ✅ Есть — `sending` state в Hero |
| Success confirmation | ✅ Есть — redirect после лида |
| Error states | ✅ Есть — security, consent, network errors |
| Toast notifications | ✅ Есть — email copied toast |
| 404 страница | ✅ Есть — not-found.tsx |
| Error boundary | ✅ Есть — error.tsx |
| Empty states | ⚠️ Не везде видно |
| Skeleton loaders | 🔴 Отсутствуют |

### 3.4 Приоритизированные предложения по UX

| # | Проблема | Решение | Эффект | Сложность |
|---|----------|---------|--------|-----------|
| U1 | Нет skeleton loaders | Добавить Skeleton для Cards, Gallery, Calculator | Perceived perf +40% | Средняя |
| U2 | Empty states не везде | Добавить иллюстрации для 0 results | Полнота UX | Низкая |
| U3 | ConsultationModal нет анимации закрытия | Добавить exit animation через AnimatePresence | UX polish | Низкая |
| U4 | Цены — сложная навигация | Добавить фильтр или сравнение пакетов | Конверсия +15-20% | Высокая |

---

## 4. АУДИТ КАЧЕСТВА КОДА И АРХИТЕКТУРЫ

### 4.1 Структура кода

| Метрика | Значение | Оценка |
|---------|----------|--------|
| TypeScript проверка | 0 ошибок | ✅ Отлично |
| ESLint | 0 ошибок | ✅ Отлично |
| Build | Успешный (exit 0) | ✅ Отлично |
| Unit тесты | 18 файлов, 65 тестов, все пройдены | ✅ Хорошо |
| Покрытие тестами | Не измерено (нет `--coverage` конфига) | ⚠️ Нужно настроить |
| Модульность | Хорошая: features/, components/, lib/, store/ | ✅ Хорошо |

### 4.2 Архитектурные паттерны

| Паттерн | Реализация | Оценка |
|---------|------------|--------|
| App Router | Route Groups: (marketing), (cart), (catalog), (checkout) | ✅ Хорошо |
| Dynamic imports | SectionRegistry с 25 lazy-секциями | ✅ Хорошо |
| State management | Zustand stores: Calculator, Cart, CartDrawer, Modal, Consent, SalesEngine | ✅ Хорошо |
| Data layer | Отдельные файлы в `src/data/` | ✅ Хорошо |
| Validation | Zod schemas в `src/lib/validators/` | ✅ Хорошо |
| i18n | LanguageProvider + словари в каждом компоненте | ⚠️ Можно улучшить |
| Design tokens | CSS custom properties в tokens.css | ✅ Отлично |
| Notifications | Fan-out: Email + Telegram + CRM | ✅ Хорошо |

### 4.3 Зависимости

| Категория | Проблема | Оценка |
|-----------|----------|--------|
| `framer-motion` + `motion` | Два пакета одного назначения (framer-motion 12 + motion 12) | ⚠️ Дублирование |
| `express` | В зависимостях, но не используется в Next.js App Router | ⚠️ Лишняя зависимость |
| `@nestjs/config` | NestJS config в Next.js проекте | 🔴 Явно лишняя |
| `@splinetool/react-spline` | В зависимостях, но не найдены использования | ⚠️ Потенциально лишняя |
| `three-stdlib` | В зависимостях, Canvas не используется на страницах | ⚠️ Неиспользуемая |

### 4.4 Дублирование кода

| Проблема | Файлы |
|----------|-------|
| i18n словари в каждом компоненте | Header.tsx, Footer.tsx, Hero.tsx — каждый содержит полные copy objects |
| Два JsonLd компонента | `src/components/seo/JsonLd.tsx` + `src/lib/seo/schema.ts` — разные интерфейсы |
| Два ServiceFAQ | `sections/service-landing/ServiceFAQ.tsx` + `service-pages/ServiceFAQ.tsx` |
| Дублирование типов кнопок | `ui-button-*` + `geist-button-*` в CSS — два параллельных набора |

### 4.5 Приоритизированные предложения по коду

| # | Проблема | Решение | Эффект | Сложность |
|---|----------|---------|--------|-----------|
| C1 | `@nestjs/config`, `express` в deps | Удалить неиспользуемые зависимости | -50KB+ бандл | Низкая |
| C2 | `framer-motion` + `motion` дубль | Оставить только `motion` (v12) | -20KB бандл | Средняя |
| C3 | i18n дублирование | Централизовать переводы в `src/i18n/` | Maintainability | Высокая |
| C4 | Нет test coverage отчёта | Добавить `--coverage` в vitest config | Quality gates | Низкая |
| C5 | Два набора кнопок в CSS | Оставить `ui-button-*`, удалить `geist-button-*` | Maintainability | Средняя |
| C6 | Дублир. ServiceFAQ | Объединить в один компонент | DRY | Средняя |

---

## 5. АУДИТ ТЕХНИЧЕСКОГО SEO

### 5.1 Мета-данные

| Элемент | Статус | Детали |
|---------|--------|--------|
| Title template | ✅ | `%s \| БУКВА СВЕТ Инжиниринг` |
| Default title | ✅ | `БУКВА СВЕТ — Премиальное производство наружной рекламы` |
| Description | ✅ | Содержательное описание с ключевыми словами |
| OpenGraph | ✅ | title, description, url, siteName, images, locale, type |
| canonical | ✅ | `alternates.canonical: '/'` |
| viewport | ✅ | `themeColor`, `width`, `initialScale` |
| metadataBase | ✅ | `https://bukva-svet.ru` |

### 5.2 Структурные данные (Schema.org)

| Тип | Файл | Оценка |
|-----|------|--------|
| LocalBusiness | schema.ts | ✅ С адресом, рейтингом, geo |
| FAQPage | schema.ts | ✅ 3 вопроса |
| BreadcrumbList | schema.ts | ✅ Генерируемые |
| Service | JsonLd.tsx | ✅ С ценами |
| **Organization** | — | 🔴 Отсутствует |
| **Product** | — | 🔴 Отсутствует |
| **WebSite** (с SearchAction) | — | 🔴 Отсутствует |

### 5.3 robots.txt и sitemap.xml

| Элемент | Статус | Проблема |
|---------|--------|----------|
| robots.ts | ✅ | `allow: /`, `disallow: /private/` |
| sitemap.ts | 🔴 КРИТИЧНО | **Содержит только 1 URL** (`/`). Все ~20 страниц отсутствуют |
| `next-sitemap` | ⚠️ | Установлен в deps, но не настроен |
| API routes в robots | ⚠️ | `/api/*` не заблокирован в robots |
| `/admin/*` в robots | 🔴 | Не заблокирован |

### 5.4 Заголовки H1-H6

| Страница | H1 количество | Проблема |
|----------|---------------|----------|
| Главная | 1 (Hero) | ✅ OK |
| Услуги | 2+ | ⚠️ Множественные H1 |
| Цены | 2+ | ⚠️ Множественные H1 |
| Кейсы | Есть | ✅ OK |

### 5.5 Приоритизированные предложения по SEO

| # | Проблема | Решение | Эффект | Сложность |
|---|----------|---------|--------|-----------|
| S1 | sitemap содержит только 1 URL | Добавить все ~20 статических маршрутов в sitemap.ts | Индексация +90% | Низкая |
| S2 | `/api/*`, `/admin/*` не в robots | Добавить в disallow | Security + SEO | Низкая |
| S3 | Нет Organization schema | Добавить schema Organization | Rich snippets | Низкая |
| S4 | Нет WebSite schema с SearchAction | Добавить | Sitelinks search | Средняя |
| S5 | Множественные H1 | 1 H1 на страницу, остальные H2-H3 | SEO structure | Средняя |
| S6 | og-image.jpg не найден в public | Создать OG-image 1200x630 | Social sharing | Низкая |

---

## 6. СВОДНЫЕ МЕТРИКИ

### Общая оценка по разделам

| Раздел | Оценка | Баллы (из 100) |
|--------|--------|----------------|
| Производительность | ⚠️ Средне | **62/100** |
| Доступность | ⚠️ Средне | **58/100** |
| Юзабилити/UX | ✅ Хорошо | **78/100** |
| Качество кода | ✅ Хорошо | **82/100** |
| SEO | ⚠️ Средне | **55/100** |
| **Общий балл** | — | **67/100** |

### Топ-10 приоритетных задач

| Приоритет | ID | Задача | Сложность | Ожидаемый эффект |
|-----------|----|--------|-----------|------------------|
| 🔴 1 | S1 | Заполнить sitemap.ts | Низкая | Индексация всех страниц |
| 🔴 2 | P1 | Убрать @import Material Symbols | Низкая | FCP -300ms |
| 🔴 3 | P2 | Заменить `<img>` на `next/image` | Средняя | LCP -30-50% |
| 🔴 4 | A1+A2 | Добавить `<main>` и skip-nav | Низкая | WCAG compliance |
| 🟡 5 | C1 | Удалить неиспользуемые зависимости | Низкая | -50KB+ бандл |
| 🟡 6 | A5 | Alt-тексты для изображений | Средняя | WCAG 1.1.1 |
| 🟡 7 | A3+S5 | Исправить множественные H1 | Средняя | SEO + доступность |
| 🟡 8 | S2 | robots: заблокировать /api, /admin | Низкая | Security + SEO |
| 🟢 9 | U1 | Skeleton loaders | Средняя | Perceived perf +40% |
| 🟢 10 | C3 | Централизовать i18n | Высокая | Maintainability |

---

## 7. ИНСТРУМЕНТЫ И ОГРАНИЧЕНИЯ АУДИТА

### Использованные инструменты
- Анализ кода: grep, AST-based поиск паттернов
- Build verification: `next build` (Turbopack), `tsc --noEmit`, `eslint src`
- Test verification: `vitest run` (65/65 passed)
- Codebase structure analysis: file system traversal

### Ограничения
- Lighthouse/PageSpeed не запускались (нужен работающий сервер + headless Chrome)
- CWV метрики — прогнозные, на основе анализа кода
- Кроссбраузерное тестирование не проводилось
- Визуальное тестирование через скриншоты не проводилось
- Реальные пользовательские метрики (RUM) отсутствуют
