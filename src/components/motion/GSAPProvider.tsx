"use client";

import { useLayoutEffect } from 'react';
import gsap from '@/lib/gsap';
import { ScrollTrigger } from '@/lib/gsap';
import { motionPolicy } from '../../config/motion-policy';

export default function GSAPProvider({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    if (motionPolicy.prefersReducedMotion) {
      gsap.ticker.fps(0);
    }

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
