'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Clock, Tag, Sparkles } from 'lucide-react';
import { AcademyArticle } from '@/lib/mdx';

interface AcademyClientProps {
  articles: AcademyArticle[];
}

export const AcademyClient: React.FC<AcademyClientProps> = ({ articles }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.from('.academy-header > *', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
      });

      if (articles.length > 0) {
        gsap.from('.article-card', {
          scrollTrigger: {
            trigger: '.articles-grid',
            start: 'top 85%',
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out'
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [articles]);

  return (
    <div ref={containerRef} className="min-h-screen bg-black pt-32 pb-20 overflow-x-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-5%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-amber-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-6xl">
        <header className="academy-header mb-20 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-sm font-medium mb-8"
          >
            <Sparkles size={14} className="text-amber-500" />
            <span className="uppercase tracking-[0.2em]">Expoint Academy v3</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-8 leading-none">
            База <span className="text-neutral-500 italic">знаний</span>
          </h1>
          
          <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
            Профессиональные руководства по проектированию, согласованию 902-ПП и техническим нюансам современного производства.
          </p>
        </header>

        <div className="articles-grid grid gap-8">
          {articles.map((article) => (
            <Link 
              href={`/academy/${article.slug}`} 
              key={article.slug}
              className="article-card block group"
            >
              <div className="relative p-8 md:p-12 rounded-4xl bg-neutral-900/30 border border-white/5 hover:border-amber-500/30 hover:bg-neutral-900/50 transition-all duration-500">
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                      <div className="flex items-center gap-1.5 text-amber-500/80">
                        <Clock size={14} />
                        <time>{new Date(article.date).toLocaleDateString('ru-RU')}</time>
                      </div>
                      {article.tags?.map(tag => (
                        <div key={tag} className="flex items-center gap-1 text-neutral-500">
                          <Tag size={12} />
                          <span>{tag}</span>
                        </div>
                      ))}
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-white group-hover:text-amber-500 transition-colors duration-300 tracking-tight">
                      {article.title}
                    </h2>
                    
                    <p className="text-lg text-neutral-400 leading-relaxed max-w-3xl line-clamp-2 group-hover:text-neutral-300 transition-colors">
                      {article.description}
                    </p>
                  </div>

                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-500 group-hover:text-amber-500 group-hover:border-amber-500/50 group-hover:scale-110 group-hover:rotate-[-5deg] transition-all duration-500">
                    <ArrowRight size={28} />
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {articles.length === 0 && (
            <div className="section-padding text-center border border-dashed border-white/10 rounded-4xl">
              <p className="text-neutral-500 text-lg">Статьи в процессе подготовки...</p>
            </div>
          )}
        </div>

        {/* Subscription / Newsletter (Mini) */}
        <section className="mt-24 p-1 rounded-3xl bg-linear-to-r from-amber-500/20 via-blue-500/20 to-amber-500/20">
          <div className="bg-neutral-900 rounded-[calc(1.5rem-1px)] p-12 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Следите за обновлениями ГОСТ и 902-ПП</h3>
            <p className="text-neutral-400 mb-8">Раз в месяц присылаем дайджест изменений в законодательстве Москвы</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Ваш e-mail" 
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
              <button className="bg-amber-500 text-black font-bold px-8 py-3 rounded-xl hover:bg-amber-400 transition-all">
                Подписаться
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
