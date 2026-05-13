export type KnowledgeFallbackReason =
  | 'none'
  | 'knowledge_unavailable'
  | 'no_relevant_evidence'
  | 'upstream_unreachable';

export interface KnowledgeCitation {
  source_doc_id: string;
  source_title: string;
  snippet: string;
  relevance_score: number;
}

export interface KnowledgeQueryRequest {
  query: string;
  context?: string;
  session_meta?: {
    locale?: string;
    session_id?: string;
    path?: string;
  };
}

export interface KnowledgeQueryResponse {
  answer: string;
  citations: KnowledgeCitation[];
  confidence: number;
  fallback_reason: KnowledgeFallbackReason;
  trace_id: string;
}

export interface ContentEvidenceClaim {
  source_doc_id: string;
  claim: string;
  evidence_snippet: string;
}

export interface KnowledgeContentMeta {
  source_doc_ids: string[];
  claims: ContentEvidenceClaim[];
  last_verified_at: string;
  owner: string;
}

export interface WeeklyKnowledgeKPI {
  coverage_rate: number;
  citation_coverage: number;
  fallback_rate: number;
  academy_completion_rate: number;
  cases_metrics_completion_rate: number;
}

export interface NbllmResearchDoc {
  source_doc_id: string;
  source_title: string;
  category: string;
  covered_sections: string[];
  covered_components: string[];
  covered_data_files: string[];
  last_verified_at: string;
  owner: string;
}
