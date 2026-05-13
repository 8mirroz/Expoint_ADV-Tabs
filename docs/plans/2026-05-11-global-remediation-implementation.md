# Implementation Plan - Expoint ADV Global Remediation

Цель: безопасно стабилизировать `Expoint_ADV Tabs`, восстановить technical baseline и подготовить repo к следующей фазе развития без хаотичного рефакторинга.

План исходит из уже подтвержденных фактов:
- `npm run build` падает;
- `npx tsc --noEmit` показывает системный contract drift;
- `npm run lint` невалиден как quality gate;
- в repo одновременно живут несколько несовместимых реализаций calculator/configurator/motion/assistant flow;
- roadmap `genesis/v2` частично реализован, но не доведен до production truth.

## User Review Required

- Выбор primary business flow:
  - `landing -> embedded calculator section -> lead submit`
  - `landing -> /calculator -> lead submit`
- Выбор primary lead route:
  - оставить только `/api/lead`
  - оставить только `/api/quote`
  - сохранить оба route, но с четким разделением responsibility
- Выбор target AI mode на ближайшую фазу:
  - temporary honest beta / disabled
  - real backend integration в рамках этой remediation wave

План ниже по умолчанию принимает консервативные решения:
- primary conversion flow: `landing -> embedded calculator section -> lead submit`
- primary lead route: `/api/lead`
- AI mode: temporary honest beta until domain contract and backend are stabilized

## Proposed Changes

### Batch 0 - Stabilization Envelope

#### Define Active Surfaces `docs/plans/2026-05-11-global-remediation-implementation.md`
- [x] Зафиксировать active architecture surfaces в начале рабочего цикла:
  - marketing shell в `src/app/(marketing)/page.tsx`
  - calculator section в landing
  - `/calculator` page as secondary dedicated flow
  - single active store in `src/store/useCalculatorStore.ts`
  - single active lead route
- [x] Зафиксировать legacy candidates:
  - `src/components/conversion/Calculator.tsx`
  - `src/components/conversion/LivePreview.tsx`
  - `src/components/three/SignConfigurator.tsx`
  - все consumers старых полей `type/size/glowColor/hasInstallation/totalPrice`
- [x] Установить temporary rule: no new feature work before green baseline
- [x] Verification: вручную сверить import graph и rg-поиск по legacy fields

Execution notes:
- Active marketing shell: `src/app/(marketing)/page.tsx` with embedded `CalculatorSection`
- Active calculator surface: `src/components/calculator/CalculatorContainer.tsx`
- Secondary calculator entry: `src/app/calculator/page.tsx`
- Active store: `src/store/useCalculatorStore.ts`
- Active lead route default: `src/app/api/lead/route.ts`
- Legacy candidates confirmed by code search:
  - `src/components/conversion/Calculator.tsx`
  - `src/components/conversion/LivePreview.tsx`
  - `src/components/three/SignConfigurator.tsx`
  - `src/components/ai/AssistantWidget.tsx`
  - `src/hooks/useAssistantContext.ts`
  - notification consumers under `src/lib/services/notifications/*`

#### Inventory Commands `package.json`
- [x] Подтвердить baseline commands:
  - `npm run build`
  - `npx tsc --noEmit`
  - новый рабочий lint command
- [x] Зафиксировать эти команды как source of truth для дальнейших batch phases
- [x] Verification: каждый command должен запускаться и завершаться осмысленным exit code

Execution notes:
- Current baseline commands:
  - `npm run build` -> valid command, currently fails on application errors
  - `npx tsc --noEmit` -> valid command, currently fails on application errors
  - `npm run lint` -> invalid for current stack because `next lint` is a broken legacy command under `Next.js 16`
- Batch 1 target: keep `build` and `tsc` as technical truth, replace `lint` implementation without changing the baseline command name

### Batch 1 - Toolchain and Build Recovery

#### Repair Font / Layout Build Blockers `src/app/layout.tsx`
- [x] Убрать unsupported `cyrillic` subsets или заменить font setup на совместимый с `Next.js 16`
- [x] Проверить, что `metadata`, `viewport`, font variables и body classnames продолжают работать после правки
- [x] Verification: `npm run build`

