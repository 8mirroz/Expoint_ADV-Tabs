'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

export interface AccordionItemData {
  id: string | number;
  title: string;
  imageUrl: string;
}

interface ImageAccordionProps {
  items: AccordionItemData[];
  className?: string;
  height?: string;
}

export function ImageAccordion({ 
  items, 
  className = "",
  height = "240px"
}: ImageAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [errorImages, setErrorImages] = useState<Record<string | number, boolean>>({});

  if (!items || items.length === 0) return null;

  return (
    <div 
      className={`flex flex-row items-stretch gap-1.5 w-full overflow-hidden rounded-xl ${className}`}
      style={{ height }}
    >
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        const hasError = errorImages[item.id];
        
        return (
          <div
            key={item.id}
            className={`
              relative cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
              ${isActive ? 'flex-[5]' : 'flex-1'}
            `}
            onMouseEnter={() => setActiveIndex(index)}
          >
            {/* Image with subtle zoom on hover if active */}
            <motion.div 
              className="absolute inset-0 w-full h-full"
              initial={false}
              animate={{
                scale: isActive ? 1.05 : 1,
              }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <Image
                src={hasError ? 'https://placehold.co/400x450/2d3748/ffffff?text=Image+Error' : item.imageUrl}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                onError={() => setErrorImages(prev => ({ ...prev, [item.id]: true }))}
              />
            </motion.div>

            {/* Overlays */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-40'}`}></div>
            
            {/* Border glow for active item */}
            {isActive && (
              <motion.div 
                layoutId="accordion-border"
                className="absolute inset-0 border border-jelly-mint/30 rounded-xl z-10 pointer-events-none"
              />
            )}

            {/* Vertical Title for inactive items */}
            <AnimatePresence>
              {!isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center overflow-hidden"
                >
                  <span className="text-xs font-polysans font-bold uppercase tracking-[0.3em] text-white/40 rotate-90 whitespace-nowrap">
                    {item.title}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Content for active item */}
            <div className={`absolute bottom-0 left-0 w-full p-4 transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-jelly-mint shadow-[0_0_8px_rgba(111,255,233,0.8)]" />
                <span className="text-white text-xs font-polysans font-bold uppercase tracking-wider">
                  {item.title}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
