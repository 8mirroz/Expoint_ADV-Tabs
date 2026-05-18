'use client'

import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export interface HoverBorderGradientProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  containerClassName?: string
  className?: string
}

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  ...props
}: HoverBorderGradientProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const wasFullyFadedRef = useRef(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      
      const x = Math.max(rect.left, Math.min(e.clientX, rect.right));
      const y = Math.max(rect.top, Math.min(e.clientY, rect.bottom));
      
      const dx = e.clientX - x;
      const dy = e.clientY - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // High-performance Proximity Hysteresis (80px - 180px leaving)
      let opacity = 1;
      if (wasFullyFadedRef.current) {
        if (distance <= 80) {
          opacity = 0;
        } else if (distance >= 180) {
          opacity = 1;
          wasFullyFadedRef.current = false;
        } else {
          opacity = (distance - 80) / (180 - 80);
        }
      } else {
        if (distance <= 10) {
          opacity = 0;
          wasFullyFadedRef.current = true;
        } else if (distance >= 50) {
          opacity = 1;
        } else {
          opacity = (distance - 10) / (50 - 10);
        }
      }
      
      buttonRef.current.style.setProperty('--hover-border-opacity', opacity.toString());
    };

    const supportsHover = window.matchMedia('(hover: hover)').matches;
    if (supportsHover) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <button
      ref={buttonRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative p-[1.5px] overflow-hidden rounded-full flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.97] cursor-pointer",
        containerClassName
      )}
      {...props}
    >
      {/* Rotating Conic Gradient Light Sweep */}
      <div 
        className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite]"
        style={{
          background: isHovered
            ? 'conic-gradient(from 0deg, transparent 20%, #00ffa3 40%, #7928ca 60%, transparent 80%)'
            : 'conic-gradient(from 0deg, transparent 25%, #00ffa3 45%, #7928ca 65%, transparent 85%)',
          opacity: isHovered ? 1 : 'calc(var(--hover-border-opacity, 1) * 0.85)',
          transition: 'background 0.5s ease',
        }}
      />

      {/* Solid inner core masking the center of the gradient */}
      <div
        className={cn(
          "relative z-10 w-full h-full rounded-full bg-linear-to-b from-[#18181c] to-[#0c0c0e] border border-white/[0.04] flex items-center justify-center text-white px-5 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
          className
        )}
      >
        {children}
      </div>
    </button>
  )
}

export default function HoverBorderDemo() {
  return (
    <HoverBorderGradient>
      <span>Emerald UI Components</span>
    </HoverBorderGradient>
  )
}
