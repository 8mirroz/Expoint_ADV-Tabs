"use client";

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, Home } from 'lucide-react';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="section-container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-sm font-mono font-black text-primary uppercase tracking-[0.4em] mb-6 block">
              Error 404
            </span>
            <h1 className="geist-display-lg text-[64px] md:text-[120px] leading-none font-black uppercase tracking-tighter mb-8">
              Page <br className="md:hidden" /> Missing
            </h1>
            <p className="text-on-surface-variant max-w-xl mx-auto text-lg mb-12">
              The requested resource is unavailable or has been relocated within our production cluster.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Link href="/" className="geist-button-primary h-14 px-8 w-full md:w-auto flex items-center justify-center gap-2">
                <Home className="w-4 h-4" />
                Return Home
              </Link>
              <button 
                onClick={() => window.history.back()}
                className="geist-button-secondary h-14 px-8 w-full md:w-auto flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
