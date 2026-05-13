import registry from '@/data/nbllm-research-registry.json';
import { CASE_STUDIES } from '@/data/cases';
import { SIGN_MATERIALS } from '@/data/materials';
import { SERVICES } from '@/data/services';
import { rules902PP } from '@/data/rules_902pp';
import type {
  KnowledgeCitation,
  KnowledgeFallbackReason,
  KnowledgeQueryRequest,
  KnowledgeQueryResponse,
  NbllmResearchDoc,
} from './types';

interface KnowledgeChunk {
  id: string;
  title: string;
  snippet: string;
  source_doc_id: string;
  keywords: string[];
}

const docs = registry as NbllmResearchDoc[];

function tokenize(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^a-zа-яё0-9\s-]/gi, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 2);
}

function overlapScore(queryTokens: string[], keywords: string[]): number {
  const keywordSet = new Set(keywords);
  let score = 0;
  for (const token of queryTokens) {
    if (keywordSet.has(token)) {
      score += 1;
    }
  }
  return score;
}

function resolveDocTitle(sourceDocId: string): string {
  const found = docs.find((item) => item.source_doc_id === sourceDocId);
  return found?.source_title ?? 'NBLLM Research Document';
}

function buildKnowledgeChunks(): KnowledgeChunk[] {
  const serviceChunks: KnowledgeChunk[] = SERVICES.map((service, idx) => ({
    id: `svc-${service.id}`,
    title: service.title,
    snippet: `${service.fullDescription}. Базовая цена: ${service.basePrice} ${service.priceUnit}.`,
    source_doc_id: service.expertNotes?.source_doc_ids?.[0] ?? 'NB-003',
    keywords: tokenize([
      service.title,
      service.shortDescription,
      service.fullDescription,
      ...service.features,
      service.expertNotes?.constraints ?? '',
      service.expertNotes?.assumptions ?? '',
    ].join(' ')),
  }));

  const materialChunks: KnowledgeChunk[] = SIGN_MATERIALS.map((material) => ({
    id: `mat-${material.id}`,
    title: material.name,
    snippet: `${material.description}. Ценность: ${material.premiumValue}.`,
    source_doc_id: 'NB-004',
    keywords: tokenize(`${material.name} ${material.description} ${material.premiumValue}`),
  }));

  const caseChunks: KnowledgeChunk[] = CASE_STUDIES.map((item) => ({
    id: `case-${item.id}`,
    title: item.title,
    snippet: `${item.solution}. Метрики: ${item.metrics?.map((metric) => `${metric.label} ${metric.value}`).join(', ') ?? 'не указаны'}.`,
    source_doc_id: item.contentMeta?.source_doc_ids?.[0] ?? 'NB-011',
    keywords: tokenize(`${item.title} ${item.description} ${item.solution} ${item.segment}`),
  }));

  const complianceChunks: KnowledgeChunk[] = rules902PP.map((rule) => ({
    id: `rule-${rule.id}`,
    title: rule.title,
    snippet: rule.description,
    source_doc_id: rule.evidence?.source_doc_id ?? 'NB-001',
    keywords: tokenize(`${rule.title} ${rule.description} ${rule.category}`),
  }));

  return [...serviceChunks, ...materialChunks, ...caseChunks, ...complianceChunks];
}

const knowledgeChunks = buildKnowledgeChunks();

function buildFallback(query: string, reason: KnowledgeFallbackReason, traceId: string): KnowledgeQueryResponse {
  return {
    answer:
      reason === 'knowledge_unavailable'
        ? 'Сейчас контур базы знаний временно недоступен. Могу передать ваш запрос инженеру и вернуться с верифицированным ответом.'
        : `По запросу "${query}" не найдено достаточно подтвержденных данных в базе знаний. Уточните материал, тип вывески, срок и ограничения по 902-ПП.`,
    citations: [],
    confidence: 0.2,
    fallback_reason: reason,
    trace_id: traceId,
  };
}

export async function queryKnowledgeBaseRuntime(input: KnowledgeQueryRequest): Promise<KnowledgeQueryResponse> {
  const traceId = crypto.randomUUID();

  if (process.env.NBLLM_RUNTIME_DISABLED === 'true') {
    return buildFallback(input.query, 'knowledge_unavailable', traceId);
  }

  const queryTokens = tokenize(`${input.query} ${input.context ?? ''}`);
  const scored = knowledgeChunks
    .map((chunk) => ({
      chunk,
      score: overlapScore(queryTokens, chunk.keywords),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (scored.length === 0) {
    return buildFallback(input.query, 'no_relevant_evidence', traceId);
  }

  const citations: KnowledgeCitation[] = scored.map((entry) => ({
    source_doc_id: entry.chunk.source_doc_id,
    source_title: resolveDocTitle(entry.chunk.source_doc_id),
    snippet: entry.chunk.snippet,
    relevance_score: Number((entry.score / Math.max(queryTokens.length, 1)).toFixed(2)),
  }));

  const answerParts = scored.map((entry, idx) => `${idx + 1}) ${entry.chunk.title}: ${entry.chunk.snippet}`);
  const maxScore = scored[0]?.score ?? 0;
  const confidence = Math.min(0.95, Number((0.45 + maxScore / Math.max(queryTokens.length, 1)).toFixed(2)));

  return {
    answer: `Подтвержденные данные из NBLLM-контекста:\n${answerParts.join('\n')}`,
    citations,
    confidence,
    fallback_reason: 'none',
    trace_id: traceId,
  };
}
