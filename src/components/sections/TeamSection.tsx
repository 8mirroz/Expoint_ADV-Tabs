'use client';

import { motion } from 'motion/react';
import { User } from 'lucide-react';
import Image from 'next/image';

interface TeamMemberItem {
  id: string;
  name: string;
  role: string;
  description: string;
  imageUrl?: string;
}

interface TeamSectionProps {
  title?: string;
  subtitle?: string;
  members: TeamMemberItem[];
}

/**
 * TeamSection — Team members grid with photo cards.
 */
export default function TeamSection({ title, subtitle, members }: TeamSectionProps) {
  return (
    <section className="section-padding bg-surface relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute inset-0 z-0 opacity-[0.01] bg-[url('/img/patterns/grid.svg')] bg-[length:30px_30px] pointer-events-none" />
      
      <div className="section-container relative z-10">
        {(title || subtitle) && (
          <div className="mb-20 text-center md:text-left">
            {subtitle && (
              <p className="verge-mono-label text-primary mb-6">{subtitle}</p>
            )}
            {title && (
              <h2 className="geist-display-lg md:text-4xl lg:text-[48px] text-on-surface">
                {title}.
              </h2>
            )}
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative bg-background border border-outline/50 overflow-hidden group hover:shadow-xl transition-all duration-500 rounded-sm"
            >
              {/* HUD Accents */}
              <div className="absolute top-0 right-0 w-6 h-6 border-r border-t border-primary/0 group-hover:border-primary/40 transition-all duration-500 z-20" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-l border-b border-primary/0 group-hover:border-primary/40 transition-all duration-500 z-20" />

              {/* Photo / Placeholder */}
              <div className="relative aspect-[4/5] bg-surface-variant flex items-center justify-center overflow-hidden">
                {member.imageUrl ? (
                  <Image
                    src={member.imageUrl}
                    alt={typeof member.name === 'string' ? member.name : ''}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                ) : (
                  <User className="w-16 h-16 text-on-surface-variant/30" />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Info */}
              <div className="p-8 relative z-10">
                <h3 className="font-sans font-bold text-lg text-on-surface tracking-tight">
                  {member.name}
                </h3>
                <p className="verge-mono-label text-primary mt-2 text-xs uppercase tracking-widest">
                  {member.role}
                </p>
                <div className="h-px w-0 group-hover:w-full bg-primary/20 transition-all duration-700 my-4" />
                <p className="text-sm leading-[1.6] text-on-surface-variant font-light line-clamp-3">
                  {member.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