Execution notes:
- `src/app/layout.tsx` updated to use supported `next/font/google` subsets only
- Build verification no longer fails on font configuration
- Next build now advances to the next real blocker in `src/components/ai/AssistantWidget.tsx`:
  - `Property 'totalPrice' does not exist on type 'CalculatorState'`

#### Replace Broken Lint Gate `package.json`
- [x] Удалить legacy `next lint` command
- [x] Добавить поддерживаемый lint command для текущего Next/TS stack
- [x] Если нужен config file, создать минимальный repo-aligned lint config без лишних ruleset jumps
- [x] Verification: `npm run lint`

Execution notes:
- Added `eslint@9` and `eslint-config-next@16.2.6`
- Added flat config in `eslint.config.mjs`
- Replaced broken `next lint` with `eslint src`
- Lint command is now executable and scoped to source files instead of generated artifacts
- Current lint result is meaningful and shows source issues only:
  - 4 errors
  - 14 warnings
- Remaining lint errors are concentrated in:
  - legacy calculator flow
  - stale assistant hook
  - explicit `any` in active calculator container

#### Establish Typecheck Baseline `src/components`, `src/hooks`, `src/store`
- [x] Прогнать `npx tsc --noEmit` и превратить текущий error list в tracked checklist
- [x] Сначала закрыть config/import/API misuse errors, не трогая пока бизнес-рефакторинг
- [x] Отдельно зафиксировать errors, которые вызваны domain contract drift и будут закрываться в Batch 2
- [x] Verification: остаток ошибок должен быть только ожидаемым и привязанным к canonical-domain migration

Execution notes:
- Non-domain type blockers removed:
  - unsupported font subsets in `src/app/layout.tsx`
  - missing imports in `src/components/sections/Benefits.tsx`
  - invalid `PresentationControls` props in `src/components/three/SignScene.tsx`
- Current `npx tsc --noEmit` remainder is now isolated to stale calculator contract usage:
  - `src/components/ai/AssistantWidget.tsx`
  - `src/components/conversion/Calculator.tsx`
  - `src/components/three/SignConfigurator.tsx`
  - `src/hooks/useAssistantContext.ts`
- This confirms the boundary for Batch 2 / Batch 3:
  - canonical domain contract
  - legacy flow retirement

#### Repair Obvious Broken Imports / Invalid Props `src/components/sections/Benefits.tsx`, `src/components/three/SignScene.tsx`
- [x] Починить missing symbol imports и invalid component props, которые ломают typecheck независимо от domain decisions
- [x] Не менять UX behavior шире, чем нужно для восстановления baseline
- [x] Verification: `npx tsc --noEmit`

Execution notes:
- `src/components/sections/Benefits.tsx` now imports `motion` and required `lucide-react` icons
- `src/components/three/SignScene.tsx` no longer uses unsupported `PresentationControls` props
- Additional low-risk source fixes applied while stabilizing lint:
  - `src/components/ui/Input.tsx`
  - `src/lib/notebooklm.ts`
  - `src/modules/analytics/events.ts`
  - `src/components/conversion/LeadForm.tsx`
  - `src/components/sections/Footer.tsx`

### Batch 2 - Canonical Calculator Domain Contract

#### Define Canonical Domain Shape `src/store/useCalculatorStore.ts`, `src/lib/validators/quote.ts`
- [x] Выбрать единую модель calculator/configurator domain:
  - `productType`
  - `text`
  - `heightCm`
  - `count`
  - `complexity`
  - `mounting`
  - `urgency`
  - `materialId`
  - `lightingId`
  - `faceColor`
  - `sideColor`
  - `priceRange`
- [x] Выделить separate canonical types and validation schema, чтобы UI, routes и assistant зависели от одной модели
- [x] Явно определить derived adapters:
  - state -> pricing preview
  - state -> 3D props
  - state -> lead payload
  - state -> assistant context
- [x] Verification: `npx tsc --noEmit` без новых `any` casts

Execution notes:
- `src/lib/validators/quote.ts` rewritten around the current store vocabulary:
  - `productType`
  - `text`
  - `heightCm`
  - `count`
  - `complexity`
  - `mounting`
  - `urgency`
  - `materialId`
  - `lightingId`
  - `faceColor`
  - `sideColor`
  - `priceRange`
