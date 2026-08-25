'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Zap, ArrowRight, Plane, Hotel, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface FlashDeal {
  id: string;
  tripId: string;
  originCode: string;
  originName: string;
  destinationCity: string;
  destinationCountry: string;
  flag: string;
  image: string;
  nights: number;
  totalPrice: number;
  originalPrice: number;
  tripScore: number;
  tags: string[];
  seatsLeft: number;
}

const FLASH_DEALS: FlashDeal[] = [
  {
    id: 'flash-1',
    tripId: 'trip-opo-002',
    originCode: 'MAD',
    originName: 'Madrid',
    destinationCity: 'Oporto',
    destinationCountry: 'Portugal',
    flag: '🇵🇹',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd81?w=800&q=80',
    nights: 3,
    totalPrice: 79,
    originalPrice: 135,
    tripScore: 98,
    tags: ['🍷 Ribeira & Vinos', '✈️ Vuelo Directo', '🏨 Hotel Boutique'],
    seatsLeft: 3,
  },
  {
    id: 'flash-2',
    tripId: 'trip-rom-004',
    originCode: 'BCN',
    originName: 'Barcelona',
    destinationCity: 'Roma',
    destinationCountry: 'Italia',
    flag: '🇮🇹',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
    nights: 3,
    totalPrice: 89,
    originalPrice: 159,
    tripScore: 96,
    tags: ['🍕 Centro Histórico', '✈️ Vuelo Directo', '🏛️ Coliseo a 600m'],
    seatsLeft: 2,
  },
  {
    id: 'flash-3',
    tripId: 'trip-agp-003',
    originCode: 'TFS',
    originName: 'Tenerife Sur',
    destinationCity: 'Málaga',
    destinationCountry: 'España',
    flag: '🇪🇸',
    image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800&q=80',
    nights: 3,
    totalPrice: 89,
    originalPrice: 145,
    tripScore: 97,
    tags: ['☀️ Costa del Sol', '✈️ Vuelo Directo', '🥐 Desayuno Buffet'],
    seatsLeft: 4,
  },
  {
    id: 'flash-4',
    tripId: 'trip-rak-006',
    originCode: 'SVQ',
    originName: 'Sevilla',
    destinationCity: 'Marrakech',
    destinationCountry: 'Marruecos',
    flag: '🇲🇦',
    image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800&q=80',
    nights: 3,
    totalPrice: 95,
    originalPrice: 165,
    tripScore: 95,
    tags: ['🌴 Riad con Piscina', '✈️ Vuelo Directo', '✨ Experiencia VIP'],
    seatsLeft: 5,
  },
];

export default function FlashDealsSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-transparent via-rose-950/10 to-transparent">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-xs font-black text-rose-400 uppercase tracking-wider mb-3">
              <Flame className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>Chollos Flash Relámpago</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Escapadas por <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-td-coral to-amber-300">menos de 99 €</span>
            </h2>
            <p className="text-td-secondary text-sm sm:text-base mt-2 max-w-xl">
              Vuelo ida y vuelta + 3 noches de hotel céntrico. Tarifas con mínimo histórico garantizado.
            </p>
          </div>

          <Link
            href="/resultados?budget=100"
            className="td-pill text-xs font-bold text-white hover:text-rose-400 flex items-center gap-2 self-start sm:self-auto py-2.5 px-5 shadow-md border-rose-500/30 group"
          >
            <span>Ver todos los chollos &lt; 99 €</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Flash Deals Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FLASH_DEALS.map((deal, i) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                href={`/viaje/${deal.tripId}`}
                className="group flex flex-col h-full bg-[#0D1220] border border-white/10 hover:border-rose-500/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-rose-950/30 transition-all duration-300 hover:-translate-y-1 relative"
              >
                {/* Image Banner */}
                <div className="h-44 w-full relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={deal.image}
                    alt={deal.destinationCity}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-[0.85]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1220] via-transparent to-black/30" />

                  {/* Top Origin -> Dest Pill */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-extrabold text-white border border-white/15 flex items-center gap-1.5">
                    <span>{deal.originCode}</span>
                    <span className="text-rose-400">→</span>
                    <span>{deal.destinationCity} {deal.flag}</span>
                  </div>

                  {/* Top Urgency Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-rose-500 text-[#0B0F1A] text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-lg shadow-rose-950/60 animate-pulse">
                    <Zap className="w-3 h-3 fill-current" />
                    <span>¡Últimas {deal.seatsLeft} plazas!</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {deal.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-bold text-td-muted bg-white/[0.04] px-2 py-0.5 rounded-md border border-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-base font-extrabold text-white group-hover:text-rose-400 transition-colors">
                      {deal.destinationCity} · {deal.nights} noches
                    </h3>
                    <p className="text-xs text-td-muted mt-0.5">
                      Salida directa desde {deal.originName}
                    </p>
                  </div>

                  {/* Price & Action Row */}
                  <div className="mt-5 pt-3 border-t border-white/5 flex items-end justify-between">
                    <div>
                      <div className="text-[10px] text-td-muted line-through font-semibold">
                        Antes {deal.originalPrice} €
                      </div>
                      <div className="text-2xl font-black text-rose-400 leading-tight">
                        {deal.totalPrice} €
                      </div>
                      <div className="text-[10px] text-td-muted font-medium">
                        Vuelo + Hotel incluido
                      </div>
                    </div>

                    <div className="w-9 h-9 rounded-2xl bg-rose-500/15 group-hover:bg-rose-500 group-hover:text-[#0B0F1A] text-rose-400 flex items-center justify-center transition-all duration-300 border border-rose-500/30">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
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
