# ADR-002: Section Registry Pattern

**Status**: Accepted  
**Date**: 2026-05-14  
**Context**: Genesis v8

## Context

Платформа содержит 20+ секций (Hero, Services, Safety, Process, FAQ, Map и т.д.), но нет единого механизма для декларативной сборки страниц из этих секций.

## Decision

Использовать паттерн **Section Registry** — централизованный маппинг `sectionType → React Component`:

```typescript
// SectionRegistry.ts
export const SECTION_REGISTRY: Record<string, React.ComponentType<any>> = {
  'hero-generic': HeroGeneric,
  'hero-home': Hero,
  'stats': StatsSection,
  'cta': CTASection,
  'values': ValuesSection,
  'team': TeamSection,
  'faq': FAQ,
  'map': MapSection,
  'services': Services,
  // ...
};
```

`PageRenderer` итерирует массив `SectionConfig[]` и рендерит компоненты:

```typescript
export function PageRenderer({ sections }: { sections: SectionConfig[] }) {
  return sections.map(section => {
    const Component = SECTION_REGISTRY[section.type];
    return Component ? <Component key={section.id} {...section.props} /> : null;
  });
}
```

## Alternatives Considered

1. **Manual composition** (текущий подход) — не масштабируется
2. **CMS-driven** (Contentful/Sanity) — overkill для текущего масштаба
3. **MDX pages** — ограничена интерактивность и типизация

## Consequences

- (+) Декларативная сборка страниц
- (+) Type-safe через SectionConfig
- (+) Легко добавлять новые секции
- (+) Единая точка для аудита используемых секций
- (-) Все секции должны быть зарегистрированы
- (-) Props не полностью типизированы (Record<string, unknown>)
