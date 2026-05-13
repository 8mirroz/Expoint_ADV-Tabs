'use client';

import Image from 'next/image';
import { Marquee } from '../ui/marquee';

const clients = [
  { name: 'Siemens', logo: '/img/logos/mono/siemens.svg' },
  { name: 'Bosch', logo: '/img/logos/mono/bosch.svg' },
  { name: 'BMW', logo: '/img/logos/mono/bmw.svg' },
  { name: 'Mercedes', logo: '/img/logos/mono/mercedes.svg' },
  { name: 'Audi', logo: '/img/logos/mono/audi.svg' },
  { name: 'Samsung', logo: '/img/logos/mono/samsung.svg' },
  { name: 'Nike', logo: '/img/logos/mono/nike.svg' },
  { name: 'Rolex', logo: '/img/logos/mono/rolex.svg' },
  { name: 'LVMH', logo: '/img/logos/mono/lvmh.svg' },
  { name: 'Shell', logo: '/img/logos/mono/shell.svg' },
];

export default function Clients() {
  return (
    <section className="py-12 bg-surface/30 border-y border-outline overflow-hidden">
      <div className="container mx-auto px-4 mb-8 text-center">
        <p className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold mb-2">
          Наши партнеры
        </p>
        <h2 className="text-2xl md:text-3xl font-headline font-bold">
          Нам доверяют лидеры рынка
        </h2>
      </div>
      
      <div className="relative flex flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:30s] [--gap:4rem]">
          {clients.map((client) => (
            <div 
              key={client.name} 
              className="flex items-center justify-center text-on-surface grayscale opacity-45 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer"
            >
              <Image
                src={client.logo} 
                alt={client.name} 
                width={240}
                height={64}
                className="h-9 md:h-11 w-auto object-contain"
              />
            </div>
          ))}
        </Marquee>
        
        {/* Fading edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-background via-transparent to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-linear-to-l from-background via-transparent to-transparent z-10"></div>
      </div>
    </section>
  );
}
