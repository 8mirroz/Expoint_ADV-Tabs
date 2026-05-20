'use client';

import Image from 'next/image';
import { Marquee } from '../ui/marquee';

const clients = [
  { name: 'Siemens', logo: '/img/logos/mono/siemens.svg' },
  { name: 'Bosch', logo: '/img/logos/mono/bosch.svg' },
  { name: 'BMW', logo: '/img/logos/mono/bmw.svg' },
  { name: 'Mercedes-Benz', logo: '/img/logos/mono/mercedes.svg' },
  { name: 'Audi', logo: '/img/logos/mono/audi.svg' },
  { name: 'Porsche', logo: '/img/logos/mono/porsche.svg' },
  { name: 'Ferrari', logo: '/img/logos/mono/ferrari.svg' },
  { name: 'Tesla', logo: '/img/logos/mono/tesla.svg' },
  { name: 'Samsung', logo: '/img/logos/mono/samsung.svg' },
  { name: 'Nike', logo: '/img/logos/mono/nike.svg' },
  { name: 'Rolex', logo: '/img/logos/mono/rolex.svg' },
  { name: 'LVMH', logo: '/img/logos/mono/lvmh.svg' },
  { name: 'Shell', logo: '/img/logos/mono/shell.svg' },
];

export default function Clients() {
  return (
    <section className="py-24 bg-black border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 mb-20 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50 font-bold mb-4 opacity-50">
          Наши партнеры
        </p>
        <h2 className="text-xl md:text-2xl font-headline font-bold text-white/90 tracking-tight">
          Нам доверяют лидеры рынка
        </h2>
      </div>
      
      <div className="relative flex flex-col items-center justify-center overflow-hidden">
        <Marquee className="[--duration:60s] [--gap:3rem] md:[--gap:10rem]">
          {clients.map((client) => (
            <div 
              key={client.name} 
              className="flex items-center justify-center px-8 transition-opacity duration-500"
            >
              <div className="relative h-16 md:h-20 w-auto">
                <Image
                  src={client.logo} 
                  alt={client.name} 
                  width={240}
                  height={80}
                  unoptimized
                  className="h-full w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-500 brightness-0 invert"
                />
              </div>
            </div>
          ))}
        </Marquee>
        
        {/* Premium Fading edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-black via-black/80 to-transparent z-20"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-black via-black/80 to-transparent z-20"></div>
      </div>
    </section>
  );
}
