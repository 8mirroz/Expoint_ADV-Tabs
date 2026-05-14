# ADR-001: Page Shell Architecture

**Status**: Accepted  
**Date**: 2026-05-14  
**Context**: Genesis v8

## Context

Каждая страница Expoint ADV вручную импортирует Header, Footer, AssistantWidget и другие общие элементы. Это приводит к:
- Дублированию кода
- Несогласованности: где-то Footer есть, где-то нет
- Сложности добавления нового глобального элемента

## Decision

Создать единый компонент `PageShell` в `src/components/framework/PageShell.tsx`, который:
1. Принимает `children` для основного контента
2. Управляет вариантами Header (`default`, `immersive`, `minimal`)
3. Включает Footer, ConsultationModal, CookieBanner, AssistantWidget
4. Поддерживает опциональные Breadcrumbs
5. Является **Server Component** (Header/Footer импортируются как client)

## Alternatives Considered

1. **Next.js Layout per route group** — слишком много дублирования между группами
2. **Единый layout.tsx** — не позволяет варьировать Header по странице
3. **HOC-обёртка** — сложнее тестировать и типизировать

## Consequences

- (+) Единая точка управления layout
- (+) Новая страница = PageShell + контент
- (+) Легко добавлять глобальные элементы
- (-) Все страницы зависят от PageShell
