import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Store,
  Zap,
} from 'lucide-react';

import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { PRODUCT_PACKS, SERVICES } from '@/data/services';

export const metadata: Metadata = {
  title: 'Услуги и цены | Производство вывесок и объемных букв под ключ',
  description:
    'Проектируем, производим и монтируем наружную и интерьерную рекламу для бизнеса в Москве. Расчет стоимости, собственное производство, монтаж и гарантия.',
};



const trustPoints = [
  'Собственное производство в Москве',
  'Подбор решения под 902-ПП и архитектурные ограничения',
  'Работаем с единичными объектами и сетевыми roll-out проектами',
  'Производим, монтируем и сопровождаем сервисно',
];

const primaryLinkClass =
  'inline-flex h-20 items-center justify-center border border-accent bg-accent px-12 text-sm font-black uppercase tracking-[0.3em] text-white transition-all duration-500 hover:bg-accent/90 shadow-[0_20px_50px_rgba(255,77,0,0.3)] hover:scale-105 active:scale-95';

const outlineLinkClass =
  'inline-flex h-20 items-center justify-center border border-white/10 bg-white/5 backdrop-blur-md px-12 text-sm font-black uppercase tracking-[0.3em] text-white transition-all duration-500 hover:bg-white/10 hover:border-white/20';

