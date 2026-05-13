# Expoint ADV — Комплексный аудит стадии проекта

Дата аудита: 2026-05-12
Аудитор: Codex

## 1) Executive Summary
- Проект находится на стадии **functional beta / pre-production**.
- Основные продуктовые разделы и ключевые фичи существуют, но **production-ready статус не достигнут**.
- Критический блокер: `npm run build` падает, `npm run lint` падает.
- Документация по стадии (genesis v4) отстает от фактической реализации: часть задач реализована, но в плане отмечена как не выполненная.

Итоговая оценка готовности:
- Функциональная готовность: **72%**
- Техническая готовность к релизу: **48%**
- Операционная/архитектурная зрелость: **55%**

## 2) Что проверено
- Планы и архитектурные документы: `genesis/v3`, `genesis/v4`, `docs/plans/*`
- Frontend: страницы/секции/компоненты и контентные каталоги
- Backend: API routes, валидация, notifications orchestration, middleware/security, DB schema
- Алгоритмы: pricing/calculator, compliance flow, analytics signal pipeline
- Качество: lint/build фактическим запуском
- Конфигурация: env coverage (`process.env` vs `.env.example`)

## 3) Метрики

### 3.1 Структура и покрытие
- TS/TSX объем кода: **9692** строк (`src`)
- Файлов в `src`: **109**
- API endpoints (`route.ts`): **7**
- Маркетинговых страниц (`src/app/(marketing)/*/page.tsx`): **4**
- Секций лендинга (`src/components/sections`): **17**
- Услуг в каталоге (`src/data/services.ts`): **8**

### 3.2 Готовность по планам
- `genesis/v4/05_TASKS.md`: **0/8 отмечено** (`[ ]` все 8)
- `genesis/v3/05_TASKS.md`: **11/11 отмечено** (`[x]`)

Интерпретация:
- Формально по v4 проект выглядит как «не начат», но код показывает частичную реализацию v4-потока (security middleware, consent логирование, compliance UI).
- Реальный статус: **частично выполненный v4 с несинхронизированной документацией**.

### 3.3 Качество кода и сборки
- `npm run lint`: **44 проблемы**
  - **14 errors** (блокирующие)
  - **30 warnings**
- `npm run build`: **FAIL**
  - Критическая ошибка импорта `Linkedin` из `lucide-react` в `Footer.tsx`

### 3.4 Env governance
Используются переменные, которых нет в `.env.example`:
- `ADMIN_API_KEY`
- `ENABLE_HSTS`
- `ENABLE_STRICT_HTTPS`
- `LOG_INGRESS_SECRET`
- `NEXT_PUBLIC_POSTHOG_HOST`
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `NODE_ENV`

Объявлена, но не используется:
- `NEXT_PUBLIC_GA_ID`

## 4) Архитектура и backend — оценка

### 4.1 Что хорошо
- Есть серверные валидации через Zod (`lead`, `quote`, analytics envelope).
- Есть middleware с CSP и базовыми security headers.
- Есть pipeline для analytics сигналов (`/api/v5/log` -> sanitize -> db persist).
- Есть БД схема под consent и behavioral signals (Drizzle + Postgres).
- Есть fan-out оркестратор уведомлений (Telegram/Email/CRM) через `Promise.allSettled`.

### 4.2 Проблемы и логические разрывы
1. Build-блокер во frontend
- `src/components/sections/Footer.tsx`: импортируется `Linkedin`, которого нет в установленной версии `lucide-react`.

2. Lint-блокеры с риском нестабильного рендера
- Использование impure вызовов в рендере (`Math.random`, `Date.now` в неподходящем месте).
- Много `any` в критичных участках (`admin`, `analytics`, `ui`, calculator).

3. Несоответствие маршрутов между планом и реализацией
- В документах часто фигурирует `/api/leads`, а в коде есть `/api/lead` и `api/leads/actions.ts` без `route.ts`.
- Риск: интеграции/клиенты будут бить в несогласованный endpoint.

4. Consent логика частично неполная
- В store переключение `analytics` не маппится в `purposes` при API sync (уходит `personal_data`, `marketing`; `analytics` категория теряется как отдельная цель).

5. Security design drift
- `genesis/v4/02_ARCHITECTURE.md` остается в `DRAFT` и содержит формулировки «Pending confirmation», что не соответствует текущей стадии активной реализации.

6. Репозиторная управляемость
- Текущая рабочая папка не видится как git-репозиторий (`fatal: not a git repository`).
- Риск: нет прозрачности истории изменений, ревью и откатов.

## 5) Заполненность разделов (контент/продукт)

Оценка:
- Маркетинговое ядро (hero/services/pricing/cases/faq): **высокая заполненность (80-90%)**.
- Комплаенс-центр (wizard + cookie banner + consent API): **средняя заполненность (65-75%)**.
- AI/Knowledge runtime-интеграция: **низкая заполненность (30-40%)**.
  - `src/lib/notebooklm.ts` — явный stub/mock, не production интеграция.

## 6) Стадия проекта

Текущая стадия: **Pre-production stabilization**

Обоснование:
- Есть рабочая функциональная база и архитектурные слои.
- Но отсутствует release-готовность из-за build/lint блокеров, env drift, несинхронности docs↔code, и частичных заглушек.

## 7) Сколько осталось сделать (оценка)

До «production-ready» при текущем состоянии:
- Примерно **2-4 недели** для 1 strong full-stack engineer
- Или **1-2 недели** для 2 инженеров параллельно (frontend+backend)

Остаток работ (по impact):
1. Критические блокеры качества (build/lint errors) — 20%
2. Синхронизация API contracts и документации — 15%
3. Доработка consent/analytics логики и тестов — 20%
4. Env/ops hardening + release checklist — 20%
5. Final QA (e2e, accessibility, security headers audit) — 25%

## 8) Риски (приоритет)

### P0
- Невозможность релиза из-за `build` fail.

### P1
- Нестабильный runtime/UI из-за purity ошибок и `any` в критичных местах.
- Contract drift API (lead/leads) => риск интеграционных сбоев.

### P2
- Несинхронная проектная документация (ложный статус стадии).
- Частичная заглушка в knowledge layer (NotebookLM stub).

## 9) Где мало качества / нет логики
- Слой frontend quality gate: линтер не «зеленый», сборка не «зеленая».
- Слой контрактов: документы описывают один endpoint, код предоставляет другой.
- Слой consent analytics: категория `analytics` в store не журналируется как отдельная цель.
- Слой архитектурного управления: активная реализация при `DRAFT`-архитектуре и неактуальных task-чеклистах.

## 10) Рекомендованный следующий этап (конкретно)
1. Починить все build/lint errors до нуля и зафиксировать gate (`npm run lint && npm run build`).
2. Нормализовать API contract (`/api/lead` vs `/api/leads`) и обновить docs/genesis.
3. Доработать consent mapping (включая analytics purpose) + добавить минимальные API/integration тесты.
4. Обновить `.env.example` по фактическим переменным и убрать dead env.
5. Перевести `genesis/v4` задачи из «бумажного» статуса в фактический (done/in-progress) с evidence.
6. Закрыть knowledge-layer stub либо явно изолировать как roadmap item с feature-flag.

## 11) Фактические команды валидации
- `npm run lint` -> FAIL (14 errors, 30 warnings)
- `npm run build` -> FAIL (import error `Linkedin` in Footer)

