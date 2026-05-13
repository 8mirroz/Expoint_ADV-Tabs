import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './Card';
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
      variant="glass" 
      className={`group flex flex-col h-full hover:-translate-y-1 transition-all duration-700 overflow-hidden relative border-white/5 ${className}`}
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
              ? 'bg-linear-to-r from-black/95 via-black/40 to-transparent group-hover:via-black/20' 
              : 'bg-linear-to-b from-background/80 via-background/40 to-background'
          }`} />
          {isFeatured && (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,77,0,0.18),transparent_35%)] z-0" />
          )}
        </>
      )}

      <div className="relative z-10 h-full p-8 md:p-10 flex flex-col justify-between flex-1">
        <div>
          {isFeatured ? (
            <span className="bg-accent text-on-accent px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-neon">
              Премиум-категория
            </span>
          ) : (
            <div className="w-12 h-12 border border-white/10 flex items-center justify-center bg-black/30 backdrop-blur-sm mb-6">
              {icon}
            </div>
          )}
          
          <CardTitle className={`mb-3 text-white group-hover:text-accent transition-colors uppercase tracking-tight ${isFeatured ? 'text-4xl md:text-5xl font-black mt-6' : 'text-2xl font-black'}`}>
            {service.title}
          </CardTitle>
          
          <p className={`text-white/70 font-light leading-relaxed max-w-sm ${isFeatured ? 'text-base mt-4' : 'text-sm'}`}>
            {service.shortDescription}
          </p>

          {!isFeatured && (
            <ul className="space-y-2 mt-6">
              {service.features.slice(0, 3).map((feature, idx) => (
                <li key={idx} className="flex items-center text-xs text-on-surface-variant/80">
                  <span className="w-1 h-1 rounded-full bg-accent/50 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between mt-8">
          <div className={`font-mono text-accent ${isFeatured ? 'text-2xl neon-text' : 'text-lg'}`}>
            от {service.basePrice.toLocaleString('ru-RU')} {service.priceUnit}
          </div>
          
          <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:gap-4 transition-all group/btn">
            Подробнее <ArrowRight className="w-4 h-4 text-accent" />
          </button>
        </div>
      </div>
    </Card>
  );
}
