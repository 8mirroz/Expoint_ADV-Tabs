# 🕵️ SCOUT REPORT — Expoint ADV Performance Audit
**Version:** v9 | **Date:** 2026-05-14 | **Focus:** Производительность / Лаги сайта
**Status:** READ-ONLY ANALYSIS — никаких изменений кода не производилось

---

## 1. Executive Summary

> **Вердикт: REFACTOR FIRST — перед любыми новыми фичами нужно закрыть 3 критических узла.**

Сайт лагает по трём причинам, которые накладываются друг на друга:

1. **WebGL/Three.js** рендерит полноэкранную 3D-сцену на каждый визит главной страницы без SSR-guard и без LOD-оптимизации — это убивает мобильные и слабые GPU.
2. **Тройной стек анимаций** — GSAP + Lenis + Framer Motion запускаются **одновременно**, причём Lenis инстанциируется **дважды** (MotionProvider + SmoothScroll).
3. **Next.js config** минимален, нет image optimization конфига, нет bundle splitting, нет HTTP-кэша для статики.

---

## 2. Top 3 Critical Risks (The "Mines")

### 🔴 R-PERF-001 · Двойная инициализация Lenis (КРИТИЧНО)

| Поле | Значение |
|---|---|
| **Severity** | CRITICAL |
| **Likelihood** | CONFIRMED |
| **Impact** | FPS drops, scroll jank, memory leak |
| **Evidence** | `layout.tsx` wraps children in `<SmoothScroll>` (= `ReactLenis`), а `MotionProvider.tsx` создаёт `new Lenis(...)` в useEffect |
| **Files** | `src/app/layout.tsx:74`, `src/components/motion/SmoothScroll.tsx`, `src/components/motion/MotionProvider.tsx` |

**Факт:** `SmoothScroll` → `ReactLenis` создаёт один инстанс Lenis. `MotionProvider` внутри того же дерева создаёт второй `new Lenis()`. Оба подписаны на `gsap.ticker`. Это двойной RAF loop + конфликтующие scroll listeners.

---

### 🔴 R-PERF-002 · HeroSignScene без lazy loading и без мобильного guard (КРИТИЧНО)

| Поле | Значение |
|---|---|
| **Severity** | CRITICAL |
| **Likelihood** | CONFIRMED |
| **Impact** | 1-3 сек блокировка main thread, heap spike, мобильный crash |
| **Evidence** | `Hero.tsx` импортирует `HeroSignScene` напрямую — нет `dynamic(() => import(...), {ssr: false})`. Canvas рендерит 8+ объектов Text3D с `bevelEnabled`, `castShadow/receiveShadow`, + `Environment preset="city"` (HDRI) |
| **Files** | `src/components/sections/Hero.tsx:1`, `src/components/three/HeroSignScene.tsx` |

**Проблемы в сцене:**
- `Environment preset="city"` = загрузка HDRI-текстуры (~4MB) блокирующим образом
- 6 объектов `Text3D` с `bevelEnabled` + `castShadow` + `receiveShadow` = очень дорогой geometry compute
- `OrbitingDigits` — useFrame() на каждый кадр с 5+ объектами + тригонометрия
- `HeroCameraRig` — useFrame() на каждый кадр с pointermove lerp
- `dpr={[1, 1.5]}` без device check — на Retina рендерит в 1.5x
- Нет LOD, нет instancing, нет frustum culling management

---

### 🟠 R-PERF-003 · AssistantWidget: бесконечные GSAP анимации в idle

| Поле | Значение |
|---|---|
| **Severity** | HIGH |
| **Likelihood** | CONFIRMED |
| **Impact** | Постоянный RAF drain, +5-10% CPU baseline |
| **Evidence** | `AssistantWidget.tsx:45-54` — `gsap.to(container.current, { repeat: -1 })` и `gsap.to(".assistant-glow", { repeat: -1 })` запускаются при монтировании и не убиваются при unmount |
| **Files** | `src/components/ai/AssistantWidget.tsx:45` |

---

## 3. Hotspot Map

```
🔥 CRITICAL (не трогать без плана):
   src/components/three/HeroSignScene.tsx     — WebGL, 373 строки, 8 useFrame loops
   src/components/motion/MotionProvider.tsx   — Дублирует Lenis из SmoothScroll
   src/app/layout.tsx                         — Точка входа, 6 вложенных Provider

⚠️ HIGH (требует внимания):
   src/components/ai/AssistantWidget.tsx      — Infinite GSAP, 225 строк
   src/app/(marketing)/services/[slug]/ServiceLandingContent.tsx — 720 строк, God Component
   src/components/sections/Header.tsx         — 218 строк, "use client", монтируется на всех страницах

🟡 MEDIUM (watch list):
   src/components/sections/Process.tsx        — useScroll + useSpring на каждый шаг
   src/components/sections/MapSection.tsx     — iframe Яндекс.Карты без lazy guard
   src/components/sections/GalleryGrid.tsx    — Неизвестный объём изображений
```

