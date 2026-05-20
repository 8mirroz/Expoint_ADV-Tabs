# Expoint ADV — Design System v1.0

> **Статус**: `ACTIVE` — Приоритетный стиль для всех правок, обновлений и генераций.
> **Дата**: 2026-05-20
> **Источник**: Утверждённый UI от 20.05.2026 (Hero, FAQ, Safety, ServiceRates, DesignProjectCTA, Process)

---

## 0. Философия дизайна

### Концепция: **Dark Engineering Premium**

Стиль объединяет три парадигмы:

1. **Dark Mode First** — глубокий чёрный фон (#050508–#090909) создаёт ощущение технологической экспертности
2. **Neon Accent Signal** — яркий зелёный (#00ffa3) как единственный акцентный цвет, используемый хирургически точно для CTA, индикаторов и состояний
3. **Engineering Aesthetic** — моноширинный шрифт для лейблов, uppercase tracking, индустриальная сетка на фоне, техническая терминология (OPS, SYS, PACK)

### Ключевые принципы

| Принцип | Реализация |
|---|---|
| **Контраст** | Белый текст на чёрном фоне, зелёный акцент — ничего лишнего |
| **Иерархия** | 5 уровней: Hero Display → Section Heading → Card Title → Body → Mono Label |
| **Плотность** | Высокая информационная плотность, минимальное декоративное пространство |
| **Интерактивность** | Каждый элемент реагирует на hover: glow, translateY, border-color transition |
| **Технический тон** | Кикеры, лейблы и метки в моноширинном шрифте, uppercase, wide tracking |

### Запрещено

- Светлые фоны для маркетинговых секций (кроме Safety quiz widget в light-mode)
- Цветные градиенты как основной фон (только точечные акценты)
- Более 2 акцентных цветов на секцию
- Анимации длительностью > 700ms
- Декоративные элементы без функционального назначения

---

## 1. Цветовая система

### 1.1 Фоновые поверхности (Backgrounds)

```css
/* ─── Surface System ─────────────────────────────── */
--ds-bg-page:         #050508;    /* Главный фон страницы (Hero) */
--ds-bg-section:      #090909;    /* Фон секции (ServiceRates) */
--ds-bg-section-alt:  #070807;    /* Альтернативный фон (DesignProjectCTA) */
--ds-bg-card:         linear-gradient(180deg, rgba(12,12,14,0.94), rgba(8,8,10,0.9));
--ds-bg-card-inner:   #090b14;    /* Вложенный контент (PreviewCard) */
--ds-bg-faq:          #000000;    /* FAQ / черные секции */
--ds-bg-elevated:     rgba(255,255,255,0.04);  /* Слабо поднятый элемент */
--ds-bg-input:        rgba(255,255,255,0.05);  /* Поля ввода */
```

### 1.2 Текстовые цвета (Text)

```css
/* ─── Text System ────────────────────────────────── */
--ds-text-primary:    #ffffff;                    /* Заголовки, ключевые данные */
--ds-text-secondary:  rgba(255,255,255,0.80);     /* Подзаголовки */
--ds-text-body:       rgba(255,255,255,0.55);     /* Основной текст */
--ds-text-muted:      rgba(255,255,255,0.40);     /* Подписи, лейблы */
--ds-text-ghost:      rgba(255,255,255,0.34);     /* Мета-лейблы (PACK, OPS) */
--ds-text-disabled:   rgba(255,255,255,0.20);     /* Неактивные элементы */
```

### 1.3 Акцентные цвета (Accents)

```css
/* ─── Accent: Neon Green ─────────────────────────── */
--ds-accent:          #00ffa3;    /* PRIMARY — CTA, badges, icons, checks */
--ds-accent-rgb:      0, 255, 163;
--ds-accent-hover:    #00ffa3/90; /* Hover state для кнопок */
--ds-accent-soft:     rgba(0,255,163,0.10);    /* Фон badge/icon */
--ds-accent-softer:   rgba(0,255,163,0.05);    /* Деликатный фон */
--ds-accent-border:   rgba(0,255,163,0.20);    /* Рамки badge/icon */
--ds-accent-glow:     0 0 30px rgba(0,255,163,0.35);  /* CTA shadow */
--ds-accent-glow-lg:  0 0 50px rgba(0,255,163,0.50);  /* Hover shadow */

/* ─── Accent: Gradient (Hero Headlines) ──────────── */
--ds-gradient-accent:  linear-gradient(135deg, #00ffa3 0%, #00c8ff 100%);

/* ─── Accent: Purple (Secondary Glow) ────────────── */
--ds-purple:          #7928ca;
--ds-purple-glow:     rgba(121,40,202,0.15);
```

### 1.4 Семантические цвета (Status)

```css
/* ─── Status Colors ──────────────────────────────── */
--ds-success:         #10b981;    /* Emerald — подтверждение, compliance */
--ds-success-soft:    rgba(16,185,129,0.10);
--ds-success-border:  rgba(16,185,129,0.20);

--ds-error:           #ee0000;    /* Красный — risk, alert, штраф */
--ds-error-soft:      rgba(238,0,0,0.15);
--ds-error-border:    rgba(238,0,0,0.40);

--ds-warning:         #f5a623;    /* Amber — предупреждения */
--ds-warning-soft:    rgba(245,166,35,0.05);
--ds-warning-border:  rgba(245,166,35,0.40);
```

### 1.5 Цвета категорий услуг (Service Category Tags)

```css
/* ─── Category Color Map ─────────────────────────── */
--ds-cat-volumetric:     #ff4f73;   /* Объёмные буквы — розовый */
--ds-cat-lightbox:       #3395ff;   /* Световые короба — голубой */
--ds-cat-neon:           #ffb033;   /* Гибкий неон — оранжевый */
--ds-cat-roof:           #8c8be6;   /* Крышные установки — фиолетовый */
--ds-cat-metal:          #34d399;   /* Монтаж / Металл — изумрудный */
--ds-cat-pylon:          #e879f9;   /* Панель-кронштейны — розово-фиолетовый */
```

**Правило применения**: каждый цвет используется ТОЛЬКО для соответствующей категории. Для каждого цвета формируется тетрада:
- `borderColor: rgba(R,G,B, 0.25)`
- `bgColor: rgba(R,G,B, 0.06)`
- `textColor: <color>`
- `glowColor: rgba(R,G,B, 0.2)`

### 1.6 Рамки и разделители (Borders)

```css
/* ─── Border System ──────────────────────────────── */
--ds-border-subtle:   rgba(255,255,255,0.05);    /* Минимальная рамка секции */
--ds-border-default:  rgba(255,255,255,0.08);    /* Стандартная рамка, border-y */
--ds-border-card:     rgba(255,255,255,0.10);    /* Рамка карточки */
--ds-border-input:    rgba(255,255,255,0.10);    /* Поля ввода */
--ds-border-input-focus: rgba(0,255,163,0.40);   /* Focus state */
--ds-border-divider:  rgba(255,255,255,0.06);    /* Внутренние разделители */
--ds-border-hover:    rgba(0,255,163,0.35);      /* Hover рамка карточки */
```

---

## 2. Типографика

### 2.1 Шрифтовое семейство

```css
--ds-font-sans:      "Inter", ui-sans-serif, system-ui, sans-serif;
--ds-font-headline:  "Inter", ui-sans-serif, system-ui, sans-serif;
--ds-font-mono:      "Inter", ui-sans-serif, system-ui, sans-serif;
```

> **Примечание**: Все семейства ведут к Inter. При необходимости `--font-headline` может быть заменён на другой шрифт без изменения компонентов.

### 2.2 Типографические масштабы

| Токен | Размер | Вес | Leading | Tracking | Применение |
|---|---|---|---|---|---|
| `ds-display-hero` | clamp(2.4rem, 4.5vw+1rem, 4.2rem) | 900 (black) | 1.05 | -0.04em | Hero H1 |
| `ds-display-xl` | clamp(3.5rem, 3rem+5vw, 6rem) | 700 (bold) | 1.1 | -0.03em | Section heading крупный |
| `ds-display-lg` | clamp(2.5rem, 2.2rem+3vw, 4rem) | 700 | 1.2 | -0.02em | Section heading |
| `ds-display-md` | clamp(1.75rem, 1.5rem+2vw, 2.5rem) | 700 | 1.3 | -0.01em | Sub-section heading |
| `ds-display-sm` | clamp(1.35rem, 1.2rem+1.5vw, 1.75rem) | 700 | 1.4 | normal | Card heading / Stepper question |
| `ds-title-card` | 2rem–2.2rem | 900 (black) | 0.96 | -0.024em | Service card title (uppercase) |
| `ds-body-lg` | 1.05rem | 400 | 1.75 | normal | Hero subtitle |
| `ds-body-md` | 14–15px | 400 | 1.7 | normal | Section body text |
| `ds-body-sm` | 13–13.5px | 400 | 1.6 | normal | Card description |
| `ds-label-mono` | 10–12px | 700 (bold) | 1.2 | 0.15em–0.22em | Kicker, meta-label (UPPERCASE) |
| `ds-label-tag` | 11px | 600 | 1.2 | 0.10em | Category tag (UPPERCASE) |
| `ds-caption` | 9–10px | 500–700 | 1.2 | 0.16em–0.20em | Badge, metric label (UPPERCASE) |

### 2.3 Текстовые паттерны

#### Eyebrow / Kicker
```css
.ds-kicker {
  font-family: var(--ds-font-mono);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.20em;
  color: var(--ds-accent); /* или --ds-text-ghost */
}
```

#### Section Title с hover gradient
```css
.ds-section-title {
  font-family: var(--ds-font-headline);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: var(--ds-text-primary);
}
/* Hover: background-clip text gradient → #00ffa3 → #00c8ff */
```

#### Mono Label (Technical)
```css
.ds-mono-label {
  font-family: var(--ds-font-mono);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: normal;
  color: var(--ds-text-muted);
}
```

---

## 3. Пространственная система (Spacing)

### 3.1 Базовая единица: 4px

```css
--ds-space-1:   4px;     /* Микро-отступ */
--ds-space-2:   8px;     /* Внутренний отступ chip */
--ds-space-3:   12px;    /* Зазор между мелкими элементами */
--ds-space-4:   16px;    /* Стандартный gap */
--ds-space-5:   20px;    /* Padding card tight */
--ds-space-6:   24px;    /* Padding card standard / gap row */
--ds-space-8:   32px;    /* Gap между блоками */
--ds-space-10:  40px;    /* Крупный gap */
--ds-space-12:  48px;    /* Section internal separation */
--ds-space-16:  64px;    /* Section padding medium */
--ds-space-20:  80px;    /* Section padding large */
--ds-space-24:  96px;    /* Section padding desktop */
```

### 3.2 Section Spacing

```css
/* Padding секций (вертикальный) */
.ds-section-tight   { padding-block: 40px; }      /* py-10 */
.ds-section-default  { padding-block: 48px; }      /* py-12 */
.ds-section-spacious { padding-block: 64px 96px; }  /* py-16 lg:py-24 */

/* Контейнер */
--ds-container-max:   1440px;
--ds-container-px:    24px;     /* 6 в rem */
--ds-container-px-lg: 48px;    /* lg:px-12 */
--ds-container-px-xl: 64px;    /* xl:px-16 */
```

### 3.3 Card Padding

| Контекст | Padding | Пример |
|---|---|---|
| Compact card | `p-3 – p-4` | Pricing detail block, stat chip |
| Standard card | `p-5 – p-6` | ServiceRate card, DesignProject panel |
| Spacious card | `p-6 md:p-8` | FAQ accordion, Safety card |

---

## 4. Геометрия (Radii & Shapes)

### 4.1 Border Radius

```css
--ds-radius-xs:    4px;      /* Внутренние элементы (complexity bar segment) */
--ds-radius-sm:    8px;      /* Мелкие теги, code blocks */
--ds-radius-md:    12px;     /* Стандартные кнопки-опции, inputs */
--ds-radius-lg:    16px;     /* Стандартная карточка */
--ds-radius-xl:    20px;     /* Премиальная карточка (ServiceRate) */
--ds-radius-2xl:   24px;     /* FAQ item, Safety card */
--ds-radius-3xl:   32px;     /* Hero preview card */
--ds-radius-pill:  100px;    /* CTA кнопки, chips, eyebrow badges */
--ds-radius-full:  9999px;   /* Круглые элементы (dot, icon badge) */
```

### 4.2 Правила применения

| Элемент | Радиус |
|---|---|
| CTA Button (primary/secondary) | `--ds-radius-pill` (100px) |
| Input field | `--ds-radius-md` (12px) |
| Card (standard) | `--ds-radius-xl` (20px) |
| Card (premium frame) | `--ds-radius-3xl` (32px) |
| FAQ item | `--ds-radius-2xl` (24px) |
| Chip / tag | `--ds-radius-pill` (100px) |
| Icon container | `--ds-radius-md` (12px) |
| Badge (tiny) | `--ds-radius-pill` (100px) |
| Code block | `--ds-radius-sm` (8px) |

---

## 5. Тени и свечение (Elevation & Glow)

### 5.1 Система теней

```css
/* ─── Dark Mode Shadows ──────────────────────────── */
--ds-shadow-card:
  0 18px 46px rgba(0,0,0,0.32),
  inset 0 1px 0 rgba(255,255,255,0.04);

--ds-shadow-card-hover:
  0 24px 54px rgba(0,0,0,0.45),
  0 0 0 1px rgba(0,255,163,0.2);

--ds-shadow-panel:
  0 24px 64px rgba(0,0,0,0.5),
  inset 0 1px 0 rgba(255,255,255,0.05);

--ds-shadow-frame:
  0 40px 120px rgba(0,0,0,0.6),
  0 0 0 1px rgba(255,255,255,0.04);
```

### 5.2 Glow Effects

```css
/* ─── Glow System ────────────────────────────────── */
--ds-glow-accent:      0 0 30px rgba(0,255,163,0.35);    /* CTA button */
--ds-glow-accent-lg:   0 0 50px rgba(0,255,163,0.50);    /* CTA hover */
--ds-glow-icon:        0 0 15px rgba(0,255,163,0.05);    /* Icon container */
--ds-glow-icon-hover:  0 0 20px rgba(0,255,163,0.15);    /* Icon hover */
--ds-glow-dot:         0 0 8px rgba(0,245,160,0.7);       /* Status dot */
--ds-glow-category:    0 8px 20px rgba(0,0,0,0.5);       /* Category tag hover */
```

---

## 6. Компонентная система

### 6.1 CTA Button — Primary

```
┌─────────────────────────────────────────┐
│  ●  УСЛУГИ И ЦЕНЫ  →                   │
└─────────────────────────────────────────┘

Высота:        56px (h-14)
Padding:       32px по горизонтали (px-8)
Border-radius: 100px (pill)
Background:    #00ffa3
Text:          black, 13px, font-weight 900, uppercase, tracking 0.12em
Shadow:        0 0 30px rgba(0,255,163,0.35)
Icon:          ArrowRight, 16px, справа

Hover:
  translateY(-2px)
  bg opacity 90%
  shadow усиливается до 0.50

Active:
  scale(0.97)
```

### 6.2 CTA Button — Secondary

```
┌─────────────────────────────────────────┐
│  Скачать каталог  ›                     │
└─────────────────────────────────────────┘

Высота:        56px (h-14)
Padding:       28px (px-7)
Border-radius: 100px (pill)
Background:    rgba(255,255,255,0.04)
Border:        1px solid rgba(255,255,255,0.12)
Text:          white/80, 13px, font-weight 600, tracking -0.01em
Backdrop:      blur(sm)

Hover:
  translateY(-2px)
  border → rgba(255,255,255,0.25)
  bg → rgba(255,255,255,0.08)
  text → white
```

### 6.3 Category Tag / Chip

```
┌──────────────────┐
│  ОБЪЁМНЫЕ БУКВЫ  │
└──────────────────┘

Height:       auto
Padding:      6px 14px (py-1.5 px-3.5)
Border-radius: 100px (pill)
Border:       1px solid rgba(color, 0.25)
Background:   rgba(color, 0.06)
Text:         color, 11px, font-weight 600, uppercase, tracking 0.10em
Font:         --font-mono

Hover:
  border → solid color
  bg → rgba(color, 0.15)
  shadow → 0 8px 20px rgba(0,0,0,0.5), 0 0 14px rgba(color, 0.2)
  translateY(-2px)
```

### 6.4 Icon Container

```
┌──────┐
│  ◆   │  (lucide icon)
└──────┘

Size:          48px × 48px (h-12 w-12)
Border-radius: 12px
Border:        1px solid rgba(0,255,163,0.20)
Background:    rgba(0,255,163,0.05)
Icon color:    #00ffa3
Icon size:     24px

Hover:
  border → rgba(0,255,163,0.40)
  bg → rgba(0,255,163,0.10)
  shadow → 0 0 20px rgba(0,255,163,0.15)
  icon scale(1.1)
```

### 6.5 Stat Chip

```
┌───────────────────────────────────────┐
│  ◉ 3 СЦЕНАРИЯ  │  ◉ 24Ч СТАРТ  │ …  │
└───────────────────────────────────────┘

Layout:         inline-flex, shrink-0
Padding:        8px 12px (py-2 px-3)
Border-radius:  100px (pill)
Border:         1px solid rgba(255,255,255,0.10)
Background:     rgba(0,0,0,0.38)
Backdrop:       blur(md)

Icon:           28px circle, border accent/22, bg accent/10, color accent
Value:          14px, font-weight 900, white
Label:          10px, mono, uppercase, tracking 0.18em, white/40
```

### 6.6 Eyebrow Badge

```
┌─────────────────────────────────────────────────────────────────┐
│  ●  ПРОИЗВОДСТВО РЕКЛАМНЫХ КОНСТРУКЦИЙ · МОСКВА                │
└─────────────────────────────────────────────────────────────────┘

Layout:        inline-flex, items-center, gap 10px
Padding:       8px 16px (py-2 px-4)
Border-radius: 100px (pill)
Border:        1px solid rgba(255,255,255,0.10)
Background:    rgba(255,255,255,0.04)
Backdrop:      blur(md)

Dot:           6px, rounded-full, bg #00ffa3, animate-pulse
Text:          11px, font-weight 700, uppercase, tracking 0.20em, white/70
Font:          --font-mono
```

### 6.7 Card — Service Rate

```
┌──────────────────────────────────────────────────┐
│  [Icon] НЕРЖАВЕЮЩИЕ БУКВЫ БЕЗ ПОДСВЕТКИ         │
│                                                  │
│  ⏱ Срок: 7–14 дн.  ⚡ Сложность: 4/5  🎯 Пре…   │
│  ──────────────────────────────────────────────   │
│  БАЗОВАЯ СТАВКА              СЦЕНАРИЙ            │
│  110 ₽/СМ             [ ПРЕМИУМ / БУТИК ]        │
│                                                  │
│  ┌── МАТЕМАТИКА РАСЧЕТА ──────────────────────┐  │
│  │  Цена = (Высота × Ставка × K_геометрии)…  │  │
│  │  Премиум-металл AISI 304/316…              │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ВАРИАНТЫ ИЗГОТОВЛЕНИЯ И СТАВКИ                  │
│  Шлифованная / Зеркальная сталь ·· от 110–180 ₽  │
│  Покрытие нитридом титана ······· от 180 ₽/см    │
│  Супер-антикоррозийная AISI 316 · от 240 ₽/см    │
│  Металл с порошковым окрасом ···· от 130 ₽/см    │
│  Плоские металлические буквы ···· от 45 ₽/см     │
│                                                  │
│  ┌─────────────────────────────────────────┐     │
│  │  Считать Нержавеющие буквы  →          │     │
│  └─────────────────────────────────────────┘     │
└──────────────────────────────────────────────────┘

Border-radius: 20px
Border:        1px solid rgba(255,255,255,0.10)
Background:    linear-gradient(180deg, rgba(12,12,14,0.94), rgba(8,8,10,0.9))
Shadow:        --ds-shadow-card
Backdrop:      blur(md)
Padding:       24px

Hover:
  translateY(-2px)
  border → rgba(0,255,163,0.35)
  shadow → --ds-shadow-card-hover
  inner gradient overlay opacity 1
```

#### 6.7.1 Icon + Title Block

```
┌──────┐  НЕРЖАВЕЮЩИЕ
│  ◆   │  БУКВЫ БЕЗ
└──────┘  ПОДСВЕТКИ

Icon container:  48×48px, rounded-xl, border accent/24, bg accent/10
Icon:            20–22px, color --ds-accent (primary)
Title:           2.05rem mobile / 2.2rem desktop, font-weight 900 (black)
                 uppercase, tracking -0.024em, leading 0.96
                 white, break-words
Layout:          flex, items-start, gap-4
```

#### 6.7.2 Metrics Row (inline)

```
⏱ Срок: 7–14 дн.   ⚡ Сложность: 4/5   🎯 Подходит: Пре…

Font:            11px
Icon:            14px (h-3.5), color accent/85
Label text:      neutral-400
Value:           white, <strong>
Layout:          flex items-center justify-between
Bottom:          border-b border-white/[0.06], padding-bottom 14px
Gap between:     gap-1.5 per item
```

#### 6.7.3 Base Price Block

```
┌──────────────────────────────────────────┐
│  БАЗОВАЯ СТАВКА           СЦЕНАРИЙ       │
│  110 ₽/СМ          [ ПРЕМИУМ / БУТИК ]   │
└──────────────────────────────────────────┘

Container:   rounded-xl, border white/[0.06], bg white/[0.01], px-4 py-3
Layout:      flex items-center justify-between

Left side:
  Label:     8px, mono, uppercase, tracking widest, neutral-500
  Value:     2.2rem, font-weight 900 (black), white, tracking -0.03em, tabular-nums
  Unit:      9px, mono, uppercase, tracking wider, color #00ffa3

Right side:
  Label:     8px, mono, uppercase, tracking widest, neutral-500
  Badge:     inline-flex, rounded-md
             border accent/20, bg accent/5
             px-2 py-0.5
             12px (xs), font-weight 600, uppercase, tracking wider, color #00ffa3
```

#### 6.7.4 Formula Block

```
┌──────────────────────────────────────────┐
│  МАТЕМАТИКА РАСЧЕТА                      │
│  ┌────────────────────────────────────┐  │
│  │ Цена = (Высота × Ставка × K)…    │  │
│  └────────────────────────────────────┘  │
│  Премиум-металл AISI 304/316…           │
└──────────────────────────────────────────┘

Container:     rounded-xl, border accent/10, bg accent/[0.01], p-3
Label:         9px, mono, uppercase, tracking widest, color accent/80
Code block:    mono, 10.5px, white/90, bg black/40
               px-2.5 py-2, rounded-lg, border white/[0.04]
               break-words, whitespace pre-wrap, select-all
Subtitle:      9px, neutral-500, italic, leading snug
```

#### 6.7.5 Subservices List (Dotted Separator)

```
Шлифованная / Зеркальная сталь ········· от 110–180 ₽/см

Container:  rounded-xl, border white/[0.04], bg white/[0.01], p-3.5
Label:      9px, mono, uppercase, tracking widest, neutral-400
Row:        flex items-center justify-between, 12px (xs)
  Name:     neutral-300
  Dotted:   h-px flex-1 border-b border-dotted border-white/[0.12] mx-2
  Price:    font-semibold, white, shrink-0, whitespace-nowrap
Gap:        space-y-2 between rows
```

#### 6.7.6 Footer CTA (In-Card)

```
┌─────────────────────────────────────────┐
│  Считать Нержавеющие буквы  →          │
└─────────────────────────────────────────┘

Height:        50px (h-[50px])
Width:         100%
Border-radius: 100px (pill / rounded-full)
Background:    #00ffa3
Text:          black, 14px, font-weight 600, tracking -0.01em
Icon:          ArrowRight, 16px, black

Hover:
  bg → #00ffa3/90
  shadow → 0 0 20px rgba(0,255,163,0.4)
  icon → translateX(4px)
```

### 6.8 FAQ Accordion Item

```
┌──────────────────────────────────────────────────┐
│  SYS // FAQ_01                                   │
│  Нужно ли согласование для объемных букв?    [▼] │
│  ─────────────────────────────────────────────    │
│  (expanded answer text)                          │
└──────────────────────────────────────────────────┘

Border-radius: 16px (rounded-2xl)
Border:        1px solid rgba(255,255,255,0.05)
Background:    rgba(255,255,255,0.01)
Padding:       24px 32px (p-6 md:p-8)

Tag:           10px mono, uppercase, tracking widest, --ds-accent, bold
Question:      18–20px, bold, white/95
Chevron:       40px box, rounded-xl, border white/10, bg white/5

Hover:
  border → rgba(0,255,163,0.30)
  bg → rgba(255,255,255,0.02)
  question text → --ds-accent color
  chevron border → accent/30, shadow glow

Expand animation:
  height: 0 → auto, duration 300ms, ease [0.16, 1, 0.3, 1]
```

### 6.9 Input Field

```
┌──────────────────────────────────────────────────┐
│  Имя                                             │
└──────────────────────────────────────────────────┘

Height:        44px (h-11)
Padding:       0 16px (px-4)
Border-radius: 12px
Border:        1px solid rgba(255,255,255,0.10)
Background:    rgba(255,255,255,0.05)
Text:          14px, white
Placeholder:   white/35

Focus:
  border → rgba(0,255,163,0.40)
  outline: none
```

### 6.10 Progress / Stepper Bar

```
───── ───── ───── ─────
 ■■■   ■■■   ○○○   ○○○

Segment height: 6px (h-1.5)
Segment width:  32px (w-8)
Gap:            6px (gap-1.5)
Active:         bg --ds-accent
Inactive:       bg --ds-border-default (outline)
Border-radius:  full
```

---

## 7. Фоновые эффекты

### 7.1 Industrial Grid

```css
.ds-grid-overlay {
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 80px 80px; /* Hero */
}

.ds-grid-fine {
  background-image:
    linear-gradient(rgba(0,245,160,0.028) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,245,160,0.028) 1px, transparent 1px);
  background-size: 18px 18px; /* Sections like DesignProjectCTA */
}
```

### 7.2 Ambient Glow Orbs

```css
/* Primary accent glow */
.ds-orb-green {
  position: absolute;
  width: 700px;
  height: 700px;
  border-radius: 50%;
  opacity: 0.20;
  filter: blur(130px);
  background: radial-gradient(circle, #00ffa3 0%, transparent 70%);
}

/* Purple secondary */
.ds-orb-purple {
  width: 500px;
  height: 500px;
  opacity: 0.15;
  filter: blur(120px);
  background: radial-gradient(circle, #7928ca 0%, transparent 70%);
}
```

### 7.3 Top Accent Line (Card)

```css
/* 1px горизонтальная линия свечения сверху карточки */
.ds-top-accent {
  position: absolute;
  inset-inline: 0;
  top: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0,245,160,0.65), transparent);
}
```

### 7.4 Radial Gradient Background

```css
/* ServiceRates секция */
.ds-bg-radial-accent {
  background:
    radial-gradient(120% 100% at 50% 0%, rgba(0,255,163,0.08), rgba(0,0,0,0) 45%),
    #090909;
}
```

---

## 8. Анимации и Transitions

### 8.1 Easing функции

```css
--ds-ease-standard:     cubic-bezier(0.4, 0, 0.2, 1);      /* Material standard */
--ds-ease-spring:       cubic-bezier(0.22, 1, 0.36, 1);     /* Snappy spring */
--ds-ease-premium:      cubic-bezier(0.16, 1, 0.3, 1);      /* Premium bounce */
```

### 8.2 Длительности

```css
--ds-duration-fast:     150ms;    /* Color, opacity transitions */
--ds-duration-base:     200ms;    /* Standard interaction */
--ds-duration-medium:   300ms;    /* Expand/collapse, hover effects */
--ds-duration-slow:     500ms;    /* Entrance animations */
--ds-duration-reveal:   600ms;    /* Scroll reveal */
```

### 8.3 Паттерны анимаций

| Паттерн | Свойства | Timing |
|---|---|---|
| **Hover lift** | `translateY(-1px)` to `translateY(-2px)` | 300ms, ease-premium |
| **Active press** | `scale(0.97)` – `scale(0.98)` | 100ms |
| **Card hover glow** | opacity 0→1 для inner radial gradient | 500ms |
| **Scroll reveal** | opacity 0→1, y: 18–30px → 0 | 450–600ms, stagger 80–100ms |
| **Accordion expand** | height 0 → auto | 300ms, ease-premium |
| **Pulse dot** | CSS animate-pulse (built-in) | infinite |
| **Float particle** | translateY/X oscillation | 12–22s, ease-in-out, infinite |

### 8.4 Hover Interaction Model

```
Default → Hover → Active → Default

Default:
  transform: none
  border-color: default
  shadow: default

Hover:
  transform: translateY(-1px) — small elements
  transform: translateY(-2px) — buttons, cards
  border-color: accent tint
  shadow: enhanced glow
  text-color: brighter or accent

Active:
  transform: translateY(0) scale(0.97)
  shadow: reduced
  transition: 100ms
```

---

## 9. Иконография

### 9.1 Библиотека: Lucide Icons

Все иконки берутся из `lucide-react`. Размерности:

| Контекст | Размер |
|---|---|
| Навигация / CTA стрелка | 16px (h-4 w-4) |
| Inline icon (metric row) | 14px (h-3.5 w-3.5) |
| Card icon (container) | 20–24px (h-5–h-6) |
| Hero feature icon | 24px (h-6 w-6) |

### 9.2 Цветовая политика иконок

- **В icon-container**: `color: var(--ds-accent)` (#00ffa3)
- **Inline metric**: `color: rgba(0,255,163,0.85)` (slightly muted)
- **Check mark**: accent circle + Check icon
- **Chevron/Arrow**: white, opacity 60%, hover → 100%

---

## 10. Сетка и Layout

### 10.1 Grid System

```css
/* Hero: 2 колонки */
.ds-grid-hero {
  grid-template-columns: 1.1fr 0.9fr;
  gap: 80px;
  align-items: start;
}

/* Sections: 12-column */
.ds-grid-section-split {
  grid-template-columns: repeat(12, 1fr);
  /* Left 7, Right 5 */
}

/* Cards: 2–3 column */
.ds-grid-cards-2 { grid-template-columns: repeat(2, 1fr); gap: 24px; }
.ds-grid-cards-3 { grid-template-columns: repeat(3, 1fr); gap: 24px; }

/* Steps: 5 column */
.ds-grid-steps {
  grid-template-columns: repeat(5, 1fr);
  gap: 32px;
}
```

### 10.2 Breakpoints (Tailwind-based)

```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

### 10.3 Responsive Patterns

| Layout | Mobile | Tablet (md) | Desktop (lg+) |
|---|---|---|---|
| Hero | 1 col, stacked | 1 col, stacked | 2 col: 1.1fr / 0.9fr |
| Cards (ServiceRates) | 1 col | 2 col | 3 col |
| FAQ | 1 col full | 1 col full | 1 col, max-w-4xl |
| Process Steps | 1 col | 3 col | 5 col |
| Stats row | inline flex | inline flex | inline flex |

---

## 11. Копирайтинг и тон голоса

### 11.1 Текстовые паттерны

| Элемент | Формат | Пример |
|---|---|---|
| **Kicker / Eyebrow** | `UPPERCASE`, английский или технический | `// DESIGN PROJECT`, `FAQS & COMPLIANCE` |
| **System prefix** | `MONO UPPERCASE` | `SYS // FAQ_01`, `OPS // EST_01`, `PACK` |
| **Headline** | Русский, bold, с точкой | `Закажите дизайн-проект вывески.` |
| **Highlight word** | Gradient text (#00ffa3→#00c8ff) | `которые` (в Hero) |
| **Subtitle** | Русский, спокойный, функциональный | `Инженерные регламенты, юридические согласования...` |
| **Stat value** | Крупный шрифт, font-black | `500+`, `85`, `2500 м²` |
| **Stat label** | 9–10px, UPPERCASE, mono, muted | `ПРОЕКТОВ`, `₽/СМ`, `ЦЕХА` |

### 11.2 Правила

1. Кикеры — преимущественно на английском или техническом жаргоне (compliance, engineering memorandum)
2. Headlines — русский, прямой, конкретный, без маркетингового пафоса
3. Знак точки в конце заголовков — допустим для утвердительного тона
4. Числа — с разделителем пробелом (500 000 ₽), единицы в моно-стиле

---

## 12. Секционная композиция

### 12.1 Стандартная структура секции

```
┌──────────────────────────────────────────────────────────────────┐
│  [Background: #090909 + grid overlay + ambient glow]             │
│                                                                  │
│  ┌────────────────────── section-container ────────────────────┐ │
│  │                                                            │ │
│  │  [Kicker / Eyebrow]           — ds-kicker                  │ │
│  │  [Section Heading]            — ds-display-lg               │ │
│  │  [Description]                — ds-body-md                  │ │
│  │                                                            │ │
│  │  ┌─── Card Grid ─────────────────────────────────────────┐ │ │
│  │  │  [Card 1]  [Card 2]  [Card 3]                        │ │ │
│  │  └───────────────────────────────────────────────────────┘ │ │
│  │                                                            │ │
│  │  [CTA Row: Primary + Secondary]                            │ │
│  │                                                            │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  [border-t border-white/[0.08]]                                 │
└──────────────────────────────────────────────────────────────────┘
```

### 12.2 Разделители между секциями

- `border-y border-white/[0.08]` — стандартный
- `border-t border-white/5` — деликатный (FAQ)
- Фоновый градиент как визуальный переход

---

## 13. Motion Library (Framer Motion Presets)

### 13.1 Scroll Reveal

```tsx
// Стандартный вход при скролле
const revealVariants = {
  initial: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
  }
};

// Для stagger-анимации
const staggerReveal = {
  initial: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.08 * i }
  })
};
```

### 13.2 Accordion

```tsx
const accordionVariants = {
  collapsed: { height: 0 },
  expanded: {
    height: "auto",
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
  }
};
```

### 13.3 Card Hover Glow

```tsx
// Inner radial gradient overlay
const glowOverlay = {
  default: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: { duration: 0.5 }
  }
};
// bg: radial-gradient(120% 80% at 50% 0%, rgba(0,255,163,0.12), transparent 55%)
```

---

## 14. GSAP Patterns

### 14.1 Timeline Entrance

```tsx
useGSAP(() => {
  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    scrollTrigger: {
      trigger: sectionRef.current,
      start: 'top 82%',
      once: true,
    },
  });

  tl.from('.headline', { opacity: 0, y: 18, duration: 0.45 })
    .from('.chip', { opacity: 0, y: 12, stagger: 0.04, duration: 0.25 }, '-=0.2')
    .from('.panel', { opacity: 0, x: 16, duration: 0.45 }, '-=0.15');
}, { scope: sectionRef });
```

### 14.2 Ambient Float

```tsx
gsap.to('.ambient-element', {
  xPercent: 4,
  yPercent: -2,
  duration: 5.2,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut',
});
```

---

## 15. Accessibility (A11y)

### 15.1 Правила

1. Все декоративные элементы → `aria-hidden`
2. Все интерактивные элементы → `focus-visible` с `box-shadow: var(--focus-ring)`
3. FAQ accordion → `<button>` для заголовка, `aria-expanded`
4. Статусные индикаторы → `aria-label` с текстовым описанием
5. `prefers-reduced-motion` → все анимации длительностью 1ms
6. Контраст: белый на чёрном ≥ 18:1 (AAA), accent на чёрном ≥ 7.5:1 (AAA)

---

## 16. File Map — Где живут токены

| Файл | Содержимое |
|---|---|
| [tokens.css](file:///Users/user/projects/Expoint_ADV%20Tabs/src/styles/tokens.css) | CSS Custom Properties (все токены) |
| [globals.css](file:///Users/user/projects/Expoint_ADV%20Tabs/src/app/globals.css) | Tailwind theme, utility classes, button system, animations |
| [brand-spec.md](file:///Users/user/projects/Expoint_ADV%20Tabs/brand-spec.md) | ~~Устаревший~~ → заменён этим документом |
| [Button.tsx](file:///Users/user/projects/Expoint_ADV%20Tabs/src/components/ui/Button.tsx) | Базовый компонент кнопки |
| [Card.tsx](file:///Users/user/projects/Expoint_ADV%20Tabs/src/components/ui/Card.tsx) | Базовый компонент карточки |

---

## 17. Чеклист для новых компонентов

Перед созданием любого нового UI-компонента или секции, проверить:

- [ ] Фон секции: `#050508`–`#090909` (dark)
- [ ] Рамка карточки: `border-white/[0.08]`–`border-white/[0.10]`
- [ ] Акцентный цвет: ТОЛЬКО `#00ffa3`
- [ ] Кнопки: pill-shaped (rounded-full / radius-pill)
- [ ] Кикер: mono, uppercase, 10–12px, tracking wide
- [ ] Headline: font-black, tracking tight
- [ ] Body: white/55, leading 1.7
- [ ] Hover: translateY + border-accent transition
- [ ] Icon: в контейнере 48px с border accent/20 и bg accent/05
- [ ] Glow: shadow с accent при hover
- [ ] Grid overlay: если секция > 600px высоты
- [ ] Scroll reveal: Framer Motion или GSAP
- [ ] Accessibility: aria-hidden для декора, focus-visible

---

## 18. Changelog

| Версия | Дата | Изменения |
|---|---|---|
| v1.1 | 2026-05-20 | Добавлена гранулярная спецификация внутренних блоков ServiceRate карточки (Icon+Title, Metrics Row, Base Price Block, Formula Block, Subservices List, Footer CTA) на основе доп. скриншота |
| v1.0 | 2026-05-20 | Initial release — полная спецификация из текущего кода |

---

> **Этот документ является source-of-truth для дизайн-решений Expoint ADV.**
> Все будущие правки, обновления и генерации UI ОБЯЗАНЫ следовать этим токенам и паттернам.
