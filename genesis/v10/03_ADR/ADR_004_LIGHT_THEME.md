# ADR-004: Light Theme Design System

**Status**: Accepted  
**Date**: 2026-05-14  
**Context**: Genesis v8

## Context

Текущий проект использует строго тёмную тему (Verge 2024 Dark Mode) с `forcedTheme="dark"`. Пользователь запросил **переход на светлую тему** как основную, с полным обновлением дизайн-системы.

## Decision

1. **Light-first палитра** — новые дизайн-токены в `tokens.css` с белым/светлым фоном, тёмным текстом.
2. **layout.tsx** — `defaultTheme="light"`, убрать `forcedTheme="dark"`.
3. **Ключевые цвета** сохраняют бренд-идентичность (акцентный mint / ultraviolet), но адаптируются для светлого фона.
4. **Все секции** проверяются на контрастность в светлой теме.
5. **Dark mode остаётся как альтернатива** через ThemeToggle (опционально).

## New Token Structure (Light)

```css
:root {
  --background: #ffffff;
  --surface: #f5f5f5;
  --surface-variant: #fafafa;
  --surface-elevated: #ffffff;
  --on-surface: #1a1a1a;
  --on-surface-variant: #6b6b6b;
  --primary: #0d9373;        /* Deeper mint for light bg contrast */
  --on-primary: #ffffff;
  --secondary: #5200ff;
  --outline: #e0e0e0;
  --outline-strong: #0d9373;
}
```

## Consequences

- (+) Более профессиональный, чистый вид
- (+) Лучшая читаемость на экранах при дневном свете
- (+) Современный тренд в B2B/корпоративных сайтах
- (-) Требует проверки контрастности всех компонентов
- (-) Изображения и видео могут потребовать адаптации
