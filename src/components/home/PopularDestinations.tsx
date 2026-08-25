'use client';

import { POPULAR_DESTINATIONS } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Compass, Star } from 'lucide-react';

export default function PopularDestinations() {
  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-td-coral/10 border border-td-coral/20 text-xs text-td-coral font-bold uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5" />
              Destinos Estrella · Vuelo + Hotel
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Escapadas más deseadas <span className="td-gradient-text">de toda España</span>
            </h2>
            <p className="text-td-secondary text-sm sm:text-base mt-2 max-w-xl">
              Precios cerrados calculados con vuelos directos y hoteles céntricos de alta puntuación.
            </p>
          </div>

          <Link
            href="/resultados"
            className="td-pill text-xs font-bold text-white hover:text-td-coral flex items-center gap-2 self-start sm:self-auto py-2.5 px-5 shadow-md group"
          >
            <span>Explorar los 12 destinos</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {POPULAR_DESTINATIONS.map((dest, i) => (
            <motion.div
              key={dest.city}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
            >
              <Link
                href={`/resultados?budget=${dest.from + 40}&resident=true`}
                className="relative h-80 rounded-[28px] overflow-hidden group block border border-white/10 shadow-xl td-glass-card-hover"
              >
                {/* Background Image with Zoom on Hover */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={dest.image}
                  alt={dest.city}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-[0.8]"
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-[#0B0F1A]/40 to-black/20 group-hover:from-[#0B0F1A]/95 transition-all duration-300" />

                {/* Top Badge: Flag + City */}
                <div className="absolute top-4 left-4 td-glass px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold text-white shadow-lg">
                  <span className="text-base">{dest.flag}</span>
                  <span>{dest.city}</span>
                </div>

                {/* Top Right: BudgetTrips-style Circular Action Arrow Button */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-80 group-hover:opacity-100 group-hover:bg-td-coral group-hover:text-[#0B0F1A] group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <ArrowUpRight className="w-4 h-4" />
                </div>

                {/* Bottom Card Content */}
                <div className="absolute bottom-4 left-4 right-4 p-4 td-glass-strong rounded-2xl border border-white/15 transition-transform duration-300 group-hover:-translate-y-1">
                  
                  {/* Star Rating Display */}
                  <div className="flex items-center gap-1 text-amber-400 mb-1.5">
                    {[...Array(4)].map((_, idx) => (
                      <Star key={idx} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                    <Star className="w-3 h-3 text-amber-400/50" />
                    <span className="text-[10px] text-td-muted ml-1 font-semibold">4.8 (1.2k+ viajeros)</span>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-lg font-extrabold text-white group-hover:text-td-coral transition-colors">
                        {dest.city}
                      </h3>
                      <p className="text-[11px] text-td-muted">Vuelo directo + 3 noches hotel</p>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] text-td-muted uppercase font-bold tracking-wider">desde</p>
                      <p className="text-2xl font-black td-gradient-text leading-none">
                        {dest.from} €
                      </p>
                    </div>
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
