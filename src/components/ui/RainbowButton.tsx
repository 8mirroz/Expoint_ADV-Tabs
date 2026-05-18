"use client";

import React, { useRef, useState, useEffect, ButtonHTMLAttributes } from 'react';

export interface RainbowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function RainbowButton({ children, className = "", style = {}, ...props }: RainbowButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [rainbowOpacity, setRainbowOpacity] = useState(1);
  const wasFullyFadedRef = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      
      // Calculate closest point on the button boundary to the mouse cursor
      const x = Math.max(rect.left, Math.min(e.clientX, rect.right));
      const y = Math.max(rect.top, Math.min(e.clientY, rect.bottom));
      
      const dx = e.clientX - x;
      const dy = e.clientY - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Proximity logic with hysteresis:
      // Approaching: fades out between 50px and 10px.
      // Leaving: stays invisible up to 80px, fades back in up to 180px.
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
      
      setRainbowOpacity(opacity);
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
      className={`rainbow-btn ${className}`}
      style={{
        ...style,
        '--rainbow-opacity': rainbowOpacity,
      } as React.CSSProperties}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
