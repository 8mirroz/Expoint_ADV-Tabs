"use client";

import { useLayoutEffect } from 'react';
import gsap from '@/lib/gsap';
import { ScrollTrigger } from '@/lib/gsap';

export default function GSAPProvider({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    // Global GSAP configuration for premium feel
    gsap.config({
      nullTargetWarn: false,
    });

    // Refresh ScrollTrigger on window resize to prevent layout shifts
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <>{children}</>;
}
