import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import registry from '../src/data/nbllm-research-registry.json';
import { CASE_STUDIES } from '../src/data/cases';
import type { AcademyArticle } from '../src/lib/mdx';

function readAcademyArticles(contentDir: string): AcademyArticle[] {
  const files = fs.readdirSync(contentDir).filter((file) => file.endsWith('.mdx'));

  return files.map((file) => {
    const fullPath = path.join(contentDir, file);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const parsed = matter(raw);

    return {
      slug: file.replace(/\.mdx$/, ''),
      title: parsed.data.title || 'Untitled',
      description: parsed.data.description || '',
      date: parsed.data.date || new Date().toISOString(),
      tags: parsed.data.tags || [],
      source_doc_ids: parsed.data.source_doc_ids || [],
      claims: parsed.data.claims || [],
      last_verified_at: parsed.data.last_verified_at || '',
      owner: parsed.data.owner || '',
      content: parsed.content,
    };
  });
}

function unique<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}

function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

function main() {
  const today = new Date().toISOString().slice(0, 10);
  const contentDir = path.join(process.cwd(), 'content', 'academy');
  const outputDir = path.join(process.cwd(), 'docs', 'knowledge', 'coverage');
  fs.mkdirSync(outputDir, { recursive: true });

  const docs = registry as Array<{ source_doc_id: string; covered_sections: string[] }>;
  const articles = readAcademyArticles(contentDir);

  const articleDocIds = unique(articles.flatMap((article) => article.source_doc_ids));
  const caseDocIds = unique(CASE_STUDIES.flatMap((item) => item.contentMeta.source_doc_ids));
  const coveredDocIds = unique([...articleDocIds, ...caseDocIds]);

  const coverageRate = coveredDocIds.length / docs.length;

  const claimsTotal = articles.reduce((acc, article) => acc + article.claims.length, 0) +
    CASE_STUDIES.reduce((acc, item) => acc + item.contentMeta.claims.length, 0);

  const claimsWithSource = articles.reduce(
    (acc, article) => acc + article.claims.filter((claim) => claim.source_doc_id).length,
    0
  ) + CASE_STUDIES.reduce(
    (acc, item) => acc + item.contentMeta.claims.filter((claim) => claim.source_doc_id).length,
    0
  );

  const citationCoverage = claimsTotal === 0 ? 0 : claimsWithSource / claimsTotal;

  const academyCompletionRate = Math.min(1, articles.length / 12);
  const casesMetricsCompletionRate =
    CASE_STUDIES.length === 0
      ? 0
      : CASE_STUDIES.filter((item) => item.metrics.length > 0).length / CASE_STUDIES.length;

  const uncoveredDocIds = docs
    .map((doc) => doc.source_doc_id)
    .filter((docId) => !coveredDocIds.includes(docId));

  const markdown = `# NBLLM Weekly Coverage Report

Дата: ${today}

## KPI Snapshot
- coverage_rate: ${formatPercent(coverageRate)} (${coveredDocIds.length}/${docs.length})
- citation_coverage: ${formatPercent(citationCoverage)} (${claimsWithSource}/${claimsTotal})
- fallback_rate: n/a (runtime metric from logs)
- academy_completion_rate: ${formatPercent(academyCompletionRate)} (${articles.length}/12)
- cases_metrics_completion_rate: ${formatPercent(casesMetricsCompletionRate)}

## Coverage Detail
- Covered source docs: ${coveredDocIds.join(', ') || 'none'}
- Uncovered source docs: ${uncoveredDocIds.join(', ') || 'none'}
- Academy articles: ${articles.length}
- Case studies with metrics: ${CASE_STUDIES.filter((item) => item.metrics.length > 0).length}/${CASE_STUDIES.length}

## Notes
- This baseline is generated from local content + case metadata contracts.
- Runtime fallback/citation metrics are captured in knowledge query logs.
`;

  const outputPath = path.join(outputDir, `${today}-week1-baseline.md`);
  fs.writeFileSync(outputPath, markdown, 'utf8');
  console.log(`Knowledge report generated: ${outputPath}`);
}

main();