- Added shared schemas for:
  - `PriceRangeSchema`
  - `CalculatorSchema`
  - `LeadContactSchema`
  - `LeadPayloadSchema`
  - `QuoteRequestSchema`
- Added pure adapter boundary in `src/lib/calculator-adapters.ts`:
  - `toCalculatorData`
  - `formatPriceRange`
  - `toAssistantContext`
  - `toLeadPayload`
- `npx tsc --noEmit` is now green without adding new `any` casts
- `npm run build` also passes after moving stale consumers to the canonical contract

#### Normalize Store API `src/store/useCalculatorStore.ts`
- [x] Привести store actions к canonical vocabulary
- [x] Удалить ambiguity между legacy and current names
- [x] Если нужно, временно добавить compatibility adapter functions с пометкой deprecated вместо silent breaking rewrite
- [x] Verification: все active consumers компилируются против одной store API

Execution notes:
- Store API itself was already the cleanest current source of truth, so the remediation work focused on consumers rather than renaming the store again
- Active consumers now compile against the existing store actions:
  - `setProductType`
  - `setText`
  - `setHeight`
  - `setCount`
  - `setComplexity`
  - `setMounting`
  - `setUrgency`
  - `setMaterial`
  - `setLighting`
  - `setColors`
- Removed one remaining `any` cast in `src/components/calculator/CalculatorContainer.tsx`
- Legacy components were converted into thin wrappers instead of keeping a second live store vocabulary:
  - `src/components/conversion/Calculator.tsx`
  - `src/components/three/SignConfigurator.tsx`

#### Normalize Validation Layer `src/lib/validators/quote.ts`
- [x] Переписать `CalculatorSchema` под canonical model
- [x] Отделить:
  - calculator config validation
  - lead contact validation
  - route payload validation
- [x] Исключить устаревшие поля, не имеющие source-of-truth в current store
- [x] Verification: schema tests / type inference совпадают с active store shape

Execution notes:
- Removed stale fields from validation:
  - `type`
  - `size`
  - `glowColor`
  - `hasInstallation`
  - `totalPrice`
- Split validation layers into:
  - canonical calculator config
  - lead contact
  - lead payload
  - quote request payload
- `src/hooks/useAssistantContext.ts` now derives context from pure adapters instead of rebuilding a second contract in `useEffect`
- `src/components/ai/AssistantWidget.tsx` now reads the canonical `priceRange` and assistant context instead of stale `totalPrice`

#### Introduce Adapter Boundaries `src/lib`
- [x] Создать small focused adapters вместо размазывания mapping logic по UI:
  - `calculator-state-to-preview`
  - `calculator-state-to-assistant-context`
  - `calculator-state-to-lead-payload`
- [x] Каждый adapter должен быть pure function
- [ ] Verification: unit tests / snapshot tests for each adapter

Execution notes:
- Added pure adapter module in `src/lib/calculator-adapters.ts`
- Current verification is compile/runtime level:
  - `npx tsc --noEmit`
  - `npm run build`
- Dedicated adapter unit tests are still pending and should be added when the repo gets a test harness in a later batch

### Batch 3 - Active Flow Consolidation

#### Choose and Preserve the Primary Calculator Flow `src/components/calculator/CalculatorContainer.tsx`, `src/components/sections/CalculatorSection.tsx`
- [x] Подтвердить `CalculatorContainer` как primary implementation, если он ближе к current store model
- [x] Проверить, что landing section and `/calculator` page re-use one active calculator shell instead of diverging implementations
- [x] Убрать дублирующую бизнес-логику из secondary entrypoints
- [x] Verification: `rg` не показывает active imports legacy calculator flow

Execution notes:
- Confirmed `src/components/calculator/CalculatorContainer.tsx` as the only active calculator shell
- Confirmed both entrypoints re-use the same implementation:
  - `src/components/sections/CalculatorSection.tsx`
  - `src/app/calculator/page.tsx`
- No competing calculator logic remains active in `src`

