# Expoint ADV (Genesis v10) Challenge Report

> **Review Date**: 2026-05-17
> **Scope**: Genesis v10 Design Docs (PRD, Architecture, Tasks) & UI/UX implementation
> **Reviewer**: AI Challenger (Antigravity)
> **Total Findings**: 4 Issues

---

## 🎯 Review Methodology

This review uses a 3-dimensional analysis framework focused on **UI/UX Premium Design (Rules, Tokens, Style, Usability)**:

1. **System Design** - Design system consistency, token architecture, and boundary enforcement.
2. **Runtime Simulation** - Mobile usability, rendering pipeline (SSR to CSR), network constraints.
3. **Engineering Implementation** - CSS framework limitations, performance bottlenecks, actual component code vs PRD.

---

## 📊 Statistics

| Severity | Count | % |
|----------|-------|---|
| Critical | 1 | 25% |
| High | 2 | 50% |
| Medium | 1 | 25% |
| Low | 0 | 0% |
| **Total** | **4** | **100%** |

| Dimension | Count |
|-----------|-------|
| System Design | 1 |
| Runtime Sim | 2 |
| Engineering | 1 |

---

# Part 1: System Design Issues

## 🔴 Critical Level

### C1. [Design System Drift] Hardcoded UI Values Violate Token Boundaries

**Severity**: Critical
**Document**: `05_TASKS.md` (UI Boundary Rules) vs Component Implementation

**Description**:
В документе `05_TASKS.md` (Раздел 2.3 UI Boundary) строго прописано: *"no hardcoded colors, shadows, spacing or typography values"*. Однако в уже реализованном компоненте `NeonCalculatorV10.tsx` используется прямое внедрение стилей: `style={{ backgroundColor: inputs.isRGB ? '#ff00ff' : '#00ffcc' }}`.
Это нарушает концепцию единого источников истины (Design Tokens). Если маркетинг решит изменить фирменные цвета бренда (например, неоновый акцент), калькулятор придется переписывать вручную.

**Impact**:
- Несогласованность UI: "премиальный" дизайн быстро превратится в франкенштейна из захардкоженных стилей.
- Невозможность глобального переключения тем (Light/Dark mode), так как inline-стили не реагируют на CSS-переменные.

**Recommendation**:
- Внедрить токены для интерактивных состояний в Tailwind конфиг (например, `theme('colors.neon.rgb')`).
- Внедрить линтер (`eslint-plugin-tailwindcss` или custom rule), который запрещает использование inline `style={{ color: ... }}` в UI-компонентах.

---

# Part 2: Runtime Simulation Issues

## 🟠 High Level

### H1. [UX Failure] Mobile Video Autoplay & Low Power Mode

**Severity**: High
**Document**: `01_PRD.md` (REQ-101, REQ-301 - Hero Video Backgrounds)

**Description**:
PRD требует "Атмосферный видеофон". В реальности, на iOS и Android в режиме энергосбережения (Low Power Mode) autoplay-видео **принудительно блокируется** браузером. В результате вместо премиального видео пользователь увидит пустой серый/черный квадрат или некрасивый "Play" button.

**Impact**:
- Разрушение первого впечатления (Hero-секция) у 20-30% мобильных пользователей. Ощущение "дешевого" или сломанного сайта, что прямо бьет по конверсии B2B.

**Recommendation**:
- Внедрить обязательный атрибут `poster` для всех видео-тегов с высококачественным статичным fallback-изображением (webp).
- Скрипт проверки `video.play().catch()`: если видео заблокировано, плавно переключать UI на статичный премиальный градиент или картинку.

### H2. [UX Friction] 100MB File Upload over Mobile/Unstable Networks

**Severity**: High
**Document**: `01_PRD.md` (REQ-305 - DWG/PDF до 100 МБ) & `05_TASKS.md` (Upload Pre-Sign API)

**Description**:
Архитектура предполагает загрузку файлов до 100 МБ через Pre-signed URL (прямо в S3). При симуляции: архитектор с iPad на стройке пытается загрузить 80 МБ DWG файл. Сеть моргает. Обычный PUT-запрос в S3 обрывается, загрузка начинается с нуля. На 3-й раз пользователь уходит.

