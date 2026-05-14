import React from 'react';
import { Card, CardTitle } from './Card';
import { Service } from '../../data/services';
import { ArrowRight } from 'lucide-react';

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
          
          <p className="text-on-surface-variant text-sm font-light leading-relaxed max-w-sm">
            {service.shortDescription}
          </p>

          {/* Infographics Section */}
          <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-outline/10">
            {service.technicalSpecs?.slice(0, 4).map((spec, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <span className="text-[9px] uppercase tracking-wider text-on-surface-variant font-mono">
                  {spec.label}
                </span>
                <span className="text-[11px] text-on-surface font-medium truncate">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          {!isFeatured && !service.technicalSpecs && (
            <ul className="space-y-3 mt-8">
              {service.features.slice(0, 3).map((feature, idx) => (
                <li key={idx} className="flex items-center text-[11px] font-medium text-on-surface-variant group-hover:text-on-surface transition-colors">
                  <span className="w-1 h-1 rounded-full bg-primary mr-3" />
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between mt-12">
          <div className="font-headline text-3xl text-on-surface flex items-baseline gap-1">
            <span className="text-primary">{service.basePrice.toLocaleString('ru-RU')}</span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant">
              {service.priceUnit}
            </span>
          </div>
          
          <button className="flex items-center gap-2 text-[11px] font-mono font-black uppercase tracking-[1.1px] text-on-surface hover:text-primary transition-all group/btn">
            В РАЗДЕЛ <ArrowRight className="w-4 h-4 text-primary group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </Card>
  );
}
