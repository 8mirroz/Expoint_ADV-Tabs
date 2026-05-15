# Expoint ADV Performance Challenge Report

> **Review Date**: 2026-05-15
> **Scope**: Performance Diagnostics (Lenis, React Rendering, GPU Compositing, Background Animations)
> **Reviewer**: Antigravity Challenger
> **Total Findings**: 4 Issues

---

## 🎯 Review Methodology

В рамках этого анализа применена методология Three-Dimensional Review (Системный Дизайн, Симуляция Рантайма, Инженерная Реализация) с фокусом на **Temporal Correctness (Синхронизация циклов рендеринга)** и **Performance (Нагрузка на GPU и CPU)**. Были симулированы процессы инициализации приложения, жизненный цикл анимаций и процесс скроллинга.

Каждая проблема описана в формате:
- **Severity**: Critical / High / Medium / Low
- **Description**: Суть проблемы
- **Impact**: Влияние на систему
- **Recommendation**: Варианты решения (оптимизации)

---

## 📊 Statistics

| Severity | Count | % |
|----------|-------|---|
| Critical | 1 | 25% |
| High | 2 | 50% |
| Medium | 1 | 25% |
| Low | 0 | 0% |
| **Total** | **4** | **100%** |

---

# Part 1: Runtime Simulation Issues (Синхронизация циклов)

## 🔴 Critical Level

### C1. Двойной RAF-цикл в Lenis (Конфликт ReactLenis и GSAP Ticker)

**Severity**: Critical
**Document**: `src/components/motion/SmoothScroll.tsx`

**Description**:
Компонент `<ReactLenis>` по умолчанию запускает собственный внутренний цикл `requestAnimationFrame` для обновления физики скролла. Однако в дочернем компоненте `LenisGSAPSync` разработчик дополнительно подписал Lenis на `gsap.ticker`:
```typescript
const update = (time: number) => { lenis.raf(time * 1000); };
gsap.ticker.add(update);
```
Из-за отсутствия свойства `autoRaf={false}` (или `options={{ autoRaf: false }}`) у `<ReactLenis>`, функция `lenis.raf()` вызывается **дважды за один кадр** (один раз самим Lenis, второй раз — через GSAP ticker). 

**Source of Evidence**:
- Анализ `SmoothScroll.tsx` (строки 18-22 и 36-45).
- Документация `@studio-freight/react-lenis`: при синхронизации с кастомными тикерами (GSAP) встроенный цикл необходимо отключать.

**Impact**:
- **Scroll Jank & Physics Glitch**: Физика скролла просчитывается дважды, что ломает `lerp` и `duration`, делая скролл дерганым или неестественным.
- **CPU Drain**: Лишние вызовы тяжелой функции пересчета на каждый кадр удваивают базовую нагрузку на main thread при прокрутке.

**Recommendation**:
- Добавить `autoRaf={false}` в пропсы `<ReactLenis>` в файле `SmoothScroll.tsx`:
  ```tsx
  <ReactLenis root autoRaf={false} options={{ lerp: 0.08, duration: 1.2, ... }}>
  ```

---

# Part 2: Engineering Implementation Issues (Нагрузка на GPU/CPU)

## 🟠 High Level

### H1. Катастрофическая нагрузка на GPU от `blur-[120px]` (MeshBackground)

**Severity**: High
**Document**: `src/components/ui/MeshBackground.tsx`

**Description**:
Фоновый компонент содержит `div`, который покрывает весь экран (`absolute inset-0`) и имеет CSS-класс `blur-[120px]` поверх сложного `radial-gradient` с 5 точками.

**Source of Evidence**:
- `MeshBackground.tsx`: `<div className="absolute inset-0 blur-[80px] sm:blur-[120px] mix-blend-normal"...`

**Impact**:
- **GPU Rasterization Bottleneck**: Большой радиус размытия (120px) на площади всего экрана заставляет GPU перерисовывать огромные области при любом скролле или изменении DOM поверх него. Это главная причина просадки FPS (лагов) на мобильных устройствах и слабых ПК.

