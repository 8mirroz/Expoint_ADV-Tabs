# ADR-003: Navigation System Upgrade

**Status**: Accepted  
**Date**: 2026-05-14  
**Context**: Genesis v8

## Context

Текущий Header содержит только anchor-ссылки (`#services`, `#process`, `#cases`, `#footer`) на секции главной страницы. На внутренних страницах эти ссылки не работают. Пользователь не может перейти на /about, /contacts, /portfolio из Header.

## Decision

Модифицировать Header для поддержки **полной маршрутной навигации**:

1. **Основная навигация** — ссылки на маршруты:
   - Услуги → `/services`
   - Цены → `/prices`
   - Каталог → `/catalog`
   - Кейсы → `/cases`
   - О нас → `/about`
   - Контакты → `/contacts`

2. **Выделение активного маршрута** через `usePathname()`.

3. **Breadcrumbs** — отдельный компонент `BreadcrumbsBar`, отображается под Header на внутренних страницах.

4. **Мобильная навигация** — полноэкранное меню со всеми маршрутами.

## Alternatives Considered

1. **Mega-menu с dropdown** — overcomplicated для текущего количества страниц
2. **Sidebar navigation** — не соответствует landing-page эстетике
3. **Anchor-only (текущий)** — не масштабируется

## Consequences

- (+) Полная навигация по сайту
- (+) Работает на всех страницах
- (+) Визуальная индикация текущего маршрута
- (-) Нужно обновить Header.tsx (breaking change навигации)
