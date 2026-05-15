"use client";
import { useRef } from 'react';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';
import { motion, useInView } from 'motion/react';

export default function MapSection() {
  const mapUrl = "https://yandex.ru/map-widget/v1/?mode=search&text=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D0%9F%D0%BE%D0%BB%D0%B8%D0%BC%D0%B5%D1%80%D0%BD%D0%B0%D1%8F%2C%208&z=15";
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "200px" });

  return (
    <section ref={sectionRef} className="w-full h-[50vh] min-h-[450px] relative overflow-hidden bg-surface border-y border-outline">
      {/* Full Background Map */}
      <div className="absolute inset-0 z-0">
        {isInView && (
          <iframe
            title="Яндекс Карта: Москва, Полимерная, 8"
            src={mapUrl}
            className="w-full h-full grayscale-[0.3] pointer-events-none transition-opacity duration-700 animate-in fade-in"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}
        {/* Subtle overlay to blend map edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-background/20 pointer-events-none" />
      </div>

      <div className="section-container relative h-full z-10 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="absolute top-10 md:top-12 left-6 md:left-12 max-w-sm bg-surface/90 backdrop-blur-md border border-outline p-6 rounded-[var(--radius-8)] shadow-sm pointer-events-auto"
        >
          <p className="verge-mono-label text-primary mb-3">Штаб-квартира</p>
          <h3 className="text-[24px] md:text-[28px] font-sans font-bold uppercase leading-tight text-on-surface">Москва, Полимерная 8</h3>
          <p className="verge-mono-label text-on-surface-variant mt-4">Промышленная зона «Запад»</p>
        </motion.div>
      </div>


      {/* Decorative side vignetting */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background/20 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background/20 to-transparent pointer-events-none" />
    </section>
  );
}


