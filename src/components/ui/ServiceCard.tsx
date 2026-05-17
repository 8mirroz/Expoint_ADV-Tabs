import React from 'react';
import { Card, CardTitle } from './Card';
import { Service } from '../../data/services';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getServiceHref } from '@/lib/utils';

export interface ServiceCardProps {
  service: Service;
  icon?: React.ReactNode;
  variant?: 'featured' | 'standard' | 'mini';
  className?: string;
}

export function ServiceCard({ service, icon, variant = 'standard', className }: ServiceCardProps) {
  const isFeatured = variant === 'featured';

  return (
    <Card 
      variant="story" 
      className={`group flex flex-col h-full hover:border-primary transition-all duration-300 overflow-hidden relative ${className}`}
    >
      <Link href={getServiceHref(service.id)} aria-label={service.title} className="absolute inset-0 z-30" />

      {service.previewVideo && (
        <>
          <video
            src={service.previewVideo}
            autoPlay
            loop
            muted
            playsInline
            className={`absolute inset-0 h-full w-full object-cover ${isFeatured ? 'opacity-90' : 'opacity-40'} group-hover:scale-[1.03] transition-all duration-1000`}
          />
          <div className={`absolute inset-0 z-0 transition-all duration-700 ${
            isFeatured 
              ? 'bg-gradient-to-r from-black/95 via-black/40 to-transparent group-hover:via-black/20' 
              : 'bg-gradient-to-b from-background/90 via-background/60 to-background'
          }`} />
        </>
      )}

      <div className="relative z-10 h-full p-6 lg:p-8 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="w-10 h-10 border border-outline/20 rounded-lg flex items-center justify-center bg-surface/20 backdrop-blur-md">
              {icon}
            </div>
            {isFeatured && (
              <span className="bg-primary text-on-primary px-3 py-1 text-[9px] font-mono font-black uppercase tracking-widest rounded-full">
                Premium
              </span>
            )}
          </div>
          
          <CardTitle className={`mb-3 text-white group-hover:text-primary transition-colors ${isFeatured ? 'text-3xl md:text-4xl mt-4' : 'text-xl md:text-2xl'}`}>
            {service.title}
          </CardTitle>
          
          <p className="text-white/85 text-base font-normal leading-relaxed max-w-sm">
            {service.shortDescription}
          </p>

          {/* Infographics Section */}
          <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-outline/10">
            {service.technicalSpecs?.slice(0, 4).map((spec, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <span className="text-[9px] uppercase tracking-wider text-on-surface-variant font-mono">
                  {spec.label}
                </span>
                <span className="text-xs text-on-surface font-medium truncate">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          {!isFeatured && !service.technicalSpecs && (
            <ul className="space-y-3 mt-8">
              {service.features.slice(0, 3).map((feature, idx) => (
                <li key={idx} className="flex items-center text-xs font-medium text-on-surface-variant group-hover:text-on-surface transition-colors">
                  <span className="w-1 h-1 rounded-full bg-primary mr-3" />
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6 rounded-[var(--radius-12)] border border-white/10 bg-black/55 backdrop-blur-md p-3 relative z-40">
          <div className="flex flex-col gap-3">
            <div className="min-w-0">
              <span className="block text-xs font-mono uppercase tracking-[0.2em] text-on-surface-variant/80">
                от
              </span>
              <div className="font-headline flex items-baseline gap-1.5 whitespace-nowrap">
                <span className="text-3xl font-black text-white leading-none tabular-nums whitespace-nowrap">
                  {service.basePrice.toLocaleString('ru-RU')}
                </span>
                <span className="text-xs font-mono uppercase tracking-[0.12em] text-white/50 whitespace-nowrap self-end mb-[2px]">
                  {service.priceUnit}
                </span>
              </div>
            </div>

            <div
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-8)] border border-white/90 bg-white px-4 text-xs font-mono font-black uppercase tracking-[0.1em] text-black transition-all duration-300 hover:bg-white/95 focus-visible:shadow-[0_0_0_3px_rgba(255,255,255,0.35)]"
            >
              Рассчитать <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