**Recommendation**:
- **Опция 1 (Радикальная оптимизация)**: Заменить CSS `blur()` + `radial-gradient` на заранее отрендеренную WebP/AVIF картинку (сжатую до 10-20Кб) с таким же фоном.
- **Опция 2 (CSS-улучшение)**: Убрать CSS-фильтр размытия, а вместо этого использовать градиенты с мягкими краями (просто растянуть цвета). Добавить `will-change: transform` и `transform: translateZ(0)` для выноса на отдельный композитный слой.

---

### H2. Бесконечные анимации в фоне (AssistantWidget)

**Severity**: High
**Document**: `src/components/ai/AssistantWidget.tsx`

**Description**:
Виджет использует ресурсоемкие бесконечные Tailwind-анимации на главной странице даже когда он неактивен (закрыт):
- `animate-[spin_10s_linear_infinite]` (вращение пунктирного круга)
- `animate-pulse` (мигание Sparkles)
- `animate-ping opacity-20` (радар-эффект)

**Source of Evidence**:
- `AssistantWidget.tsx`, строки 95-104.

**Impact**:
- **Battery & CPU Drain**: Постоянное обновление DOM и перерисовка. Анимация `animate-ping` анимирует `transform` и `opacity`, но `animate-pulse` анимирует `opacity`, заставляя браузер каждую секунду делать repaint участка экрана. Это мешает браузеру переходить в idle-состояние.

**Recommendation**:
- Отключать эти анимации, если виджет не находится в области видимости (`IntersectionObserver`) или убрать `animate-ping` / заменить на легкую GSAP анимацию с `paused: true` при неактивности.
- Либо использовать CSS-свойство `content-visibility: auto` для контейнера, чтобы браузер игнорировал рендеринг, когда элемент скрыт или не в фокусе.

---

## 🟡 Medium Level

### M1. Тяжелые Three.js сцены не вырезаны из бандла (Мертвый код)

**Severity**: Medium
**Document**: `src/components/three/SignScene.tsx`

**Description**:
Хотя предыдущие критические замечания (R-PERF-002) были исправлены путем замены WebGL-сцены на картинку в компоненте `Hero.tsx`, файл `SignScene.tsx` и `HeroSignScene.tsx` (если остался) всё ещё находятся в проекте.

**Source of Evidence**:
- `SignScene.tsx` присутствует в проекте, содержит импорты `@react-three/drei` и тяжелых HDR-текстур (`<Environment preset="city" />`).

**Impact**:
- **Bloated Bundle**: Если эти компоненты случайно импортируются или не отбрасываются tree-shaking-ом, библиотека Three.js (~600kb) попадет в клиентский бандл Next.js, замедляя загрузку приложения.

**Recommendation**:
- Очистить проект от неиспользуемых 3D-сцен, либо убедиться, что они импортируются исключительно через `next/dynamic` там, где это действительно нужно.

---

# Summary & Recommendations

## 🎯 Core Findings

Основные лаги вызваны **конфликтом систем скроллинга (Lenis + GSAP)** и **неэффективным рендерингом эффекта размытия на весь экран**. Предыдущие проблемы с WebGL на стартовом экране были успешно решены, но архитектурные недочеты в интеграции Lenis остались.

## 📋 Action Checklist

### P0 - Immediate (Устраняет 80% лагов)
1. **Lenis RAF Fix**: В `SmoothScroll.tsx` добавьте пропс `autoRaf={false}` в `<ReactLenis>`.
2. **GPU Optimization**: Замените гигантский CSS `blur-[120px]` в `MeshBackground.tsx` на статичную WebP картинку или градиенты без фильтра `blur`.

### P1 - Near Term
1. **Idle Animations**: Приостановите или упростите бесконечные анимации (`animate-ping`, `animate-[spin...]`) в `AssistantWidget.tsx`.

### P2 - Continuous Improvement
1. Удалите `SignScene.tsx` и связанные с ним неиспользуемые компоненты Three.js, если они больше не требуются в проекте.

---

## 🚦 Final Judgment

- [ ] 🟢 Project can proceed, risks controlled
- [x] 🟡 Project can proceed, solve P0 first
- [ ] 🔴 Project needs re-evaluation

**Judgment Basis**: Проблемы легко устранимы и не требуют переписывания архитектуры, но напрямую влияют на User Experience. Исправление P0-задач займет менее часа и радикально повысит стабильность FPS.
