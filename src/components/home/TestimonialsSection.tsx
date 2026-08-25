'use client';

import { motion } from 'framer-motion';
import { MOCK_TESTIMONIALS } from '@/lib/content-data';
import { Quote } from 'lucide-react';

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/[0.01] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-td-coral/10 border border-td-coral/20 text-td-coral text-xs font-bold uppercase tracking-wider mb-4">
            💬 Historias Reales
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Viajeros que ya se han escapado con <span className="td-gradient-text">TravelDiscovery</span>
          </h2>
          <p className="text-td-secondary max-w-2xl mx-auto text-sm sm:text-base">
            Gente de Canarias que decidió poner un presupuesto cerrado y dejarse sorprender.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {MOCK_TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className="td-card p-6 sm:p-8 flex flex-col justify-between relative group"
            >
              <Quote className="w-8 h-8 text-white/10 absolute top-6 right-6 group-hover:text-td-coral/20 transition-colors" />

              <div>
                {/* Destination & Price Tag */}
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white mb-6">
                  <span>{t.flag}</span>
                  <span>{t.destination}</span>
                  <span className="text-td-muted">•</span>
                  <span className="td-gradient-text font-bold">{t.price} € total</span>
                  <span className="text-td-muted">({t.nights}n)</span>
                </div>

                {/* Quote */}
                <p className="text-td-primary text-sm sm:text-base leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* User info */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="w-11 h-11 rounded-full overflow-hidden border border-white/15 relative shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white leading-snug">{t.name}</span>
                  <span className="text-xs text-td-muted">{t.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
