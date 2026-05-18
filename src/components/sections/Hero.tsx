"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronRight, Play } from "lucide-react";
import { useModalStore } from "@/store/useModalStore";
import { Marquee } from "@/components/ui/marquee";

// ─── Client logos for the trust strip ──────────────────────────────────────
const clients = [
  { name: "Siemens", logo: "/img/logos/mono/siemens.svg" },
  { name: "Bosch", logo: "/img/logos/mono/bosch.svg" },
  { name: "BMW", logo: "/img/logos/mono/bmw.svg" },
  { name: "Mercedes-Benz", logo: "/img/logos/mono/mercedes.svg" },
  { name: "Audi", logo: "/img/logos/mono/audi.svg" },
  { name: "Porsche", logo: "/img/logos/mono/porsche.svg" },
  { name: "Ferrari", logo: "/img/logos/mono/ferrari.svg" },
  { name: "Tesla", logo: "/img/logos/mono/tesla.svg" },
  { name: "Samsung", logo: "/img/logos/mono/samsung.svg" },
  { name: "Nike", logo: "/img/logos/mono/nike.svg" },
];

// ─── Hero stat chips ──────────────────────────────────────────────────────
const stats = [
  { value: "500+", label: "Проектов" },
  { value: "12", label: "Лет опыта" },
  { value: "99%", label: "Клиентов" },
];

// ─── Hero section tags ────────────────────────────────────────────────────
const tags = [
  "Объёмные буквы",
  "Световые короба",
  "Гибкий неон",
  "Крышные установки",
  "Монтаж",
];

// ─── Animated particle dot ───────────────────────────────────────────────
function Dot({
  style,
}: {
  style: React.CSSProperties;
}) {
  return (
    <span
      aria-hidden
      className="absolute rounded-full opacity-30"
      style={style}
    />
  );
}

// ─── Grid overlay ────────────────────────────────────────────────────────
function GridOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }}
    />
  );
}