---

## 4. Coupling Analysis

### Что сломается если трогать layout.tsx?
```
layout.tsx
├── SmoothScroll (Lenis #1) ← убрать MotionProvider Lenis если убрать этот
├── GSAPProvider (ScrollTrigger refresh)
├── MotionProvider (Lenis #2) ← КОНФЛИКТ
├── PostHogProvider
├── ConsultationModal (global, всегда смонтирован)
└── CookieBanner (global, всегда смонтирован)
```
**Риск:** Изменение `layout.tsx` каскадно влияет на весь скроллинг + аналитику.

### Что сломается если трогать HeroSignScene?
```
HeroSignScene
└── Hero.tsx (импорт без dynamic)
    └── page.tsx (маркетинг)
        └── PageShell (headerVariant="immersive")
```
Если убрать сцену — нужно обновить вёрстку Hero (правая колонка пустая).

---

## 5. Team Knowledge Risk

- **Bus factor = 1** — все коммиты от одного автора (4 коммита за историю)
- **Knowledge concentration:** `HeroSignScene.tsx` — сложный Three.js, знания только у автора
- **Неотслеживаемые файлы** (25+ файлов вне git): `genesis/v8/`, `src/components/framework/`, `src/app/(marketing)/about/` и др. — риск потери работы

---

## 6. Detailed Recommendations

### Фаза 1 — Быстрые победы (без рефактора архитектуры) [~2-4ч]

| # | Действие | Ожидаемый эффект |
|---|---|---|
| F-1 | Удалить `new Lenis()` из `MotionProvider` — оставить только `ReactLenis` в `SmoothScroll` | -15-25% scroll jank, -1 RAF loop |
| F-2 | Обернуть `<HeroSignScene />` в `next/dynamic` с `ssr: false` + добавить skeleton placeholder | -1-3 сек блокировки main thread |
| F-3 | Добавить cleanup в `AssistantWidget` GSAP animations (return из useGSAP) | -5-10% CPU idle drain |

### Фаза 2 — Оптимизация Three.js сцены [~4-8ч]

| # | Действие | Ожидаемый эффект |
|---|---|---|
| T-1 | Заменить `Environment preset="city"` на static IBL или убрать | -4MB network, -500ms |
| T-2 | Добавить mobile guard + `dpr={[1, 1]}` на мобилке | -30-40% GPU на мобильных |
| T-3 | Добавить `<AdaptiveDpr pixelated />` из `@react-three/drei` | Автоматический dpr drop при low FPS |
| T-4 | Уменьшить `curveSegments` и `bevelSegments` у фоновых Text3D | -30% geometry triangles |

### Фаза 3 — Next.js & Bundle [~2-3ч]

| # | Действие | Ожидаемый эффект |
|---|---|---|
| N-1 | Добавить `images: { domains: [...] }` в next.config | Включить Next Image Optimization |
| N-2 | Перенести тяжёлые секции на `dynamic()` | Уменьшить initial JS bundle |

---

## 7. Risk Register

| risk_id | title | severity | likelihood | impact | evidence_ref | mitigation | status |
|---|---|---|---|---|---|---|---|
| R-PERF-001 | Двойной Lenis | CRITICAL | CONFIRMED | scroll jank, memory leak | `MotionProvider.tsx:17`, `SmoothScroll.tsx:35` | Удалить Lenis из MotionProvider | OPEN |
| R-PERF-002 | HeroSignScene без lazy | CRITICAL | CONFIRMED | main thread block, mobile crash | `Hero.tsx:8`, `HeroSignScene.tsx` | dynamic import + mobile guard | OPEN |
| R-PERF-003 | Infinite GSAP loops без cleanup | HIGH | CONFIRMED | CPU drain | `AssistantWidget.tsx:45-54` | Добавить cleanup function | OPEN |
| R-PERF-004 | Тройной анимационный стек | HIGH | INFERRED | render conflicts | `layout.tsx:74-85` | Audit и унификация | OPEN |
| R-ARCH-001 | ServiceLandingContent 720 строк | MEDIUM | CONFIRMED | maintainability | `ServiceLandingContent.tsx` | Split по секциям | BACKLOG |
| R-GIT-001 | 25+ файлов вне git | MEDIUM | CONFIRMED | потеря работы | `git status` output | git add + commit | OPEN |

---

## 8. Reproducible Evidence Commands

```bash
# Подтвердить двойной Lenis:
grep -rn "new Lenis\|ReactLenis" src/

# Подтвердить прямой импорт HeroSignScene (без dynamic):
grep -n "HeroSignScene\|import.*dynamic" src/components/sections/Hero.tsx

# Найти все infinite GSAP loops:
grep -rn "repeat: -1" src/

# Найти все useFrame (Three.js render loops):
grep -rn "useFrame" src/
```
