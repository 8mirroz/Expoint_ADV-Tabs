import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content', 'academy');

export type AcademyArticle = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
  source_doc_ids: string[];
  claims: {
    source_doc_id: string;
    claim: string;
    evidence_snippet: string;
  }[];
  last_verified_at: string;
  owner: string;
  content: string;
};

export function getAcademySlugs(): string[] {
  if (!fs.existsSync(contentDir)) return [];
  const files = fs.readdirSync(contentDir);
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export function getArticleBySlug(slug: string): AcademyArticle | null {
  const fullPath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || 'Untitled',
    description: data.description || '',
    date: data.date || new Date().toISOString(),
    tags: data.tags || [],
    source_doc_ids: data.source_doc_ids || [],
    claims: data.claims || [],
    last_verified_at: data.last_verified_at || new Date().toISOString().slice(0, 10),
    owner: data.owner || 'content-team',
    content,
  };
}

export function getAllArticles(): AcademyArticle[] {
  const slugs = getAcademySlugs();
  const articles = slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is AcademyArticle => article !== null)
    .sort((a, b) => (new Date(b.date).getTime() > new Date(a.date).getTime() ? 1 : -1));
  return articles;
}
