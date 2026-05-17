'use client';

import React, { useEffect, useRef, useState } from 'react';

interface MeshBackgroundProps {
  className?: string;
  opacity?: number;
}

export function MeshBackground({ className = '', opacity = 0.4 }: MeshBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseInside, setIsMouseInside] = useState(false);
  
  // Target coordinates of the mouse (normalized to 0-1 range)
  const targetCoords = useRef({ x: 0.5, y: 0.5 });
  // Interpolated current coordinates for smooth easing (lerp)
  const currentCoords = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    // If the device does not support hover (mobile), disable mousemove to save resources
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) return;

    const handleMouseEnter = () => {
      setIsMouseInside(true);
    };

    const handleMouseLeave = () => {
      setIsMouseInside(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Ensure spotlight is visible when mouse moves in
      setIsMouseInside(true);
      
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      targetCoords.current = { x, y };
    };

    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationFrameId: number;

    const updatePosition = () => {
      // Easing interpolation (lerp factor 0.08 yields smooth lagging spotlight effect)
      const dx = targetCoords.current.x - currentCoords.current.x;
      const dy = targetCoords.current.y - currentCoords.current.y;
      
      // Stop calculations if difference is negligible
      if (Math.abs(dx) > 0.0001 || Math.abs(dy) > 0.0001) {
        currentCoords.current.x += dx * 0.08;
        currentCoords.current.y += dy * 0.08;
        
        if (containerRef.current) {
          containerRef.current.style.setProperty('--mouse-x', `${(currentCoords.current.x * 100).toFixed(2)}%`);
          containerRef.current.style.setProperty('--mouse-y', `${(currentCoords.current.y * 100).toFixed(2)}%`);
        }
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none -z-10 ${className}`}
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '50%',
      } as React.CSSProperties}
    >
      <style>{`
        @keyframes ambient-drift {
          0% { transform: scale(1.15) translate(0px, 0px) rotate(0deg); }
          33% { transform: scale(1.25) translate(25px, -40px) rotate(3deg); }
          66% { transform: scale(1.15) translate(-15px, 20px) rotate(-1.5deg); }
          100% { transform: scale(1.15) translate(0px, 0px) rotate(0deg); }
        }
        .animate-ambient-drift {
          animation: ambient-drift 28s ease-in-out infinite;
        }
      `}</style>

      {/* 
        Premium drifting atmospheric background (Drifts slow on GPU using @keyframes)
      */}
      <div 
        className="absolute inset-0 mix-blend-normal will-change-transform animate-ambient-drift"
        style={{
          opacity: opacity,
          backgroundImage: `
            radial-gradient(circle at 15% 50%, rgba(0, 124, 240, 0.22) 0%, transparent 60%),
            radial-gradient(circle at 85% 30%, rgba(121, 40, 202, 0.22) 0%, transparent 60%),
            radial-gradient(circle at 50% 80%, rgba(255, 0, 128, 0.20) 0%, transparent 65%),
            radial-gradient(circle at 80% 80%, rgba(249, 203, 40, 0.18) 0%, transparent 60%),
            radial-gradient(circle at 20% 80%, rgba(0, 223, 216, 0.20) 0%, transparent 60%)
          `,
          transform: 'scale(1.15) translateZ(0)'
        }}
      />

      {/* 
        Premium Interactive Spotlight.
        Uses a soft teal-to-blue glow that flows gracefully following the mouse cursor.
        Fades out automatically with a smooth transition when the mouse leaves the viewport.
      */}
      <div 
        className="absolute inset-0 mix-blend-screen pointer-events-none will-change-transform transition-opacity duration-700"
        style={{
          opacity: isMouseInside ? 0.65 : 0,
          backgroundImage: `radial-gradient(circle 380px at var(--mouse-x) var(--mouse-y), rgba(0, 245, 160, 0.11) 0%, rgba(0, 124, 240, 0.04) 50%, transparent 100%)`,
        }}
      />
    </div>
  );
}
