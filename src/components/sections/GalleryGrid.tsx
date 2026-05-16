'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';

interface GalleryItem {
  id: string | number;
  title: string;
  imageUrl: string;
  segment?: string;
}

interface GalleryGridProps {
  title?: string;
  subtitle?: string;
  items: GalleryItem[];
  filters?: { id: string; label: string }[];
}

const MotionImage = motion(Image);

/**
 * GalleryGrid — Filterable photo gallery with lightbox modal.
 */
export default function GalleryGrid({ title, subtitle, items, filters }: GalleryGridProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filteredItems = activeFilter === 'all'
    ? items
    : items.filter((item) => item.segment === activeFilter);

  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        {(title || subtitle) && (
          <div className="mb-12">
            {subtitle && (
              <p className="verge-kicker text-primary mb-4">{subtitle}</p>
            )}
            {title && (
              <h2 className="geist-display-xl uppercase text-on-surface max-w-3xl">
                {title}
              </h2>
            )}
          </div>
        )}

        {/* Filters */}
        {filters && filters.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-[var(--radius-8)] verge-mono-label transition-all ${
                activeFilter === 'all'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface border border-outline text-on-surface-variant hover:border-primary hover:text-primary'
              }`}
            >
              Все
            </button>
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-[var(--radius-8)] verge-mono-label transition-all ${
                  activeFilter === filter.id
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface border border-outline text-on-surface-variant hover:border-primary hover:text-primary'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.button
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.03, duration: 0.3 }}
                onClick={() => setLightboxItem(item)}
                className="group relative aspect-[4/3] overflow-hidden rounded-[var(--radius-8)] border border-outline bg-surface-variant cursor-pointer"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <p className="absolute bottom-3 left-3 right-3 text-white text-sm font-mono font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
                  {item.title}
                </p>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setLightboxItem(null)}
            >
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-50"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="relative w-[90vw] h-[85vh] flex items-center justify-center">
                <MotionImage
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.9 }}
                  src={lightboxItem.imageUrl}
                  alt={lightboxItem.title}
                  fill
                  className="object-contain rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <p className="absolute bottom-8 text-white text-center font-mono text-sm">
                {lightboxItem.title}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
