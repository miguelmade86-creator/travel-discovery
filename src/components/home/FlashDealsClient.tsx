'use client';

import { motion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { TripCombination } from '@/lib/types';

interface FlashDealsClientProps {
  deals: TripCombination[];
}

export default function FlashDealsClient({ deals }: FlashDealsClientProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {deals.map((deal, i) => (
        <motion.div
          key={deal.id}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
        >
          <Link
            href={`/viaje/${deal.id}`}
            className="group flex flex-col h-full bg-[#0D1220] border border-white/10 hover:border-rose-500/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-rose-950/30 transition-all duration-300 hover:-translate-y-1 relative"
          >
            {/* Image Banner */}
            <div className="h-44 w-full relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={deal.destination.image}
                alt={deal.destination.city}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-[0.85]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1220] via-transparent to-black/30" />

              {/* Top Origin -> Dest Pill */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-extrabold text-white border border-white/15 flex items-center gap-1.5">
                <span>{deal.outboundFlight.origin.code}</span>
                <span className="text-rose-400">→</span>
                <span>{deal.destination.city} {deal.destination.flag}</span>
              </div>

              {/* Top Urgency Badge */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-rose-500 text-[#0B0F1A] text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-lg shadow-rose-950/60 animate-pulse">
                <Zap className="w-3 h-3 fill-current" />
                <span>⚡ ¡Tarifa en vivo!</span>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                    {deal.outboundFlight.airline}
                  </span>
                  <span className="text-[10px] font-bold text-td-muted bg-white/[0.04] px-2 py-0.5 rounded-md border border-white/5">
                    {deal.outboundFlight.stops === 0 ? '✈️ Directo' : '✈️ Vuelo'}
                  </span>
                  <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                    ⭐ {deal.tripScore}/100
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-white group-hover:text-rose-400 transition-colors">
                  {deal.destination.city} · {deal.nights} noches
                </h3>
                <p className="text-xs text-td-muted mt-0.5">
                  Vuelo ida y vuelta desde {deal.outboundFlight.origin.code} + Hotel
                </p>
              </div>

              {/* Pricing Footer */}
              <div className="pt-4 mt-4 border-t border-white/5 flex items-end justify-between">
                <div>
                  <p className="text-[10px] text-td-muted uppercase font-bold tracking-wider">Precio Cerrado</p>
                  <p className="text-2xl font-black text-rose-400">
                    {deal.totalPrice} €
                  </p>
                  <p className="text-[10px] text-td-muted">Vuelo + Hotel incluido</p>
                </div>

                <div className="w-9 h-9 rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:bg-rose-500 group-hover:text-[#0B0F1A] transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
