"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { t, uiCopy } from "@/i18n/site";
import { motion, AnimatePresence } from "motion/react";

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { locale } = useLanguage();
  const activeTheme = resolvedTheme ?? theme ?? "light";
  const isDark = activeTheme === "dark";
  const title = isDark ? t(locale, uiCopy.themeLight) : t(locale, uiCopy.themeDark);
  const ariaLabel = isDark ? t(locale, uiCopy.switchToLight) : t(locale, uiCopy.switchToDark);

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative h-11 w-11 flex items-center justify-center rounded-xl border border-outline bg-surface-elevated text-on-surface hover:bg-surface-variant transition-all duration-[var(--motion-duration-base)] ease-[var(--motion-ease-standard)] group overflow-hidden active:scale-90"
      aria-label={ariaLabel}
      aria-pressed={isDark}
      title={title}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ y: 20, opacity: 0, rotate: 45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: -45 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="w-5 h-5 text-accent" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ y: 20, opacity: 0, rotate: 45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: -45 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-5 h-5 text-accent" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/20" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent/20" />
    </button>
  );
}
