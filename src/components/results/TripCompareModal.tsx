'use client';

import { TripCombination } from '@/lib/types';
import { X, Trophy, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface TripCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripA?: TripCombination;
  tripB?: TripCombination;
}

export default function TripCompareModal({
  isOpen,
  onClose,
  tripA,
  tripB,
}: TripCompareModalProps) {
  if (!isOpen || !tripA || !tripB) return null;

  // Winner calculation
  const winner = tripA.tripScore >= tripB.tripScore ? tripA : tripB;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#0C101C] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 my-auto text-white overflow-hidden"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-td-muted hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-td-amber/15 border border-td-amber/30 text-xs font-extrabold text-td-amber uppercase tracking-wider mb-2">
              <Trophy className="w-3.5 h-3.5" />
              Duelo Cara a Cara
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">
              {tripA.destination.city} <span className="text-td-muted font-normal text-xl">vs</span> {tripB.destination.city}
            </h2>
            <p className="text-xs sm:text-sm text-td-secondary mt-1">
              Comparamos TripScore, precios, vuelos y hoteles para ayudarte a decidir
            </p>
          </div>

          {/* Split Compare Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            
            {/* TRIP A CARD */}
            <div className={`p-5 rounded-2xl border transition-all ${
              winner.id === tripA.id ? 'bg-white/[0.04] border-td-coral/40 shadow-xl' : 'bg-white/[0.02] border-white/10'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{tripA.destination.flag}</span>
                  <div>
                    <h3 className="text-lg font-black text-white">{tripA.destination.city}</h3>
                    <span className="text-xs text-td-muted">{tripA.destination.country}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-black td-gradient-text">{tripA.totalPrice} €</div>
                  <div className="text-[10px] text-td-muted">Vuelo + Hotel ({tripA.nights}n)</div>
                </div>
              </div>

              {/* Metrics Table */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-td-muted">TripScore Global</span>
                  <span className="font-extrabold text-emerald-400">{tripA.tripScore} / 100</span>
                </div>

                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-td-muted">Vuelo</span>
                  <span className="font-semibold text-white">
                    {tripA.outboundFlight.airline} ({tripA.outboundFlight.duration}, {tripA.outboundFlight.stops === 0 ? 'Directo' : 'Escala'})
                  </span>
                </div>

                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-td-muted">Hotel & Valoración</span>
                  <span className="font-semibold text-white">
                    {tripA.hotel.stars}★ ({tripA.hotel.rating}/10)
                  </span>
                </div>

                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-td-muted">Desayuno Buffet</span>
                  <span className="font-semibold text-white">
                    {tripA.hotel.breakfastIncluded ? '✅ Incluido' : '❌ No incluido'}
                  </span>
                </div>

                {tripA.destinationCost && (
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-td-muted">Gasto Diario en Ciudad</span>
                    <span className="font-semibold text-white">~{tripA.destinationCost.dailyAverage} € / día</span>
                  </div>
                )}
              </div>

              <Link
                href={`/viaje/${tripA.id}`}
                className="mt-5 w-full td-btn-primary py-2.5 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <span>Elegir {tripA.destination.city}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* TRIP B CARD */}
            <div className={`p-5 rounded-2xl border transition-all ${
              winner.id === tripB.id ? 'bg-white/[0.04] border-td-coral/40 shadow-xl' : 'bg-white/[0.02] border-white/10'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{tripB.destination.flag}</span>
                  <div>
                    <h3 className="text-lg font-black text-white">{tripB.destination.city}</h3>
                    <span className="text-xs text-td-muted">{tripB.destination.country}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-black td-gradient-text">{tripB.totalPrice} €</div>
                  <div className="text-[10px] text-td-muted">Vuelo + Hotel ({tripB.nights}n)</div>
                </div>
              </div>

              {/* Metrics Table */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-td-muted">TripScore Global</span>
                  <span className="font-extrabold text-emerald-400">{tripB.tripScore} / 100</span>
                </div>

                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-td-muted">Vuelo</span>
                  <span className="font-semibold text-white">
                    {tripB.outboundFlight.airline} ({tripB.outboundFlight.duration}, {tripB.outboundFlight.stops === 0 ? 'Directo' : 'Escala'})
                  </span>
                </div>

                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-td-muted">Hotel & Valoración</span>
                  <span className="font-semibold text-white">
                    {tripB.hotel.stars}★ ({tripB.hotel.rating}/10)
                  </span>
                </div>

                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-td-muted">Desayuno Buffet</span>
                  <span className="font-semibold text-white">
                    {tripB.hotel.breakfastIncluded ? '✅ Incluido' : '❌ No incluido'}
                  </span>
                </div>

                {tripB.destinationCost && (
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-td-muted">Gasto Diario en Ciudad</span>
                    <span className="font-semibold text-white">~{tripB.destinationCost.dailyAverage} € / día</span>
                  </div>
                )}
              </div>

              <Link
                href={`/viaje/${tripB.id}`}
                className="mt-5 w-full td-btn-primary py-2.5 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <span>Elegir {tripB.destination.city}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

          {/* AI Verdict Summary Banner */}
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-td-violet/10 via-td-coral/10 to-transparent border border-white/10 flex items-center gap-3">
            <Zap className="w-5 h-5 text-td-amber shrink-0" />
            <div className="text-xs text-td-secondary">
              <strong className="text-white">Veredicto TravelDiscovery:</strong> Si buscas gastar lo mínimo con el mejor clima,{' '}
              <strong className="text-td-coral">{winner.destination.city}</strong> lidera por precio y confort (TripScore: {winner.tripScore}/100).
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
