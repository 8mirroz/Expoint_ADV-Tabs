"use client";

import React, { useRef, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronRight, Shield, Ruler, Sparkles } from "lucide-react";
import { useModalStore } from "@/store/useModalStore";
import { TurnstileWidget } from "@/components/ui/TurnstileWidget";
import { SegmentData } from "@/data/segments";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { t } from "@/i18n/site";
import { createExpointSalesEngine, type SalesQuizInput } from "@/lib/salesEngine";
import { useSalesEngineStore } from "@/store/useSalesEngineStore";



// ─── Hero stat chips ──────────────────────────────────────────────────────
const stats = [
  { value: "500+", label: "Проектов" },
  { value: "12", label: "Лет опыта" },
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
  const router = useRouter();
  const [quizEnabled, setQuizEnabled] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [leadData, setLeadData] = useState({ name: "", phone: "", email: "", consent: false });
  const [quiz, setQuiz] = useState({
    type: "Объемные буквы",
    timeline: "Standard (до 21 дня)",
    hasFacade: "Нет, нужна фотопривязка",
  });
  const draft = useSalesEngineStore((state) => state.draft);
  const salesEngine = createExpointSalesEngine();


  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!turnstileToken) {
      setError("Подтвердите проверку безопасности");
      return;
    }
    if (!leadData.consent) {
      setError("Нужно согласие на обработку данных");
      return;
    }

    setSending(true);
    try {
      const response = await salesEngine.start({
        name: leadData.name,
        phone: leadData.phone,
        email: leadData.email,
        consent: leadData.consent,
        turnstileToken,
        source: "Hero Premium Form",
        quiz: quizEnabled ? quiz as SalesQuizInput : undefined,
      });

      if (!response.success) {
        throw new Error(response.message || "Ошибка отправки");
      }
      setSuccess(true);
      window.setTimeout(() => {
        router.push("/calculator");
      }, 700);
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "Сбой сети, попробуйте снова";
      setError(message);
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative mt-20 lg:mt-0"
    >
      {/* Premium frame */}
      <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] shadow-[0_40px_120px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04)]">
        {/* Inner glow top accent */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="relative overflow-hidden bg-[#090b14] p-5 md:p-6">
          <div className="mb-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setQuizEnabled((prev) => !prev)}
              className={`rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] transition-all ${quizEnabled
                  ? "border-[#00ffa3]/40 bg-[#00ffa3]/12 text-[#00ffa3]"
                  : "border-[#00ffa3]/20 bg-[#00ffa3]/8 text-white/80 hover:border-[#00ffa3]/40 hover:text-[#00ffa3]"
                }`}
            >
              {quizEnabled ? "Квиз включен" : "Дополнительно"}
            </button>
          </div>

          {success ? (
            <div className="rounded-2xl border border-[#00ffa3]/20 bg-[#00ffa3]/8 p-6 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#00ffa3]">Заявка отправлена</p>
              <p className="mt-2 text-sm text-white/75">Лид зафиксирован. Переводим вас в configurator.</p>
            </div>
          ) : (
            <form onSubmit={submitLead} className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  value={leadData.name}
                  onChange={(e) => setLeadData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Имя"
                  required
                  className="h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#00ffa3]/40"
                />
                <input
                  value={leadData.phone}
                  onChange={(e) => setLeadData((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="+7 (___) ___-__-__"
                  required
                  className="h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#00ffa3]/40"
                />
              </div>

              <input
                value={leadData.email}
                onChange={(e) => setLeadData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="Email (опционально)"
                className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#00ffa3]/40"
              />

              <AnimatePresence initial={false}>
                {quizEnabled && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid gap-3 overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-4"
                  >
                    {[
                      { key: "type", label: "Тип проекта", options: ["Объемные буквы", "Лайтбокс", "Гибкий неон"] },
                      { key: "timeline", label: "Срок", options: ["Critical (7-10 дней)", "Standard (до 21 дня)", "Планирование"] },
                      { key: "hasFacade", label: "Фото фасада", options: ["Нет, нужна фотопривязка", "Есть, пришлю в WhatsApp", "Есть макет и фасад"] },
                    ].map((field) => (
                      <div key={field.key}>
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">{field.label}</p>
                        <div className="grid gap-2 sm:grid-cols-3">
                          {field.options.map((option) => {
                            const active = quiz[field.key as keyof typeof quiz] === option;
                            return (
                              <button
                                key={option}
                                type="button"
                                onClick={() => setQuiz((prev) => ({ ...prev, [field.key]: option }))}
                                className={`rounded-lg border px-2.5 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] transition ${active
                                    ? "border-[#00ffa3]/35 bg-[#00ffa3]/12 text-[#00ffa3]"
                                    : "border-white/12 bg-white/5 text-white/60 hover:text-white"
                                  }`}
                              >
                                {option}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <label className="flex items-start gap-2.5 text-[11px] text-white/55">
                <input
                  type="checkbox"
                  checked={leadData.consent}
                  onChange={(e) => setLeadData((prev) => ({ ...prev, consent: e.target.checked }))}
                  className="mt-0.5 h-4 w-4 rounded border-white/20 bg-transparent"
                />
                Согласие на обработку персональных данных и связь по проекту.
              </label>

              <div className="min-h-[65px]">
                <TurnstileWidget onVerify={setTurnstileToken} />
              </div>

              {error && (
                <p className="rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs text-red-200">{error}</p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="btn-premium-glow group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-[11px] font-black uppercase tracking-[0.16em] text-black transition-all disabled:opacity-60"
              >
                {sending ? "Отправка..." : "Оставить заявку"}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 text-black" />
              </button>
            </form>
          )}

          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {[
              { icon: Shield, title: "Гарантия 5 лет", desc: "На все вывески" },
              { icon: Ruler, title: "Выезд 0 ₽", desc: "Замер и смета" },
              { icon: Sparkles, title: "3D-дизайн 0 ₽", desc: "Привязка к фасаду" },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-[#070910] p-3 transition-colors hover:bg-white/[0.04]">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#00ffa3]/20 bg-[#00ffa3]/10 text-[#00ffa3]">
                  <feature.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-white/80">{feature.title}</p>
                  <p className="text-[10px] text-white/40">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


    </motion.div>
  );
}

interface HeroProps {
  segment?: SegmentData;
}

// Generate stable dots (avoid hydration mismatch)
const STABLE_DOTS = Array.from({ length: 24 }, (_, i) => ({
  left: `${((i * 37 + 11) % 97)}%`,
  top: `${((i * 53 + 7) % 93)}%`,
  size: 2 + (i % 4),
  delay: (i * 0.4) % 6,
  duration: 12 + (i % 10),
}));

// ─── Main HeroSection ─────────────────────────────────────────────────────
const HeroSection = ({ segment }: HeroProps) => {
  const openModal = useModalStore((s) => s.openModal);
  const heroRef = useRef<HTMLDivElement>(null);
  const { locale } = useLanguage();

  const segmentTitle = segment ? t(locale, segment.title) : "";

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
      {STABLE_DOTS.map((dot, i) => (
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
      <div
        className="relative z-10 mx-auto max-w-[1440px] px-4 pb-12 pt-[calc(var(--header-height,5.5rem)+4rem)] sm:px-6 lg:px-8 lg:pt-[calc(var(--header-height,5.5rem)+5rem)]"
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
                {segment ? t(locale, segment.subtitle) : "Производство рекламных конструкций · Москва"}
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
              {segment ? (
                <>
                  {segmentTitle.split(" ")[0]}{" "}
                  <span
                    className="relative inline-block"
                    style={{
                      background: "linear-gradient(135deg, #00ffa3 0%, #00c8ff 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {segmentTitle.split(" ").slice(1).join(" ")}
                  </span>
                </>
              ) : (
                <>
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
                </>
              )}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-xl text-[1.05rem] leading-[1.75] text-white/55"
            >
              {segment ? t(locale, segment.description) : "Проектируем и производим объёмные буквы, световые короба, неон и крышные конструкции. Под ключ — от согласования до монтажа."}
            </motion.p>

            {/* Tags strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-7 flex flex-wrap gap-2"
            >
              {(segment ? segment.features : tags).map((tag) => (
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
              <Link
                id="hero-cta-primary"
                href="/services"
                className="group relative flex h-14 items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[#00ffa3] px-8 text-[13px] font-black uppercase tracking-[0.12em] text-black shadow-[0_0_30px_rgba(0,255,163,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#00ffa3]/90 hover:shadow-[0_0_50px_rgba(0,255,163,0.5)] active:scale-[0.97] sm:min-w-[200px]"
              >
                <span className="relative z-10">Услуги и цены</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>

              {/* Secondary CTA */}
              <button
                id="hero-cta-secondary"
                onClick={() => openModal({ context: "Скачать каталог", source: "hero_catalog" })}
                className="group flex h-14 items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-7 text-[13px] font-semibold tracking-[-0.01em] text-white/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.08] hover:text-white active:scale-[0.97] sm:min-w-[160px]"
              >
                <span>Скачать каталог</span>
                <ChevronRight className="h-4 w-4 opacity-60 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
              </button>
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
      </div>

      {/* Floating particle and premium glow button animation styles */}
      <style>{`
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); }
          33%       { transform: translateY(-18px) translateX(12px); }
          66%       { transform: translateY(14px) translateX(-10px); }
        }
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .btn-premium-glow {
          background: linear-gradient(135deg, #00ffa3 0%, #00f5a0 25%, #05c3de 50%, #7928ca 100%);
          background-size: 200% 200%;
          animation: gradient-move 4s ease infinite;
          box-shadow: 0 0 20px rgba(0, 255, 163, 0.25), 0 0 40px rgba(121, 40, 202, 0.15);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-premium-glow:hover {
          background-position: 100% 50%;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 0 30px rgba(0, 255, 163, 0.45), 0 0 60px rgba(121, 40, 202, 0.35);
        }
        .btn-premium-glow:active {
          transform: translateY(0) scale(0.98);
        }
      `}</style>
    </section>
  );
};

export { HeroSection };
export default HeroSection;