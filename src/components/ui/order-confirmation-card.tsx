'use client'

import * as React from "react";
import { motion, AnimatePresence, Variants } from "motion/react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface OrderConfirmationCardProps {
  orderId: string;
  paymentMethod: string;
  dateTime: string;
  totalAmount: string;
  onGoToAccount: () => void;
  title?: string;
  buttonText?: string;
  icon?: React.ReactNode;
  className?: string;
  details?: { label: string; value: string; isBold?: boolean }[];
}

export const OrderConfirmationCard: React.FC<OrderConfirmationCardProps> = ({
  orderId,
  paymentMethod,
  dateTime,
  totalAmount,
  onGoToAccount,
  title = "Заказ успешно оформлен",
  buttonText = "Вернуться в личный кабинет",
  icon,
  className,
  details: customDetails,
}) => {
  const defaultDetails = [
    { label: "Номер заказа", value: orderId },
    { label: "Способ оплаты", value: paymentMethod },
    { label: "Дата и время", value: dateTime },
    { label: "Итоговая сумма", value: totalAmount, isBold: true },
  ];

  const details = customDetails || defaultDetails;

  // Neon glowing circular success indicator
  const defaultIcon = (
    <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
      <CheckCircle2 className="h-10 w-10 text-[#00aa6c] animate-pulse" />
      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00aa6c]/20 flex items-center justify-center border border-[#00aa6c]/30">
        <Sparkles className="w-2.5 h-2.5 text-[#00aa6c]" />
      </div>
    </div>
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 120, damping: 15 } },
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        aria-live="polite"
        className={cn(
          "relative w-full max-w-md rounded-2xl border border-outline bg-surface backdrop-blur-xl text-on-surface shadow-premium p-6 sm:p-8 overflow-hidden",
          className
        )}
      >
        {/* Subtle upper background radial glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#00aa6c]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col items-center space-y-6 text-center relative z-10">
          {/* Success Icon */}
          <motion.div variants={itemVariants} className="pt-2">
            {icon || defaultIcon}
          </motion.div>

          {/* Title */}
          <motion.h2 
            variants={itemVariants} 
            className="text-xl sm:text-2xl font-bold tracking-tight text-on-surface"
            style={{ fontFamily: 'var(--font-header)' }}
          >
            {title}
          </motion.h2>

          {/* Order Details Section */}
          <motion.div variants={itemVariants} className="w-full space-y-4 pt-4">
            {details.map((item, index) => (
              <div
                key={item.label}
                className={cn(
                  "flex items-center justify-between border-b border-outline/70 pb-3.5 text-sm text-on-surface-variant font-mono",
                  index === details.length - 1 ? "border-none pb-0" : "",
                  item.isBold ? "font-bold text-on-surface border-outline/90" : ""
                )}
              >
                <span className="text-xs uppercase tracking-wider text-on-surface-variant/75 font-mono">{item.label}</span>
                <span className={cn("text-on-surface", item.isBold ? "text-lg text-[#00aa6c] font-bold" : "")}>
                  {item.value}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Action Button */}
          <motion.div variants={itemVariants} className="w-full pt-4">
            <Button
              onClick={onGoToAccount}
              variant="outline"
              className="w-full h-12 text-sm font-semibold rounded-xl border border-outline hover:border-primary bg-surface hover:bg-surface-variant text-on-surface cursor-pointer select-none transition-all"
            >
              {buttonText}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
