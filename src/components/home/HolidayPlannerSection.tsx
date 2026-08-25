'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SPANISH_HOLIDAYS, HolidayItem } from '@/lib/types';
import { Calendar, ArrowRight, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function HolidayPlannerSection() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'national' | 'canarias'>('all');

  const filteredHolidays = SPANISH_HOLIDAYS.filter((h) => {
    if (activeFilter === 'national') return h.scope === 'national';
    if (activeFilter === 'canarias') return h.scope === 'canarias' || h.scope === 'national';
    return true;
  });

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/[0.01] border-t border-white/5 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-td-amber/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-td-coral/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-td-amber/10 border border-td-amber/20 text-xs text-td-amber font-bold uppercase tracking-wider mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>Planificador de Puentes y Festivos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              ¿Cuándo es el próximo <span className="td-gradient-text">puente?</span>
            </h2>
            <p className="text-td-secondary text-sm sm:text-base mt-2 max-w-xl">
              Escapadas calculadas al milímetro para viajar sin gastar días de vacaciones.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center bg-black/40 p-1.5 rounded-2xl border border-white/10 self-start md:self-auto">
            {[
              { id: 'all', label: '✨ Todos los Puentes' },
              { id: 'national', label: '🇪🇸 Toda España' },
              { id: 'canarias', label: '🌴 Canarias & Regional' },
            ].map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id as 'all' | 'national' | 'canarias')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-td-coral to-td-amber text-[#0B0F1A] shadow-lg shadow-coral-950/40 font-extrabold'
                    : 'text-td-muted hover:text-white'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Holiday Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredHolidays.map((holiday, i) => (
            <motion.div
              key={holiday.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                href={`/resultados?month=${encodeURIComponent(holiday.month)}&nights=${holiday.days}&holiday=${holiday.id}`}
                className="group h-full bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-td-coral/40 p-6 rounded-3xl flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Accent Top Gradient Glow */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-td-coral via-td-amber to-td-violet opacity-60 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Top Row: Scope & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-td-muted">
                      {holiday.scopeLabel}
                    </span>
                    {holiday.badge && (
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400">
                        {holiday.badge}
                      </span>
                    )}
                  </div>

                  {/* Holiday Title & Emoji */}
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl p-2 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                      {holiday.emoji}
                    </span>
                    <div>
                      <h3 className="text-base font-extrabold text-white group-hover:text-td-coral transition-colors leading-tight">
                        {holiday.name}
                      </h3>
                      <div className="text-xs text-td-amber font-semibold mt-0.5">
                        {holiday.dates}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Days + CTA */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-td-muted font-medium">
                    Escapada de <strong className="text-white font-bold">{holiday.days} noches</strong>
                  </span>
                  
                  <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-td-coral group-hover:text-[#0B0F1A] text-white flex items-center justify-center transition-all duration-300 shadow-md">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
