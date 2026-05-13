# Weekly Knowledge Audit Ritual

## Cadence
- Частота: 1 раз в неделю (понедельник)
- Участники: content owner, frontend owner, backend owner
- Длительность: 45 минут

## Inputs
- `docs/knowledge/coverage/*-week1-baseline.md`
- Логи `KNOWLEDGE_QUERY` (fallback/citations/confidence)
- Diff Academy/Cases/Compliance за неделю

## Checks
1. Coverage check
- % покрытых research-docs
- список непокрытых источников

2. Evidence check
- % claims с источниками
- статьи/кейсы без owner или даты верификации

3. Runtime quality check
- fallback_rate
- unresolved_query_rate
- средняя confidence

4. Conversion impact snapshot
- количество целевых диалогов в ассистенте
- переходы из ассистента в заявки

## Actions
- Завести backlog на непокрытые источники
- Исправить материалы с нарушением DoD
- Обновить owners и даты верификации
