"use client";

import { useEffect } from 'react';
import { motion } from 'motion/react';
import { RefreshCcw, AlertTriangle } from 'lucide-react';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Runtime Error:', error);
  }, [error]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
        <div className="section-container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 bg-error/10 border border-error/20 text-error rounded-full flex items-center justify-center mx-auto mb-8">
              <AlertTriangle className="w-10 h-10" />
            </div>
            
            <h1 className="geist-display-md text-3xl md:text-5xl font-black uppercase tracking-tight mb-6">
              System Interrupted
            </h1>
            <p className="text-on-surface-variant max-w-lg mx-auto mb-10">
              A technical failure occurred during request processing. Our engineers have been notified.
            </p>
            
            <button
              onClick={() => reset()}
              className="geist-button-primary h-14 px-10 flex items-center justify-center gap-2 mx-auto"
            >
              <RefreshCcw className="w-4 h-4" />
              Attempt Recovery
            </button>
            
            {error.digest && (
              <p className="mt-8 text-xs font-mono opacity-30 uppercase tracking-widest">
                Trace ID: {error.digest}
              </p>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