**Impact**:
- Потеря самых "горячих" и крупных лидов (с готовым ТЗ), так как форма захвата становится непреодолимым барьером.

**Recommendation**:
- Использовать Multipart Upload для файлов > 10MB (S3 поддерживает это).
- Интегрировать библиотеку типа Uppy.js, которая умеет делать resumable uploads (дозагрузку при обрыве связи), сохраняя "премиальный" опыт с прогресс-баром.

---

# Part 3: Engineering Implementation Issues

## 🟡 Medium Level

### M1. [Performance] Hydration CLS on Interactive Islands

**Severity**: Medium
**Document**: `02_ARCHITECTURE_OVERVIEW.md` (Section 5: Client Components / Hydration Rule)

**Description**:
Архитектура требует отображать "Skeleton" до гидратации. Калькулятор неона — это огромный блок. Если он рендерится как Skeleton, а затем заменяется на интерактивный Framer Motion компонент, произойдет резкий скачок верстки (Layout Shift), если высота Skeleton не совпадает с высотой готового калькулятора до пикселя на всех брейкпоинтах.

**Impact**:
- Просадка метрики CLS (Cumulative Layout Shift) в Core Web Vitals, что негативно влияет на SEO-ранжирование и рушит магию "плавного премиального UI".

**Recommendation**:
- Рендерить статический UI калькулятора на сервере (RSC), а интерактивность навешивать поверх (через Server Actions или аккуратную гидратацию), вместо полной замены Skeleton -> Component.

---

# Summary & Recommendations

## 🎯 Core Findings

**Critical Issues**: Дизайн-токены не соблюдаются в коде на практике (Inline стили в калькуляторе).
**High Issues**: Игнорирование сетевых и аппаратных ограничений мобильных устройств (Low Power Mode блокирует видео, обрывы сети убивают загрузку 100MB файлов).
**Systemic Risks**: Погоня за "премиальностью" (видео, тяжелые 3D, анимации) конфликтует с B2B-конверсией на нестабильных сетях.

---

## 📋 Action Checklist

### P0 - Immediate (Blocking)
1. **[C1]** Убрать inline-цвета из `NeonCalculatorV10.tsx`, перевести на CSS variables или Tailwind Theme.
2. **[H1]** Добавить сжатые `.webp` постеры для всех `ServiceHero` видео и обработать ошибку autoplay.

### P1 - Near Term (Important)
1. **[H2]** Изменить архитектуру `Upload Pre-Sign API` на поддержку Resumable/Multipart Uploads.
2. **[M1]** Жестко зафиксировать высоту `min-h-[xxx]` для контейнера калькулятора, чтобы исключить CLS при гидратации.

---

## 🚦 Final Judgment

- [ ] 🟢 Project can proceed, risks controlled
- [x] 🟡 Project can proceed, solve P0 first
- [ ] 🔴 Project needs re-evaluation

**Judgment Basis**: Архитектура жизнеспособна, но требует "заземления" премиальных фичей (видео, анимации, тяжелые загрузки) на суровую реальность мобильных сетей и ограничений браузеров.

---

## 📚 Appendix

### A. Pre-Mortem Analysis

| Failure Scenario | Root Cause | Probability | Related Issues |
|------------------|------------|:-----------:|----------------|
| Сайт "тормозит" и прыгает при загрузке | Гидратация больших островов с анимациями без точных размеров | 🟡 Med | M1 |
| Черный экран вместо Hero-видео | Low Power Mode на iOS блокирует autoplay | 🔴 High | H1 |
| Лид не может прикрепить ТЗ | Обрыв PUT-запроса на S3 для тяжелых файлов | 🔴 High | H2 |

### B. Assumption Validation Results

| Assumption | Method | Result | Risk |
|------------|--------|--------|:----:|
| Framer Motion работает плавно везде | Known limits | На бюджетных Android сложный glow/blur вызывает падение FPS. Нужно отключать эффекты по `prefers-reduced-motion` | ⚠️ |
| Пользователи готовы грузить 100МБ в браузер | Analogy | Часто просят "отправить на почту". Добавить опцию "Прикрепить ссылку на диск" | ⚠️ |
| Видео-фоны всегда проигрываются | Official Doc | Safari/Chrome блокируют autoplay в Low Power Mode | ❌ |
