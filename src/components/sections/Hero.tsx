"use client";

import React, { useEffect, useRef } from 'react';
import { SegmentData } from '@/data/segments';

interface HeroProps {
  segment?: SegmentData;
}

function HeroSplineBackground() {
  return (
    <>
      <style jsx>{`
        .hero-background {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }
        .hero-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #0d0d18 0%, #1a1a2e 45%, #0f172a 100%);
          background-size: 400% 400%;
          animation: gradientShift 12s ease infinite;
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .hero-dots {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .dot {
          position: absolute;
          background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%);
          border-radius: 50%;
          animation: float ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(-20px) translateX(20px); }
          66% { transform: translateY(20px) translateX(-20px); }
        }
      `}</style>
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-dots">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="dot" style={{ 
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 20 + 10}s`,
            }}></div>
          ))}
        </div>
      </div>
    </>
  );
}

function ScreenshotSection({ screenshotRef }: { screenshotRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <section className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 mt-11 md:mt-12">
      <div ref={screenshotRef} className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-700/50 w-full md:w-[80%] lg:w-[70%] mx-auto">
        <div>
          <img
            src="https://cdn.sanity.io/images/s6lu43cv/production-v4/13b6177b537aee0fc311a867ea938f16416e8670-3840x2160.jpg?w=3840&h=2160&q=10&auto=format&fm=jpg"
            alt="App Screenshot"
            className="w-full h-auto block rounded-lg mx-auto"
          />
        </div>
      </div>
    </section>
  );
}

function HeroContent({ segment }: HeroProps) {
  const title = segment ? segment.title.ru : "We're Building\nCool Experiences";
  const category = segment ? segment.subtitle.ru : "AI \\\\ WEB3 \\\\ UI \\\\ 3D \\\\ MOTION";
  const description = segment ? segment.description.ru : "Crafting Awesome Stories and Killer Designs to Make Brand Stand Out";

  return (
    <div className="text-white px-4 max-w-screen-xl mx-auto w-full flex flex-col lg:flex-row justify-between items-start lg:items-center py-16">

      <div className="w-full lg:w-1/2 pr-0 lg:pr-8 mb-8 lg:mb-0">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight tracking-wide whitespace-pre-line">
          {title}
        </h1>
        <div className="text-sm text-gray-300 opacity-90 mt-4 font-mono tracking-wider">
          {category}
        </div>
      </div>

      <div className="w-full lg:w-1/2 pl-0 lg:pl-8 flex flex-col items-start">
         <p className="text-base sm:text-lg opacity-80 mb-6 max-w-md leading-relaxed">
           {description}
        </p>
        <div className="flex pointer-events-auto flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-3">
             <button className="border border-white text-white font-semibold py-2.5 sm:py-3.5 px-6 sm:px-8 rounded-full transition duration-300 w-full sm:w-auto hover:bg-white hover:text-black">
                Contact Us
            </button>
            <button className="pointer-events-auto bg-white text-black font-semibold py-2.5 sm:py-3.5 px-6 sm:px-8 rounded-full transition duration-300 hover:scale-105 flex items-center justify-center w-full sm:w-auto">
               <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-cyan-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                   <path d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z" fill="currentColor" />
               </svg>
               Get Started
            </button>
        </div>
      </div>

    </div>
  );
}

const HeroSection = ({ segment }: HeroProps) => {
  const screenshotRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (screenshotRef.current && heroContentRef.current) {
        requestAnimationFrame(() => {
          const scrollPosition = window.pageYOffset;

          if (screenshotRef.current) {
            screenshotRef.current.style.transform = `translateY(-${scrollPosition * 0.5}px)`;
          }

          const maxScroll = 400;
          const opacity = 1 - Math.min(scrollPosition / maxScroll, 1);
          if (heroContentRef.current) {
             heroContentRef.current.style.opacity = opacity.toString();
          }
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <HeroSplineBackground />
        </div>

        <div ref={heroContentRef} style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh',
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10, pointerEvents: 'none'
        }}>
          <HeroContent segment={segment} />
        </div>
      </div>

      <div className="bg-black relative z-10" style={{ marginTop: '-10vh' }}>
        <ScreenshotSection screenshotRef={screenshotRef} />
        <div className="container mx-auto px-4 py-16 text-white">
            <h2 className="text-4xl font-bold text-center mb-8">Other Content Below</h2>
             <p className="text-center max-w-xl mx-auto opacity-80">This is where additional sections of your landing page would go.</p>
        </div>
      </div>
    </div>
  );
};

export { HeroSection };
export default HeroSection;