// ─── Ambient glow orbs ───────────────────────────────────────────────────
function AmbientOrbs() {
  return (
    <>
      {/* Primary accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[20%] left-[10%] h-[700px] w-[700px] rounded-full opacity-20 blur-[130px]"
        style={{ background: "radial-gradient(circle, #00ffa3 0%, transparent 70%)" }}
      />
      {/* Purple secondary glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[5%] right-[5%] h-[500px] w-[500px] rounded-full opacity-15 blur-[120px]"
        style={{ background: "radial-gradient(circle, #7928ca 0%, transparent 70%)" }}
      />
      {/* Warm deep glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[10%] left-[30%] h-[600px] w-[600px] rounded-full opacity-10 blur-[160px]"
        style={{ background: "radial-gradient(circle, #ff6b35 0%, transparent 70%)" }}
      />
    </>
  );
}

// ─── Scroll-animated preview card ────────────────────────────────────────
function PreviewCard() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0.4, 1, 1, 0.6]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="relative mt-20 lg:mt-0"
    >
      {/* Premium frame */}
      <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] shadow-[0_40px_120px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04)]">
        {/* Inner glow top accent */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        {/* Video / image placeholder */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#0a0a12]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover opacity-60"
            src="https://ik.imagekit.io/lrigu76hy/tailark/dna-video.mp4?updatedAt=1745736251477"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-70" />
          {/* Play badge */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2.5 rounded-full border border-white/10 bg-black/50 px-4 py-2 backdrop-blur-md">
            <Play className="h-3.5 w-3.5 fill-[#00ffa3] text-[#00ffa3]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">
              Производственный цикл
            </span>
          </div>
        </div>

        {/* Card meta bar */}
        <div className="flex items-center justify-between gap-4 bg-[#0d0d18]/90 px-6 py-4 backdrop-blur-lg">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">Текущий проект</p>
            <p className="mt-0.5 text-sm font-semibold text-white">Световые буквы / ТЦ «Атмосфера»</p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-[#00ffa3]/20 bg-[#00ffa3]/10 px-3 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00ffa3]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#00ffa3]">В работе</span>
          </div>
        </div>
      </div>

      {/* Floating stat chip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 20 }}
        className="absolute -bottom-5 -left-8 z-20 flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#0d0d18]/95 px-5 py-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00ffa3]/10 border border-[#00ffa3]/20">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#00ffa3]">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-black text-white">Сдан в срок</p>
          <p className="text-[10px] text-white/50">4 из 4 этапов</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main HeroSection ─────────────────────────────────────────────────────
const HeroSection = () => {
  const openModal = useModalStore((s) => s.openModal);
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax on scroll for the whole hero content
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Generate stable dots (avoid hydration mismatch)
  const dots = useRef(
    Array.from({ length: 24 }, (_, i) => ({
      left: `${((i * 37 + 11) % 97)}%`,
      top: `${((i * 53 + 7) % 93)}%`,
      size: 2 + (i % 4),
      delay: (i * 0.4) % 6,
      duration: 12 + (i % 10),
    }))
  );

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen overflow-hidden bg-[#050508]"
      aria-label="Главный экран Expoint ADV"
    >
      {/* ── Background layer ───────────────────────────────────────────── */}
      <AmbientOrbs />
      <GridOverlay />

      {/* Floating particles */}
      {dots.current.map((dot, i) => (
        <Dot
          key={i}
          style={{
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
            background: i % 3 === 0 ? "#00ffa3" : i % 3 === 1 ? "#7928ca" : "#ffffff",
            animationDelay: `${dot.delay}s`,
            animationDuration: `${dot.duration}s`,
            animation: `float-particle ${dot.duration}s ease-in-out ${dot.delay}s infinite`,
          }}
        />
      ))}

      {/* ── Content ────────────────────────────────────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto max-w-[1440px] px-4 pb-0 pt-[calc(var(--header-height,5.5rem)+4rem)] sm:px-6 lg:px-8 lg:pt-[calc(var(--header-height,5.5rem)+5rem)]"
      >
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-center xl:grid-cols-[1.1fr_0.9fr]">

          {/* ── Left column: text ───────────────────────────────────────── */}
          <div className="flex flex-col">

            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 backdrop-blur-md"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00ffa3]" />
              <span
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Производство рекламных конструкций · Москва
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.6rem,5vw+1rem,5rem)] font-black leading-[1.0] tracking-[-0.04em] text-white"
              style={{ fontFamily: "var(--font-header)" }}
            >
              Вывески,{" "}
              <span
                className="relative inline-block"
                style={{
                  background: "linear-gradient(135deg, #00ffa3 0%, #00c8ff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                которые
              </span>
              <br />
              работают{" "}
              <span className="text-white/25">на вас</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-xl text-[1.05rem] leading-[1.75] text-white/55"
            >
              Проектируем и производим объёмные буквы, световые короба, неон и крышные
              конструкции. Под ключ — от согласования до монтажа.
            </motion.p>

            {/* Tags strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-7 flex flex-wrap gap-2"
            >
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/50"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              {/* Primary CTA */}
              <button
                id="hero-cta-primary"
                onClick={() => openModal({ context: "Hero — Рассчитать стоимость", source: "hero_primary" })}
                className="group relative flex h-14 items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[#00ffa3] px-8 text-[13px] font-black uppercase tracking-[0.12em] text-black shadow-[0_0_30px_rgba(0,255,163,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#00ffa3]/90 hover:shadow-[0_0_50px_rgba(0,255,163,0.5)] active:scale-[0.97] sm:min-w-[200px]"
              >
                <span className="relative z-10">Рассчитать стоимость</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>

              {/* Secondary CTA */}
              <Link
                id="hero-cta-secondary"
                href="/cases"
                className="group flex h-14 items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-7 text-[13px] font-semibold tracking-[-0.01em] text-white/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.08] hover:text-white active:scale-[0.97] sm:min-w-[160px]"
              >
                <span>Наши работы</span>
                <ChevronRight className="h-4 w-4 opacity-60 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
              </Link>
            </motion.div>

            {/* Stat chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 flex items-center gap-px"
            >
              {stats.map((stat, i) => (
                <React.Fragment key={stat.label}>
                  {i > 0 && (
                    <div className="mx-5 h-8 w-px bg-white/[0.08]" />
                  )}
                  <div className="flex flex-col">
                    <span
                      className="text-[1.5rem] font-black leading-none tracking-[-0.04em] text-white"
                      style={{ fontFamily: "var(--font-header)" }}
                    >
                      {stat.value}
                    </span>
                    <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.15em] text-white/40">
                      {stat.label}
                    </span>
                  </div>
                </React.Fragment>
              ))}
            </motion.div>
          </div>

          {/* ── Right column: preview card ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <PreviewCard />
          </motion.div>
        </div>
      </motion.div>

      {/* ── Client trust marquee ──────────────────────────────────────── */}
      <div className="relative z-10 mt-24 border-t border-white/[0.06] bg-[#050508]/80 py-7 backdrop-blur-sm">
        <div className="mx-auto mb-5 max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <p
            className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/25"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Среди наших клиентов
          </p>
        </div>

        <div className="relative overflow-hidden">
          <Marquee className="[--duration:55s] [--gap:5rem]">
            {clients.map((client) => (
              <div key={client.name} className="flex items-center justify-center px-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-6 w-auto object-contain opacity-25 brightness-0 invert transition-opacity duration-500 hover:opacity-60"
                />
              </div>
            ))}
          </Marquee>

          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#050508] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#050508] to-transparent" />
        </div>
      </div>

      {/* Floating particle animation styles */}
      <style>{`
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); }
          33%       { transform: translateY(-18px) translateX(12px); }
          66%       { transform: translateY(14px) translateX(-10px); }
        }
      `}</style>
    </section>
  );
};

export { HeroSection };
export default HeroSection;