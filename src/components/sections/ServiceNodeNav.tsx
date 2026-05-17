'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, X, Zap, ChevronRight } from 'lucide-react';
import { SERVICES, type Service } from '@/data/services';
import { getServiceHref } from '@/lib/utils';

/* ─── Category color mapping ─── */
const CATEGORY_MAP: Record<string, { color: string; label: string; group: string }> = {
  'volumetric-letters': { color: 'var(--category-volumetric)', label: 'Объемные буквы', group: 'Фасадная реклама' },
  'lightbox':           { color: 'var(--category-lightbox)',   label: 'Лайтбоксы',      group: 'Световые решения' },
  'flex-neon':          { color: 'var(--category-neon)',       label: 'Гибкий неон',     group: 'Световые решения' },
  'metal-letters':      { color: 'var(--category-metal)',      label: 'Нержавейка',      group: 'Фасадная реклама' },
  'pylon-signs':        { color: 'var(--category-pylon)',      label: 'Стелы',           group: 'Навигация' },
  'roof-installations': { color: 'var(--category-roof)',       label: 'Крышные',         group: 'Крупный формат' },
};

const SEGMENT_LABELS: Record<string, string> = {
  horeca: 'HoReCa',
  retail: 'Retail',
  clinics: 'Клиники',
  corporate: 'Корпоративный',
  franchise: 'Франшиза',
};

/* ─── Group services by "group" field ─── */
function groupServices(services: Service[]) {
  const groups: Record<string, Service[]> = {};
  for (const s of services) {
    const g = CATEGORY_MAP[s.id]?.group ?? 'Другое';
    if (!groups[g]) groups[g] = [];
    groups[g].push(s);
  }
  return groups;
}

