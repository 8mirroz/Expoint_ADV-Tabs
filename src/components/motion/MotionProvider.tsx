"use client";
import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motionPolicy } from '../../config/motion-policy';

gsap.registerPlugin(ScrollTrigger);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  // Global motion configuration - no local Lenis init here, handled by SmoothScroll.tsx
  useEffect(() => {
    // If user prefers reduced motion, disable everything
    if (motionPolicy.prefersReducedMotion) {
      gsap.ticker.fps(0);
      return;
    }
  }, []);

  return <>{children}</>;
}
