'use client';

import Link from 'next/link';
import Script from 'next/script';
import { ChevronRight, Home } from 'lucide-react';
import type { BreadcrumbItem } from './types';

interface BreadcrumbsBarProps {
  items: BreadcrumbItem[];
}

/**
 * BreadcrumbsBar — Navigation breadcrumbs displayed below Header.
 * Includes schema.org BreadcrumbList structured data.
 */
export function BreadcrumbsBar({ items }: BreadcrumbsBarProps) {
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
      <nav
        aria-label="Breadcrumb"
        className="section-container pt-24 pb-4"
      >
        <ol className="flex items-center gap-1.5 text-[12px] font-mono tracking-wide">
          <li>
            <Link
              href="/"
              className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Главная</span>
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-on-surface-variant/50" />
              {index === items.length - 1 ? (
                <span className="text-on-surface font-semibold">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="text-on-surface-variant hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
