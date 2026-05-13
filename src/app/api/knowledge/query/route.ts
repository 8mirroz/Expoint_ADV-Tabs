import { NextRequest, NextResponse } from 'next/server';
import { KnowledgeQueryRequestSchema } from '@/lib/validators/knowledge';
import { queryKnowledgeBaseRuntime } from '@/lib/knowledge/engine';

export async function POST(req: NextRequest) {
  const start = Date.now();

  try {
    const body = await req.json();
    const parsed = KnowledgeQueryRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Invalid knowledge query payload',
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const result = await queryKnowledgeBaseRuntime(parsed.data);
    const latencyMs = Date.now() - start;
    const citationCount = result.citations.length;

    console.log('[KNOWLEDGE_QUERY]', {
      trace_id: result.trace_id,
      fallback_reason: result.fallback_reason,
      confidence: result.confidence,
      latency_ms: latencyMs,
      citation_count: citationCount,
      unresolved_query: result.fallback_reason !== 'none',
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('[KNOWLEDGE_QUERY_ERROR]', error);

    return NextResponse.json(
      {
        answer:
          'Сервис знаний временно недоступен. Оставьте параметры проекта, и инженер подготовит верифицированный ответ.',
        citations: [],
        confidence: 0,
        fallback_reason: 'upstream_unreachable',
        trace_id: crypto.randomUUID(),
      },
      { status: 200 }
    );
  }
}