export default function ServicesPage() {
  const featuredService = SERVICES.find(s => s.id === 'volumetric-letters');

  return (
    <>
      <Header />

      <main className="min-h-screen bg-surface pt-28 text-white overflow-hidden">
        {/* Cinematic Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden px-6 pb-20 lg:px-20 lg:pb-28">
          <div className="absolute inset-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000"
              src="/videos/signage/3d-letters-preview.mp4"
            />
            <div className="absolute inset-0 bg-linear-to-b from-surface/80 via-surface/60 to-surface" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,77,0,0.15),transparent_50%)]" />
            <div className="absolute inset-0 z-10 opacity-10 bg-[url('/img/patterns/grid.svg')] bg-repeat mix-blend-overlay" />
          </div>

          <div className="relative z-10 section-container grid gap-16 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div className="space-y-12">
              <div className="flex items-center gap-4">
                <div className="h-px w-16 bg-accent shadow-neon" />
                <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px]">
                  Production Hub & Engineering
                </span>
              </div>

              <div className="space-y-8">
                <h1 className="text-6xl md:text-[120px] font-black uppercase tracking-tighter leading-[0.85] text-white">
                  Industrial <br />
                  <span className="text-on-surface-variant/30">Signage</span> <br />
                  <span className="text-accent">Solutions</span>
                </h1>
                <p className="max-w-2xl text-2xl font-light leading-relaxed text-on-surface-variant/80 border-l-4 border-accent/20 pl-8">
                  Проектируем и производим рекламные конструкции, которые выдерживают климат Москвы и требования 902-ПП, сохраняя премиальный вид десятилетиями.
                </p>
              </div>

              <div className="flex flex-col gap-6 sm:flex-row pt-8">
                <a href="#services" className={primaryLinkClass}>
                  View Services <ArrowRight className="ml-4 w-6 h-6" />
                </a>
                <a href="/catalog.pdf" download className={outlineLinkClass}>
                  Technical Catalog
                </a>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute -inset-20 bg-accent/20 blur-[120px] rounded-full animate-pulse" />
              <div className="relative border border-white/10 bg-white/5 backdrop-blur-2xl p-12 space-y-8 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
                    <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                      Live_Production_Status
                    </div>
                  </div>
                  <div className="text-accent font-mono text-[10px]">V.5.2.0</div>
                </div>

                <div className="space-y-6">
                  {trustPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-4 group">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-1 transition-transform group-hover:scale-125" />
                      <span className="text-sm font-light text-white/80 leading-relaxed">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                  <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                    902-PP / Compliance
                  </div>
                  <div className="px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-[9px] font-black uppercase">
                    Certified
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Services Grid */}
        <section id="services" className="py-24 px-6 lg:px-20 bg-surface relative">
          <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-accent/20 to-transparent" />
          
          <div className="section-container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
              {SERVICES.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Big Card - Volumetric Letters */}
        <section className="py-24 px-6 lg:px-20 bg-surface">
          <div className="section-container">
            <div className="relative overflow-hidden group">
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="grid lg:grid-cols-2 gap-12 items-center p-12 lg:p-24 border border-white/10 bg-white/2">
                <div className="space-y-10">
                  <div className="inline-flex items-center gap-3 px-4 py-1 bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">
                    <Zap className="w-3 h-3" /> Best Seller
                  </div>
                  <h2 className="text-5xl lg:text-8xl font-black uppercase tracking-tighter leading-none text-white">
                    {featuredService?.title}
                  </h2>
                  <p className="text-xl font-light text-on-surface-variant/70 leading-relaxed max-w-lg">
                    {featuredService?.fullDescription}
                  </p>
                  <div className="grid grid-cols-2 gap-8 pt-8">
                    {featuredService?.features.slice(0, 4).map((f, i) => (
                      <div key={i} className="space-y-2">
                        <div className="h-px w-8 bg-accent/40" />
                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Feature 0{i+1}</span>
                        <span className="text-sm font-bold text-white uppercase">{f}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-12">
                    <Link href={`/services/${featuredService?.id}`} className={primaryLinkClass}>
                      Details & Case Studies <ArrowRight className="ml-4 w-6 h-6" />
                    </Link>
                  </div>
                </div>
                <div className="relative aspect-square">
                  <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full" />
                  <Image 
                    src="/img/services/letters-hero.webp" 
                    alt="Volumetric Letters" 
                    width={800}
                    height={800}
                    className="relative z-10 w-full h-full object-contain drop-shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary Packs/Solutions */}
        <section className="py-24 px-6 lg:px-20 bg-surface">
          <div className="section-container space-y-24">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
                Ready-to-Deploy <span className="text-accent">Packs</span>
              </h2>
              <p className="text-on-surface-variant/60 font-light">
                Комплексные решения для типовых объектов бизнеса. Оптимизированная стоимость и гарантированные сроки.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {PRODUCT_PACKS.map((pack, i) => (
                <div key={i} className="group relative border border-white/5 bg-white/2 p-10 hover:bg-white/4 transition-all duration-500">
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 transition-opacity">
                    <Store className="w-12 h-12 text-white" />
                  </div>
                  <div className="space-y-6">
                    <span className="text-[10px] font-mono text-accent uppercase tracking-[0.3em]">Pack 0{i+1}</span>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white leading-none">{pack.name}</h3>
                    <div className="h-px w-full bg-white/5" />
                    <ul className="space-y-3">
                      {pack.features.map((item, j) => (
                        <li key={j} className="text-xs font-light text-on-surface-variant/60 flex items-center gap-3">
                          <div className="w-1 h-1 bg-accent/40" /> {item}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-6">
                      <span className="text-[10px] font-mono text-white/20 uppercase block mb-1">Starting from</span>
                      <span className="text-3xl font-black text-white">{pack.priceStart}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industrial CTA Section */}
        <section className="py-24 px-6 lg:px-20 bg-surface">
          <div className="section-container">
            <div className="relative bg-accent p-12 lg:p-24 overflow-hidden group">
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 industrial-grid opacity-20" />
                <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/10 blur-[100px] rounded-full animate-pulse" />
              </div>
              
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
                <div className="space-y-8 max-w-2xl">
                  <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none text-white">
                    Ready to scale <br /> your <span className="text-black">Visibility?</span>
                  </h2>
                  <p className="text-white/80 text-xl font-light leading-relaxed">
                    Начните с бесплатного аудита вашего объекта на соответствие 902-ПП. Мы подготовим техническое задание и расчет за 24 часа.
                  </p>
                  
                  <div className="flex flex-wrap gap-12 pt-8">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">Response Time</span>
                      <span className="text-xl font-mono text-white/80">{"<"} 2 Hours</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">Standards</span>
                      <span className="text-xl font-mono text-white/80">902-PP OK</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center md:items-end gap-8 w-full md:w-auto">
                    <button className={primaryLinkClass}>
                      Open Calculator <ArrowRight className="ml-4 w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-4 opacity-40">
                      <div className="h-px w-8 bg-white" />
                      <p className="text-white text-[10px] uppercase tracking-[0.4em] font-medium">
                        Free estimate within 24 hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
