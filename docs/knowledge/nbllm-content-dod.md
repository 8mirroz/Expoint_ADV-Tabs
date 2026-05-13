# NBLLM Content Definition of Done (DoD)

1. Публикация допускается только при наличии `source_doc_ids[]`, `claims[]`, `last_verified_at`, `owner`.
2. Каждый claim обязан содержать `source_doc_id` и `evidence_snippet`.
3. Материал считается черновиком и не должен выходить в public surface, если хотя бы один обязательный мета-параметр отсутствует.
4. Для кейсов обязательны измеримые outcomes (`metrics[]`) без placeholder-текста.
5. Для compliance-правил обязательна evidence-связка в `rules_902pp`.
6. Перед релизом: `npm run lint`, `npm run build`, и weekly coverage report.
7. Для AI-контура: zero mock-responses в production path ассистента.
