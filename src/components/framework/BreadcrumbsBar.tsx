'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { Home, Send, MessageCircle } from 'lucide-react';
import type { BreadcrumbItem } from './types';

interface BreadcrumbsBarProps {
  items: BreadcrumbItem[];
}

const contactActions = [
  {
    id: 'telegram',
    href: 'https://t.me/expoint_adv',
    label: 'Telegram',
    icon: Send,
    brandColor: '#229ED9',
    softGlow: 'rgba(38, 165, 228, 0.35)',
  },
  {
    id: 'whatsapp',
    href: 'https://wa.me/74950000000',
    label: 'WhatsApp',
    icon: MessageCircle,
    brandColor: '#25D366',
    softGlow: 'rgba(37, 211, 102, 0.35)',
  },
] as const;

/**
 * BreadcrumbsBar — Navigation breadcrumbs displayed below Header.
 * Includes schema.org BreadcrumbList structured data.
 * Right side: permanent phone number + proximity-morphing messenger dots.
 *
 * Proximity radius is viewport-based: ~2/3 screen width from center of each dot.
 * Dots morph into brand icons as mouse approaches and fully disappear when icon is revealed.
 */
export function BreadcrumbsBar({ items }: BreadcrumbsBarProps) {
  const [intensities, setIntensities] = useState<number[]>(() =>
    contactActions.map(() => 0)
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [proximityRadius, setProximityRadius] = useState(600);
  const contactRef = useRef<HTMLDivElement | null>(null);

  // Track scroll for sticky behavior
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate proximity radius based on viewport size
  useEffect(() => {
    const updateRadius = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // Use ~2/3 of width and ~1/3 of height as the max activation field
      setProximityRadius(Math.max(vw * 0.66, vh * 0.33));
    };
    updateRadius();
    window.addEventListener('resize', updateRadius, { passive: true });
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  // Global window-level proximity tracking so animation starts from 2/3 of screen away
  useEffect(() => {
    const handleGlobalMouseMove = (event: MouseEvent) => {
      if (!contactRef.current) return;
      const nodes = contactRef.current.querySelectorAll<HTMLAnchorElement>('[data-contact-node="true"]');
      const nextIntensities = Array.from(nodes).map((node) => {
        const rect = node.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(event.clientX - cx, event.clientY - cy);
        return Math.max(0, Math.min(1, 1 - dist / proximityRadius));
      });
      setIntensities(nextIntensities);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [proximityRadius]);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Главная',
        item: 'https://expoint-adv.ru',
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        item: `https://expoint-adv.ru${item.href}`,
      })),
    ],
  };

  return (
    <>
      <Script
        id="json-ld-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Fake spacer to maintain document flow since the bar is fixed */}
      <div className="w-full h-[136px]" aria-hidden="true" />

      {/* Fixed Breadcrumbs Bar */}
      <div 
        className={`w-full fixed left-0 right-0 z-40 transition-all duration-500 border-b border-white/[0.06] ${
          isScrolled 
            ? 'top-[4.5rem] bg-[#0A0A0A]/80 backdrop-blur-xl shadow-md' 
            : 'top-[5.5rem] bg-transparent'
        }`}
      >
        <nav
          aria-label="Breadcrumb"
          className={`max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-500 ${
            isScrolled ? 'py-3' : 'py-4'
          }`}
        >
          {/* Left: Breadcrumbs Path — white for dark bg contrast */}
          <ol className="flex items-center flex-wrap gap-1.5 text-[12px] uppercase tracking-[0.08em] text-white/50" style={{ fontFamily: 'var(--font-mono)' }}>
            <li>
              <Link
                href="/"
                className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-200"
              >
                <Home className="w-4 h-4" />
                <span>Главная</span>
              </Link>
            </li>
            {items.map((item, index) => (
              <li key={item.href} className="flex items-center gap-1.5">
                <span className="text-white/20">/</span>
                {index === items.length - 1 ? (
                  <span className="text-[13px] font-semibold tracking-[0.03em] normal-case text-primary px-2 py-0.5 rounded-[4px] bg-white/[0.06]">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>

          {/* Right: Phone (no icon, bold large) + Morphing Dot→Icon messengers */}
          <div
            ref={contactRef}
            className="flex items-center gap-5"
          >
            {/* Phone number — no icon, extra bold, larger, white for contrast */}
            <a
              href="tel:+74950000000"
              className="text-white/90 hover:text-primary transition-colors"
            >
              <span
                className="text-[18px] font-extrabold leading-none tracking-[-0.03em]"
                style={{ fontFamily: 'var(--font-header)' }}
              >
                +7 (495) 000-00-00
              </span>
            </a>

            <div className="h-4 w-px bg-white/[0.12]" />

            {/* Morphing dots: bare pulsing dots → brand icon on proximity */}
            <div className="flex items-center gap-3">
              {contactActions.map((action, index) => {
                const Icon = action.icon;
                const intensity = intensities[index] ?? 0;

                // Dot fully fades out, icon fully fades in — no overlap
                const dotOpacity = intensity < 0.15
                  ? 1
                  : intensity > 0.45
                    ? 0
                    : Math.max(0, (0.45 - intensity) / 0.3);

                const iconOpacity = intensity < 0.25
                  ? 0
                  : intensity > 0.6
                    ? 1
                    : Math.min(1, (intensity - 0.25) / 0.35);

                const scale = 1 + intensity * 0.35;
                const glowSize = intensity * 20;

                return (
                  <a
                    key={action.id}
                    data-contact-node="true"
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={action.label}
                    className="relative flex h-7 w-7 items-center justify-center transition-transform duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                    style={{
                      transform: `scale(${scale})`,
                    }}
                  >
                    {/* Bare pulsing dot (default state — fully hidden when icon shows) */}
                    <span
                      aria-hidden="true"
                      className={`absolute rounded-full ${dotOpacity > 0.05 ? 'animate-pulse' : ''}`}
                      style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: action.brandColor,
                        boxShadow: `0 0 ${6 + glowSize}px ${action.softGlow}`,
                        opacity: dotOpacity,
                        transition: 'opacity 0.3s ease, box-shadow 0.3s ease',
                        pointerEvents: 'none',
                      }}
                    />

                    {/* Brand icon (revealed on proximity — dot is gone by then) */}
                    <Icon
                      className="relative z-10 h-5 w-5"
                      style={{
                        color: action.brandColor,
                        opacity: iconOpacity,
                        filter: `drop-shadow(0 0 ${4 + glowSize}px ${action.softGlow})`,
                        transform: `scale(${0.5 + iconOpacity * 0.5})`,
                        transition: 'opacity 0.3s ease, transform 0.3s ease, filter 0.3s ease',
                      }}
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

