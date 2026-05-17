# Research & Architecture Specification — SCN React Patterns for Complex Pricing Calculators and Lead Capture

**Date**: 2026-05-16  
**System**: SCN — Service Commerce Nodes  
**Parent System**: LPG — Landing Page Generator  
**Status**: Architecture Baseline  
**Version**: v10.1

## 1. Executive Summary

SCN в LPG должен рассматриваться не как «виджет калькулятора», а как изолированный **Service Commerce Runtime** внутри service pages.

Базовый стек фиксируется так:
- Feature-Sliced Design для модульной доменной архитектуры;
- Compound Components для гибкой композиции calculator UI;
- Container/Presentational split для изоляции бизнес-логики;
- React Hook Form + Zod для формы и валидации;
- Zustand только для calculator/session state;
- TanStack Query для server/API state и mutation lifecycle;
- Next.js RSC boundary: service page server-first, SCN только client island.

Цель SCN: превратить интерактивность в измеряемый conversion-пайплайн с контролируемой ценовой логикой, качеством лидов и предсказуемым поведением при сбоях.

## 2. SCN Role in LPG

SCN отвечает за:
- расчет предварительной стоимости;
- объяснение ценообразования и пакетной структуры;
- progressive qualification;
- lead capture с контекстом расчета;
- отправку структурированного payload в API/CRM;
- события аналитики по воронке.

SCN **не** должен:
- переводить всю страницу услуги в client rendering;
- держать SEO/контентные секции в клиентском состоянии;
- встраивать формулы и API-мутации в визуальные компоненты.

## 3. Architectural Position and Boundaries

```txt
LPG Page Config
  -> SectionRegistry
  -> Service Page (Server Components)
  -> SCN Client Island
  -> Pricing Runtime + Lead Capture Runtime
  -> Analytics / API / CRM
```

Boundary rules:
- Весь статический контент, SEO и AEO-блоки остаются в RSC/SSR.
- `"use client"` применяется только в интерактивной зоне SCN.
- Общая архитектура страницы остается server-first.

## 4. Patterns and Composition

### 4.1 Feature-Sliced Design

Рекомендуемая структура:

```txt
src/
  entities/
    service/
    pricing/
    lead/

  features/
    service-calculator/
      model/
      ui/
      lib/
      tests/
    lead-capture/
      model/
      ui/
      api/

  widgets/
    scn-service-commerce-node/

  shared/
    ui/
    lib/
    analytics/
    api/
```

### 4.2 Compound Components

```tsx
<Calculator.Root config={serviceConfig}>
  <Calculator.Header />
  <Calculator.Stepper />
  <Calculator.Summary />
  <Calculator.LeadCapture />
</Calculator.Root>
```

### 4.3 Container vs Presentational

Container/hook layer:
- читает typed config;
- управляет state и валидацией;
- запускает pricing compute;
- вызывает mutation;
- эмитит analytics.

Presentational layer:
- рендерит поля/слайдеры/карточки;
- отображает summary/error/success states;
- не содержит бизнес-формул.

## 5. State Management Contracts

### 5.1 Form State: React Hook Form + Zod

Используется для:
- field/step state;
- step-level validation;
- payload-level validation перед submit.

Схемы должны быть reusable на клиенте и сервере:
- `calculatorInput.schema.ts`
- `leadContact.schema.ts`
- `leadPayload.schema.ts`

### 5.2 Calculation State: Zustand

Разрешено:
- текущие inputs калькулятора;
- selected package;
- derived pricing snapshot;
- текущий шаг/локальные comparison-сценарии.

Запрещено:
- server responses как source of truth;
- SEO контент;
- глобальные app-данные.

### 5.3 Server/API State: TanStack Query

Используется для:
- lead submit mutations;
- retry/failure lifecycle;
- optional coefficient fetch;
- submission status.

## 6. Runtime Data Flow

```txt
User Input
  -> RHF field state
  -> Zod validation
  -> normalized input
  -> Zustand calculator state
  -> pricing engine (pure functions)
  -> price snapshot/package recommendation
  -> lead capture
  -> payload build + schema validation
  -> TanStack mutation
  -> API/CRM + analytics events
```

## 7. Pricing Engine Governance

Pricing engine должен быть pure + deterministic.

Пример контрактов:

