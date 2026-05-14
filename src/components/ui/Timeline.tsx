import React from 'react';

export function Timeline({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* The Rail */}
      <div className="absolute left-[80px] top-0 bottom-0 w-px bg-outline md:left-[120px]"></div>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}

export function TimelineItem({ 
  time, 
  children, 
  className = '' 
}: { 
  time: string, 
  children: React.ReactNode, 
  className?: string 
}) {
  return (
    <div className={`relative flex flex-col md:flex-row items-start gap-4 md:gap-8 ${className}`}>
      {/* Timestamp */}
      <div className="w-[80px] md:w-[120px] shrink-0 pt-1">
        <span className="verge-mono-label text-on-surface-variant block md:text-right md:pr-4">
          {time}
        </span>
      </div>
      
      {/* Connector Dot */}
      <div className="absolute left-[76.5px] md:left-[116.5px] top-[10px] w-[7px] h-[7px] rounded-full bg-primary z-10"></div>
      
      {/* Content */}
      <div className="flex-1 w-full pl-[96px] md:pl-0">
        {children}
      </div>
    </div>
  );
}
