"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const dayNames = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

interface DeliveryCalendarProps {
  onDateChange?: (dates: { readiness: Date; delivery: Date }) => void;
}

export function DeliveryCalendar({ onDateChange }: DeliveryCalendarProps) {
  // Default delivery is 7 days from now
  const [selectedOffset, setSelectedOffset] = useState(7);
  
  const now = React.useMemo(() => new Date(), []);
  const currentMonthName = React.useMemo(() => now.toLocaleString("ru-RU", { month: "long" }), [now]);
  const currentYear = now.getFullYear();

  // Calculate dates based on offset
  const readyDate = React.useMemo(() => {
    const d = new Date(now);
    d.setDate(now.getDate() + selectedOffset - 2);
    return d;
  }, [now, selectedOffset]);
  
  const deliveryDate = React.useMemo(() => {
    const d = new Date(now);
    d.setDate(now.getDate() + selectedOffset);
    return d;
  }, [now, selectedOffset]);

  // Notify parent of initial dates
  useEffect(() => {
    onDateChange?.({
      readiness: readyDate,
      delivery: deliveryDate
    });
  }, [onDateChange, readyDate, deliveryDate]);

  const firstDayOfMonth = new Date(currentYear, now.getMonth(), 1);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = new Date(currentYear, now.getMonth() + 1, 0).getDate();

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(currentYear, now.getMonth(), day);
    const diffTime = clickedDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Minimum 7 days for delivery (5 production + 2 delivery)
    if (diffDays >= 6) {
      setSelectedOffset(diffDays);
      const newDelivery = clickedDate;
      const newReady = new Date(currentYear, now.getMonth(), day - 2);
      onDateChange?.({
        readiness: newReady,
        delivery: newDelivery
      });
    }
  };

  const renderCalendarDays = () => {
    const days: React.ReactNode[] = [];
    
    // Headers
    dayNames.forEach(name => (
      days.push(
        <div key={`header-${name}`} className="flex h-8 w-8 items-center justify-center text-[10px] font-bold text-white/30 uppercase">
          {name}
        </div>
      )
    ));

    // Fill empty days
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8" />);
    }

    // Fill actual days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, now.getMonth(), i);
      const isToday = date.toDateString() === now.toDateString();
      const isReady = date.toDateString() === readyDate.toDateString();
      const isDelivery = date.toDateString() === deliveryDate.toDateString();
      const isPast = date < now && !isToday;
      
      // Selectable if it's at least 6 days from today (allowing some buffer)
      const diffDays = (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
      const isSelectable = !isPast && diffDays >= 5;

      days.push(
        <button
          key={`day-${i}`}
          type="button"
          disabled={!isSelectable && !isReady}
          onClick={() => handleDayClick(i)}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-xl text-xs font-medium transition-all duration-300",
            isToday && "bg-white/10 text-white ring-1 ring-white/20",
            isReady && "bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]",
            isDelivery && "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] scale-110 z-10",
            !isReady && !isDelivery && isSelectable && "text-white/80 hover:bg-white/10 hover:text-white",
            !isReady && !isDelivery && !isSelectable && "text-white/10 cursor-default",
            isPast && "opacity-0 pointer-events-none"
          )}
        >
          {i}
        </button>
      );
    }
    return days;
  };

  return (
    <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] p-8 transition-all duration-500 hover:border-indigo-500/40">
      {/* Background Glow */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/5 blur-[100px] transition-all duration-500 group-hover:bg-indigo-500/10" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-emerald-500/5 blur-[100px] transition-all duration-500 group-hover:bg-emerald-500/10" />
      
      <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 border border-white/10 mb-4">
             <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
             <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Production Pipeline</span>
          </div>
          
          <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">
            График <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">выполнения</span>
          </h2>
          
          <p className="mt-4 max-w-md text-sm text-white/40 leading-relaxed font-light">
            Выберите удобную дату доставки в календаре. 
            Система автоматически забронирует производственный слот для вашего заказа.
          </p>
          
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="group/item relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-5 transition-all hover:bg-white/[0.05]">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
                   <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                   </svg>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">Дата готовности</span>
              </div>
              <p className="text-2xl font-black text-white">
                {readyDate.toLocaleDateString("ru-RU", { day: 'numeric', month: 'long' })}
              </p>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-indigo-500 transition-all duration-500 group-hover/item:w-full" />
            </div>
            
            <div className="group/item relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-5 transition-all hover:bg-white/[0.05]">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                   <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                   </svg>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">Дата доставки</span>
              </div>
              <p className="text-2xl font-black text-white">
                {deliveryDate.toLocaleDateString("ru-RU", { day: 'numeric', month: 'long' })}
              </p>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-emerald-500 transition-all duration-500 group-hover/item:w-full" />
            </div>
          </div>
        </div>

        <div className="relative flex-shrink-0 lg:ml-auto">
          <div className="rounded-[32px] border border-white/10 bg-black/40 p-3 backdrop-blur-xl shadow-2xl">
            <div 
              className="rounded-[24px] border border-white/5 bg-gradient-to-b from-white/[0.05] to-transparent p-6"
              style={{ boxShadow: "inset 0 2px 10px rgba(255,255,255,0.05)" }}
            >
              <div className="mb-6 flex items-center justify-between px-2">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white/30 uppercase tracking-widest mb-1">Месяц</span>
                  <span className="text-lg font-black text-white capitalize">
                    {currentMonthName} <span className="text-white/20 font-light">{currentYear}</span>
                  </span>
                </div>
                <div className="flex -space-x-2">
                   <div className="h-8 w-8 rounded-full border-2 border-black bg-indigo-500 flex items-center justify-center text-[10px] font-bold text-white">G</div>
                   <div className="h-8 w-8 rounded-full border-2 border-black bg-emerald-500 flex items-center justify-center text-[10px] font-bold text-white">D</div>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {renderCalendarDays()}
              </div>
            </div>
          </div>
          
          {/* Decorative tag */}
          <div className="absolute -top-4 -right-4 rotate-12 rounded-lg bg-indigo-500 px-3 py-1 text-[10px] font-black uppercase text-white shadow-xl shadow-indigo-500/40">
             Express Slot
          </div>
        </div>
      </div>
    </div>
  );
}