```ts
type PricingInput = {
  serviceType: 'neon' | 'lightbox' | 'facade-navigation';
  complexity: 'simple' | 'medium' | 'complex';
  materialTier: 'base' | 'business' | 'premium';
  installationRequired: boolean;
  urgency: 'standard' | 'fast' | 'express';
};

type PricingResult = {
  basePrice: number;
  packageOptions: Array<{ id: string; label: string; price: number }>;
  recommendedPackageId: string;
  minMaxRange: { min: number; max: number };
  confidence: 'low' | 'medium' | 'high';
};
```

Каждая pricing-модель должна иметь метаданные:
- owner;
- version;
- min/max диапазоны;
- margin guardrail;
- rollback version;
- regression fixture set.

## 8. Progressive B2B Flow (3–4 steps)

1. Need qualification: тип услуги/объекта/базовые параметры.  
2. Configuration: ключевые драйверы цены.  
3. Price explanation: диапазон, пакетное сравнение, recommendation.  
4. Lead capture: контакт + qualification + согласия.

## 9. Lead Payload Contract

Lead payload обязан включать не только контакт, но и контекст расчета:
- `serviceSlug`, `calculatorVersion`;
- `pricingSnapshot`, `userInputs`;
- `contact`, `qualification`, `attribution`, `consent`.

Без полного pricing context лид теряет ценность для sales и аналитики.

## 10. Validation Model

Уровни валидации:
1. Field-level (UI feedback).
2. Step-level (gated progression).
3. Payload-level (до mutation).
4. Server-level (повторная проверка API).
5. Business-level (маржинальность, min/max, package constraints).

## 11. Performance and RSC Safety Rules

Обязательные практики:
- debouncing для чувствительных inputs;
- memoization derived calculations;
- Zustand selectors вместо подписки на весь store;
- lazy-loading тяжелых calculator islands;
- route/service split для service-specific runtime.

Запрещено:
- full-page client hydration;
- формулы внутри JSX;
- прямой API/CRM вызов из visual components.

## 12. Analytics and Funnel Events

Минимальный набор событий:
- `calculator_viewed`
- `calculator_started`
- `calculator_step_completed`
- `calculator_input_changed`
- `price_recalculated`
- `package_selected`
- `lead_form_started`
- `lead_submit_attempted`
- `lead_submit_success`
- `lead_submit_failed`

Events должны содержать только технический контекст воронки и не содержать PII без явного policy-разрешения.

## 13. Quality Gates (Merge Criteria)

1. Type safety: strict TS, typed configs, без `any` в pricing-core.
2. Formula integrity: pricing regression и margin guardrails pass.
3. Validation integrity: RHF+Zod шаги и payload gating работают.
4. RSC boundary: SCN изолирован, страница server-first.
5. Analytics coverage: обязательные funnel events подключены.
6. Accessibility baseline: labels, keyboard flow, SR-compatible errors.

## 14. Testing Strategy

Unit tests:
- pricing formulas/modifiers;
- package recommendation;
- payload builder;
- normalization helpers.

Integration tests:
- полный calculator flow;
- step validation;
- submit success/fail;
- analytics dispatch.

E2E smoke сценарии:
- valid flow: расчет -> выбор пакета -> отправка;
- invalid phone/email -> корректная ошибка;
- API fail -> fallback CTA/manual contact path.

## 15. Fail-Safe and Degradation

При ошибке расчета:
- показать ручной fallback для связи с инженером.

При ошибке submit:
- показать retry + альтернативный контактный канал.

При отсутствии dynamic coefficients:
- использовать локальный versioned static config.

При no-JS:
- серверная страница должна оставаться полезной (описание, диапазоны, CTA, контакты, FAQ).

## 16. Evolution Plan

Phase 1 — Baseline hardening:
- вынести pricing logic из UI;
- зафиксировать Zod схемы;
- разделить RHF/Zustand/Query по контрактам;
- добавить regression fixtures.

Phase 2 — Config-driven runtime:
- стандартизировать `CalculatorConfig`;
- подключать калькуляторы через `SectionConfig`;
- унифицировать `ServiceCommerceNode`.

Phase 3 — Pricing intelligence:
- versioned coefficient registry;
- margin guardrails;
- controlled A/B package layouts.

Phase 4 — Lead intelligence:
- lead scoring/qualification enrichment;
- structured CRM handoff.

Phase 5 — Self-improving loop:
- анализ step drop-off;
- оптимизация офферов/пакетов/полей на основе telemetry.

## 17. Final Rule

SCN в LPG — это не UI-декорация, а управляемый conversion runtime:
- server-first by composition;
- client-only for interaction islands;
- deterministic pricing;
- strict validation;
- measurable funnel;
- safe failure behavior;
- test-protected evolution.
