# KI: Sales Engine Disconnected Adapter Pattern

**Date**: 2026-05-18
**Type**: architecture / anti-pattern
**Scope**: project (expoint-adv-tabs)
**Confidence**: high (verified via code analysis)

## Summary
Паттерн «Disconnected Adapter» — адаптерный слой (`salesEngine.ts`) вызывает API эндпоинты (`/api/proposal`, `/api/visualization`), но не передает результат обратно в Zustand store. В результате UI capabilities блок остается статичным, несмотря на наличие рабочих API.

## Root Cause
Метод `generateProposal()` выполняет `fetch('/api/proposal')`, получает `{ proposalId, pdfUrl }`, но не вызывает `useSalesEngineStore.getState().updateCapabilityStatus()` — потому что такого экшена просто не существовало в store.

## Fix Strategy
1. Добавить `updateCapabilityStatus` action в `useSalesEngineStore`
2. Вызывать его после успешного ответа API в адаптере
3. Добавить `pdfUrl` / `visualizationId` в `CapabilityState`
4. Рендерить интерактивные кнопки с учетом текущего статуса

## Additional Issues Found
- Дублирование 4 типов между `useCartStore.ts` и `useSalesEngineStore.ts`
- GET handler `/api/proposal` ожидает `context.params.proposalId` в non-dynamic route
- Корзина не очищается после успешной отправки заказа

## References
- `src/lib/salesEngine.ts` (lines 86-102)
- `src/store/useSalesEngineStore.ts` (lines 121-148, 227-234)
- `src/components/calculator/CalculatorContainer.tsx` (lines 704-727)
- `src/components/checkout/CheckoutClient.tsx` (lines 113-127)
