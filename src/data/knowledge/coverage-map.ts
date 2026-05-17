export type CoverageDocId =
  | 't1'
  | 't2'
  | 't3_neon'
  | 't4_lightbox'
  | 't5_letters'
  | 't6_navigation'
  | 't7_setup';

export interface CoverageMapEntry {
  coverage_doc_id: CoverageDocId;
  file_path: string;
  title: string;
  focus: string[];
  target_routes: string[];
  target_data_keys: string[];
}

export const COVERAGE_MAP: CoverageMapEntry[] = [
  {
    coverage_doc_id: 't1',
    file_path: 'docs/knowledge/coverage/t1.md',
    title: 'Service page architecture patterns and B2B hero logic',
    focus: ['hero', 'benefits', 'faq', 'case structure', 'navigation patterns'],
    target_routes: ['/services', '/services/neon', '/services/lightboxes', '/services/wayfinding'],
    target_data_keys: ['service-pages', 'services', 'prices'],
  },
  {
    coverage_doc_id: 't2',
    file_path: 'docs/knowledge/coverage/t2.md',
    title: 'B2B pricing strategy and ultra prompt',
    focus: ['pricing funnel', 'price trust', 'risk handling', 'seo keywords'],
    target_routes: ['/prices', '/services/neon', '/services/lightboxes', '/services/wayfinding'],
    target_data_keys: ['prices', 'service-pages'],
  },
  {
    coverage_doc_id: 't3_neon',
    file_path: 'docs/knowledge/coverage/t3_neon.md',
    title: 'Flex neon content and pricing deep-dive',
    focus: ['segments', 'packages', 'technology comparison', 'hooks'],
    target_routes: ['/services/neon'],
    target_data_keys: ['service-pages/neon', 'services'],
  },
  {
    coverage_doc_id: 't4_lightbox',
    file_path: 'docs/knowledge/coverage/t4_lightbox.md',
    title: 'Lightbox composition and m2 pricing logic',
    focus: ['area pricing', 'format selection', 'mounting context'],
    target_routes: ['/services/lightboxes'],
    target_data_keys: ['service-pages/lightboxes', 'services'],
  },
  {
    coverage_doc_id: 't5_letters',
    file_path: 'docs/knowledge/coverage/t5_letters.md',
    title: 'Volume letters deep-dive and complexity tiers',
    focus: ['cm pricing', 'complexity tiers', 'premium scenarios'],
    target_routes: ['/services/volumetric-letters'],
    target_data_keys: ['service-pages/volumetric-letters', 'services'],
  },
  {
    coverage_doc_id: 't6_navigation',
    file_path: 'docs/knowledge/coverage/t6_navigation.md',
    title: 'Wayfinding segments and navigation packages',
    focus: ['segment packaging', 'briefing', 'material scenarios'],
    target_routes: ['/services/wayfinding'],
    target_data_keys: ['service-pages/wayfinding', 'services'],
  },
  {
    coverage_doc_id: 't7_setup',
    file_path: 'docs/knowledge/coverage/t7_setup.md',
    title: 'Installation, dismantling, legal risk and mounting logic',
    focus: ['installation pricing', 'risk mitigation', 'compliance', 'upload friction'],
    target_routes: ['/services/setup', '/prices'],
    target_data_keys: ['service-pages/setup', 'prices', 'rules_902pp'],
  },
];

export const COVERAGE_DOC_IDS = COVERAGE_MAP.map((entry) => entry.coverage_doc_id);

export function getCoverageEntry(docId: CoverageDocId): CoverageMapEntry | undefined {
  return COVERAGE_MAP.find((entry) => entry.coverage_doc_id === docId);
}
