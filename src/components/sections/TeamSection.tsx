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
    <section className="section-padding bg-surface">
      <div className="section-container">
        {(title || subtitle) && (
          <div className="mb-16">
            {subtitle && (
              <p className="verge-kicker text-primary mb-4">{subtitle}</p>
            )}
            {title && (
              <h2 className="font-headline text-[36px] md:text-[52px] lg:text-[64px] uppercase leading-[0.85] text-on-surface max-w-3xl">
                {title}
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
              className="bg-background rounded-[var(--radius-12)] border border-outline overflow-hidden group hover:shadow-md transition-shadow"
            >
              {/* Photo / Placeholder */}
              <div className="relative aspect-[4/5] bg-surface-variant flex items-center justify-center overflow-hidden">
                {member.imageUrl ? (
                  <Image
                    src={member.imageUrl}
                    alt={typeof member.name === 'string' ? member.name : ''}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                ) : (
                  <User className="w-16 h-16 text-on-surface-variant/30" />
                )}
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="font-sans font-bold text-[16px] text-on-surface">
                  {member.name}
                </h3>
                <p className="verge-mono-label text-primary mt-1">
                  {member.role}
                </p>
                <p className="mt-3 text-[13px] leading-[1.7] text-on-surface-variant">
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