#### Retire Legacy Calculator Flow `src/components/conversion/Calculator.tsx`, `src/components/conversion/LivePreview.tsx`
- [x] Либо удалить legacy runtime imports, либо перевести files в quarantine without active imports
- [x] Если удаление опасно, оставить explicit TODO header and non-imported status
- [x] Убедиться, что legacy flow больше не участвует в build/runtime
- [x] Verification: `rg` по `conversion/Calculator` and old field names

Execution notes:
- Removed non-imported legacy files from `src`:
  - `src/components/conversion/Calculator.tsx`
  - `src/components/conversion/LivePreview.tsx`
- `rg` over `src` no longer shows active legacy calculator imports

#### Consolidate 3D Runtime `src/components/three/SignScene.tsx`, `src/components/three/SignConfigurator.tsx`
- [x] Выбрать one active 3D component
- [x] Привести active 3D component к canonical adapter contract
- [x] Secondary 3D implementation вывести из runtime
- [x] Сохранить fallback-loading state и non-blocking behavior if WebGL unavailable
- [ ] Verification: manual smoke on landing and `/calculator`

Execution notes:
- Confirmed `src/components/three/SignScene.tsx` as the only active 3D runtime
- Removed legacy wrapper `src/components/three/SignConfigurator.tsx`
- Dynamic loading fallback remains in `CalculatorContainer` through direct import of `SignScene`
- Visual/manual browser smoke is still pending because this batch used non-interactive verification only

### Batch 4 - Lead and Quote API Integrity

#### Select Primary Lead Route `src/app/api/lead/route.ts`, `src/app/api/quote/route.ts`
- [ ] Сделать `/api/lead` primary structured endpoint по умолчанию
- [ ] `/api/quote` либо:
  - удалить из active flow,
  - либо превратить в thin adapter around primary route contract
- [ ] Исключить две конкурирующие payload semantics
- [ ] Verification: active UI submits only one canonical payload

#### Add Server-Side Payload Validation `src/app/api/lead/route.ts`, `src/lib/validators/quote.ts`
- [ ] Валидировать body route handler через shared schema
- [ ] Явно обрабатывать:
  - missing required fields
  - malformed calculator data
  - partial integration failure downstream
- [ ] Возвращать consistent response envelope for success/error
- [ ] Verification: route integration tests and manual invalid payload checks

#### Normalize Notification Fan-out `src/lib/services/notifications/*`
- [ ] Привести `telegram/email/crm` consumers к canonical payload
- [ ] Удалить legacy assumptions про `type/size/glowColor/hasInstallation/totalPrice`
- [ ] Сохранить `Promise.allSettled` style partial-failure safety
- [ ] Verification: mocked notification tests for full success / partial fail / all fail

### Batch 5 - UX Truth Alignment

#### Repair Navigation and CTA Integrity `src/components/sections/Header.tsx`, `src/components/sections/Hero.tsx`, `src/components/sections/Footer.tsx`
- [ ] Синхронизировать nav anchors with real section ids
- [ ] Сделать оба hero CTA meaningful:
  - primary -> active calculator section
  - secondary -> real cases/portfolio section or route
- [ ] Убрать пустые `href="#"` с critical user-facing links или заменить их на explicit non-public placeholders outside runtime
- [ ] Verification: manual click-through desktop/mobile without dead ends

#### Normalize Product Copy and Trust Signals `src/components/sections/*`, `src/app/calculator/page.tsx`
- [ ] Свести mixed RU/EN system copy к intentional product voice
- [ ] Проверить public placeholders:
  - contacts
  - legal links
  - analytics IDs shown/assumed by UI
- [ ] Подтянуть copy к реальному состоянию продукта: no fake “real AI / real audit / real integration” claims
- [ ] Verification: content pass across landing, calculator, footer, assistant

#### Add Explicit UI States `src/components/calculator/*`, `src/components/ai/*`
- [ ] Проверить and fill missing states:
  - loading
  - validation error
  - submit error
  - success
  - disabled
  - empty/default
- [ ] Focus specifically on lead submit and assistant interaction surfaces
- [ ] Verification: manual UX walkthrough with forced error and success scenarios

### Batch 6 - Motion Governance Recovery

#### Choose One Scroll/Motion Owner `src/app/layout.tsx`, `src/components/motion/MotionProvider.tsx`, `src/components/motion/SmoothScroll.tsx`
- [ ] Убрать duplicate Lenis initialization
- [ ] Развести роли:
  - scroll runtime owner
  - animation policy owner
  - component-level animation usage
