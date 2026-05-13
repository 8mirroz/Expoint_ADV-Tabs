import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticleBySlug, getAcademySlugs } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';

export async function generateStaticParams() {
  const slugs = getAcademySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);
  
  if (!article) {
    return {
      title: 'Not Found | Expoint ADV',
    };
  }

  return {
    title: `${article.title} | Expoint Academy`,
    description: article.description,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="mb-8">
          <Link href="/academy" className="inline-flex items-center space-x-2 text-on-surface-variant hover:text-accent transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Назад в Академию</span>
          </Link>
        </div>

        <article className="bento-card p-6 md:p-12 relative overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
          
          <header className="mb-12 border-b border-white/10 pb-8 relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold text-on-primary mb-6 leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-on-surface-variant">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                <time>{new Date(article.date).toLocaleDateString('ru-RU')}</time>
              </div>
              {article.tags && article.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-accent" />
                  <div className="flex gap-2">
                    {article.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </header>

          <div className="prose prose-invert prose-slate max-w-none relative z-10 prose-headings:font-headline prose-a:text-accent hover:prose-a:text-accent/80 prose-hr:border-white/10">
            <MDXRemote source={article.content} />
          </div>
        </article>
      </div>
    </main>
  );
}