/* ─── Main Component ─── */
export default function ServiceNodeNav() {
  const [query, setQuery] = useState('');
  const [activeSegment, setActiveSegment] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  /* filter */
  const filtered = useMemo(() => {
    let result = SERVICES;
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.shortDescription.toLowerCase().includes(q) ||
          s.features.some((f) => f.toLowerCase().includes(q)) ||
          (CATEGORY_MAP[s.id]?.label.toLowerCase().includes(q)) ||
          (CATEGORY_MAP[s.id]?.group.toLowerCase().includes(q))
      );
    }
    if (activeSegment) {
      result = result.filter((s) => s.segments.includes(activeSegment));
    }
    return result;
  }, [query, activeSegment]);

  const groups = useMemo(() => groupServices(filtered), [filtered]);
  const allSegments = useMemo(
    () => Array.from(new Set(SERVICES.flatMap((s) => s.segments))),
    []
  );

  const hoveredService = hoveredId ? SERVICES.find((s) => s.id === hoveredId) : null;

  /* keyboard shortcut for search */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setQuery('');
        setSearchFocused(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="space-y-10">
      {/* ═══ Google-style Search Bar ═══ */}
      <div className="relative max-w-2xl mx-auto">
        <div
          className={`
            relative flex items-center gap-3 h-14 px-5
            bg-surface border rounded-full
            transition-all duration-300
            ${searchFocused
              ? 'border-accent shadow-[0_4px_24px_rgba(0,245,160,0.12),0_0_0_1px_rgba(0,245,160,0.2)]'
              : 'border-outline shadow-elevation-2 hover:shadow-elevation-3'
            }
          `}
        >
          <Search
            className={`w-5 h-5 shrink-0 transition-colors duration-200 ${
              searchFocused ? 'text-accent' : 'text-on-surface-variant/50'
            }`}
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Найти услугу, материал или технологию..."
            className="flex-1 bg-transparent outline-none text-on-surface placeholder:text-on-surface-variant/40 text-base font-normal"
          />
          {query && (
            <button
              onClick={() => { setQuery(''); inputRef.current?.focus(); }}
              className="p-1 rounded-full hover:bg-surface-variant transition-colors"
            >
              <X className="w-4 h-4 text-on-surface-variant" />
            </button>
          )}
          <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-variant/60 border border-outline/50">
            <kbd className="text-[10px] font-mono text-on-surface-variant/60">⌘</kbd>
            <kbd className="text-[10px] font-mono text-on-surface-variant/60">K</kbd>
          </div>
        </div>

        {/* Search suggestions when focused */}
        {searchFocused && query.length > 0 && filtered.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-outline rounded-2xl shadow-elevation-4 overflow-hidden z-50">
            {filtered.slice(0, 5).map((s) => {
              const cat = CATEGORY_MAP[s.id];
              return (
                <Link
                  key={s.id}
                  href={getServiceHref(s.id)}
                  onMouseDown={(e) => e.preventDefault()}
                  className="flex items-center gap-4 px-5 py-3 hover:bg-surface-variant/50 transition-colors"
                >
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: cat?.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-on-surface truncate block">{s.title}</span>
                    <span className="text-xs text-on-surface-variant/60 truncate block">{cat?.group}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-on-surface-variant/30 shrink-0" />
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* ═══ Segment Filter Pills ═══ */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setActiveSegment(null)}
          className={`
            px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200
            ${!activeSegment
              ? 'bg-on-surface text-surface shadow-sm'
              : 'bg-surface-variant/60 text-on-surface-variant hover:bg-surface-variant border border-outline/50'
            }
          `}
        >
          Все направления
        </button>
        {allSegments.map((seg) => (
          <button
            key={seg}
            onClick={() => setActiveSegment(activeSegment === seg ? null : seg)}
            className={`
              px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200
              ${activeSegment === seg
                ? 'bg-on-surface text-surface shadow-sm'
                : 'bg-surface-variant/60 text-on-surface-variant hover:bg-surface-variant border border-outline/50'
              }
            `}
          >
            {SEGMENT_LABELS[seg] ?? seg}
          </button>
        ))}
      </div>

      {/* ═══ Node Tree + Preview Panel ═══ */}
      <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-start">
        {/* Left: Node Tree */}
        <div className="space-y-1">
          {Object.entries(groups).map(([groupName, services]) => (
            <div key={groupName} className="relative">
              {/* Group Header */}
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-3 h-3 rounded-full border-2 border-outline-strong bg-surface-variant" />
                <div className="h-px flex-1 bg-outline/50" />
                <span className="text-[11px] font-mono font-medium uppercase tracking-[0.15em] text-on-surface-variant/60">
                  {groupName}
                </span>
                <div className="h-px flex-1 bg-outline/50" />
                <span className="text-[10px] font-mono text-on-surface-variant/30">
                  {services.length}
                </span>
              </div>

              {/* Service Nodes */}
              <div className="pl-6 space-y-0.5">
                {services.map((service, idx) => {
                  const cat = CATEGORY_MAP[service.id];
                  const isHovered = hoveredId === service.id;
                  const isLast = idx === services.length - 1;

                  return (
                    <div key={service.id} className="relative flex items-stretch">
                      {/* Vertical connector line */}
                      <div className="relative w-8 shrink-0 flex flex-col items-center">
                        <div
                          className={`w-px flex-1 transition-colors duration-300 ${
                            isLast ? 'bg-transparent' : 'bg-outline/40'
                          }`}
                        />
                        <div className="absolute top-1/2 -translate-y-1/2 flex items-center">
                          {/* Node dot */}
                          <div
                            className={`
                              w-3 h-3 rounded-full border-2 transition-all duration-300
                              ${isHovered
                                ? 'scale-125 shadow-[0_0_12px_var(--node-glow)]'
                                : 'scale-100'
                              }
                            `}
                            style={{
                              borderColor: cat?.color ?? 'var(--outline)',
                              background: isHovered ? cat?.color : 'var(--surface)',
                              ['--node-glow' as string]: cat?.color,
                            }}
                          />
                        </div>
                        {/* Horizontal branch line */}
                        <div
                          className="absolute top-1/2 -translate-y-1/2 left-[calc(50%+6px)] w-4 h-px"
                          style={{ background: cat?.color ? `color-mix(in srgb, ${cat.color} 30%, var(--outline))` : 'var(--outline)' }}
                        />
                      </div>

                      {/* Node Card */}
                      <Link
                        href={getServiceHref(service.id)}
                        onMouseEnter={() => setHoveredId(service.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className={`
                          flex-1 flex items-center justify-between gap-4 px-5 py-4 my-0.5
                          rounded-xl border transition-all duration-300 group/node
                          ${isHovered
                            ? 'bg-surface shadow-elevation-3 border-outline-strong'
                            : 'bg-transparent border-transparent hover:bg-surface/60 hover:border-outline/50'
                          }
                        `}
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          {/* Color indicator */}
                          <div
                            className="w-1 h-8 rounded-full shrink-0 transition-all duration-300"
                            style={{
                              background: isHovered
                                ? cat?.color
                                : `color-mix(in srgb, ${cat?.color ?? 'var(--outline)'} 30%, var(--surface-variant))`,
                            }}
                          />
                          <div className="min-w-0">
                            <h3
                              className={`text-sm font-semibold tracking-tight transition-colors duration-200 truncate ${
                                isHovered ? 'text-on-surface' : 'text-on-surface/80'
                              }`}
                            >
                              {service.title}
                            </h3>
                            <p className="text-xs text-on-surface-variant/50 truncate mt-0.5">
                              {service.shortDescription}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          {/* Price badge */}
                          <div className="hidden sm:flex items-baseline gap-1 px-3 py-1 rounded-full bg-surface-variant/50">
                            <span className="text-xs font-bold text-on-surface tabular-nums">
                              от {service.basePrice.toLocaleString('ru-RU')}
                            </span>
                            <span className="text-[10px] text-on-surface-variant/50 font-mono">
                              {service.priceUnit}
                            </span>
                          </div>

                          <ChevronRight
                            className={`w-4 h-4 transition-all duration-300 ${
                              isHovered
                                ? 'text-on-surface translate-x-0.5'
                                : 'text-on-surface-variant/30'
                            }`}
                          />
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-surface-variant/50 flex items-center justify-center">
                <Search className="w-6 h-6 text-on-surface-variant/30" />
              </div>
              <p className="text-on-surface-variant/60 text-sm">
                Ничего не найдено по запросу «{query}»
              </p>
              <button
                onClick={() => { setQuery(''); setActiveSegment(null); }}
                className="text-accent text-xs font-semibold hover:underline"
              >
                Сбросить фильтры
              </button>
            </div>
          )}
        </div>

        {/* Right: Preview Panel */}
        <div className="hidden lg:block sticky top-32">
          <div
            className={`
              relative overflow-hidden rounded-2xl border transition-all duration-500
              ${hoveredService
                ? 'border-outline-strong bg-surface shadow-elevation-4'
                : 'border-outline/50 bg-surface-variant/30'
              }
            `}
          >
            {hoveredService ? (
              <div className="relative">
                {/* Preview Video */}
                {hoveredService.previewVideo && (
                  <div className="relative h-48 overflow-hidden">
                    <video
                      key={hoveredService.previewVideo}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                      src={hoveredService.previewVideo}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface" />
                    {/* Category badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <div
                        className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-md"
                        style={{ background: `color-mix(in srgb, ${CATEGORY_MAP[hoveredService.id]?.color} 80%, black)` }}
                      >
                        {CATEGORY_MAP[hoveredService.id]?.group}
                      </div>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-6 space-y-5">
                  <div>
                    <h3 className="text-xl font-bold text-on-surface tracking-tight leading-snug">
                      {hoveredService.title}
                    </h3>
                    <p className="text-sm text-on-surface-variant/70 mt-2 leading-relaxed">
                      {hoveredService.fullDescription}
                    </p>
                  </div>

                  {/* Tech specs mini grid */}
                  {hoveredService.technicalSpecs && (
                    <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-surface-variant/40 border border-outline/30">
                      {hoveredService.technicalSpecs.slice(0, 4).map((spec, i) => (
                        <div key={i} className="space-y-0.5">
                          <span className="text-[9px] uppercase tracking-wider text-on-surface-variant/50 font-mono block">
                            {spec.label}
                          </span>
                          <span className="text-xs font-medium text-on-surface block truncate">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Segments */}
                  <div className="flex flex-wrap gap-1.5">
                    {hoveredService.segments.map((seg) => (
                      <span
                        key={seg}
                        className="px-2.5 py-1 rounded-full bg-surface-variant/60 text-[10px] font-mono uppercase tracking-wider text-on-surface-variant/60 border border-outline/30"
                      >
                        {SEGMENT_LABELS[seg] ?? seg}
                      </span>
                    ))}
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between pt-3 border-t border-outline/30">
                    <div>
                      <span className="text-xs text-on-surface-variant/50 font-mono uppercase block">
                        от
                      </span>
                      <span className="text-2xl font-black text-on-surface tabular-nums">
                        {hoveredService.basePrice.toLocaleString('ru-RU')}
                      </span>
                      <span className="text-xs text-on-surface-variant/50 font-mono ml-1">
                        {hoveredService.priceUnit}
                      </span>
                    </div>
                    <Link
                      href={getServiceHref(hoveredService.id)}
                      className="geist-button-primary geist-button-sm flex items-center gap-2"
                    >
                      Подробнее <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              /* Empty state */
              <div className="flex flex-col items-center justify-center py-24 px-8 text-center space-y-4">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-outline/30 animate-[spin_20s_linear_infinite]" />
                  <div className="absolute inset-3 rounded-full bg-surface-variant/50 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-on-surface-variant/20" />
                  </div>
                </div>
                <p className="text-sm text-on-surface-variant/40 max-w-xs leading-relaxed">
                  Наведите на услугу для предварительного просмотра
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