- [ ] Убедиться, что `prefers-reduced-motion` respected centrally
- [ ] Verification: desktop scroll, mobile scroll, reduced-motion smoke

#### Stabilize Animation Boundaries `src/components/sections/*`, `src/components/three/*`
- [ ] Проверить, что motion не блокирует CTA, forms, scrolling or readability
- [ ] Упростить heavy animation, если runtime conflict persists
- [ ] Verification: manual performance perception pass and no layout-shift regression

### Batch 7 - AI and Analytics Truth Recovery

#### Honest AI Mode First `src/components/ai/AssistantWidget.tsx`, `src/hooks/useAssistantContext.ts`
- [ ] До real backend integration перевести AI widget в truthful limited mode:
  - no fake real-time calculation claims
  - no references to absent fields
- [ ] Привязать context only to canonical state adapter
- [ ] Если backend scope влезает в wave, then add real route-backed flow after Batch 2-4
- [ ] Verification: manual AI query smoke, no fake price response from stale fields

#### Real Analytics Instrumentation `src/modules/analytics/events.ts`, active CTA/submit surfaces
- [ ] Заменить console stub on real event transport abstraction
- [ ] Instrument critical events:
  - hero CTA
  - calculator interactions
  - configurator opened
  - lead submitted
  - assistant opened/used
- [ ] Remove fake GA placeholder assumptions from release-ready path
- [ ] Verification: browser devtools / mocked analytics assertions

### Batch 8 - Release Truth and Documentation

#### Update Roadmap Truth `genesis/v2/05_TASKS.md`, related docs if needed
- [ ] Обновить status задач на factual truth:
  - done
  - partial with drift
  - not started
- [ ] Не оставлять “completed” там, где build/runtime truth это опровергает
- [ ] Verification: roadmap status aligns with code and verification results

#### Add Release Checklist `docs/plans/2026-05-11-global-remediation-implementation.md`
- [ ] Зафиксировать final readiness gates:
  - build green
  - typecheck green
  - lint green
  - one active calculator flow
  - one active 3D flow
  - validated lead route
  - no dead critical CTAs
  - one motion owner
  - AI/analytics truthful
- [ ] Verification: final release checklist walkthrough

## Verification Plan

### Automated Tests
- `npm run build`
- `npx tsc --noEmit`
- `npm run lint`
- unit tests for canonical adapters and validators
- route tests for `/api/lead`
- mocked notification tests
- optional Playwright E2E:
  - landing -> calculator
  - calculator -> submit success
  - invalid submit -> error state

### Manual Verification
- Landing page:
  - hero CTA works
  - nav anchors map to real sections
  - no dead footer trust links on release path
- Calculator:
  - state changes update active preview
  - price preview is coherent with canonical state
  - lead form validates and submits
- 3D:
  - active preview loads
  - fallback/loading state visible when needed
  - mobile interaction does not break layout
- Motion:
  - no duplicated scroll weirdness
  - reduced-motion path behaves predictably
- AI:
  - widget no longer references stale fields
  - mode is truthful to actual backend readiness

## Rollback Notes

- Batch 1 rollback:
  - revert toolchain/config only if it worsens baseline
- Batch 2 rollback:
  - keep compatibility adapters; avoid big-bang rename without bridge layer
- Batch 3 rollback:
  - quarantine legacy modules before deleting outright
- Batch 4 rollback:
  - preserve primary route, demote secondary route to adapter instead of hard delete if integrations are fragile
- Batch 6 rollback:
  - if motion consolidation destabilizes UX, fall back to simpler single-engine behavior before reintroducing premium motion

## Ready-to-Execute Order

1. Batch 0 - Stabilization Envelope
2. Batch 1 - Toolchain and Build Recovery
3. Batch 2 - Canonical Calculator Domain Contract
4. Batch 3 - Active Flow Consolidation
5. Batch 4 - Lead and Quote API Integrity
6. Batch 5 - UX Truth Alignment
7. Batch 6 - Motion Governance Recovery
8. Batch 7 - AI and Analytics Truth Recovery
9. Batch 8 - Release Truth and Documentation
