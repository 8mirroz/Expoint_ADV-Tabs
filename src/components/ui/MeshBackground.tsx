import React from 'react';

interface MeshBackgroundProps {
  className?: string;
  opacity?: number;
}

export function MeshBackground({ className = '', opacity = 0.4 }: MeshBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none -z-10 ${className}`}>
      {/* 
        Vercel's atmospheric mesh gradient.
        Built with multiple radial gradients to simulate the multi-stop mesh.
        Colors: Cyan, Violet, Pink, Amber, Coral, Teal.
      */}
      <div 
        className="absolute inset-0 mix-blend-normal will-change-transform"
        style={{
          opacity: opacity,
          backgroundImage: `
            radial-gradient(circle at 15% 50%, rgba(0, 124, 240, 0.25) 0%, transparent 65%),
            radial-gradient(circle at 85% 30%, rgba(121, 40, 202, 0.25) 0%, transparent 65%),
            radial-gradient(circle at 50% 80%, rgba(255, 0, 128, 0.25) 0%, transparent 65%),
            radial-gradient(circle at 80% 80%, rgba(249, 203, 40, 0.25) 0%, transparent 65%),
            radial-gradient(circle at 20% 80%, rgba(0, 223, 216, 0.25) 0%, transparent 65%)
          `,
          transform: 'scale(1.2) translateZ(0)'
        }}
      />
      {/* Optional: Add a subtle noise texture overlay if desired, currently left clean for Stark aesthetic */}
    </div>
  );
}
