'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_TRIPS } from '@/lib/mock-data';
import { TripCombination } from '@/lib/types';
import { Sparkles, RefreshCw, X, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface SurpriseMeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userBudget: number;
  excludedCities?: string[];
}

export default function SurpriseMeModal({
  isOpen,
  onClose,
  userBudget,
  excludedCities = [],
}: SurpriseMeModalProps) {
  const [spinning, setSpinning] = useState(true);
  const [currentTrip, setCurrentTrip] = useState<TripCombination>(MOCK_TRIPS[0]);
  const [winner, setWinner] = useState<TripCombination | null>(null);

  const availableTrips =
    excludedCities.length > 0
      ? MOCK_TRIPS.filter((t) => !excludedCities.includes(t.destination.city))
      : MOCK_TRIPS;

  const eligibleTrips = availableTrips.filter((t) => t.totalPrice <= userBudget + 30);
  const pool =
    eligibleTrips.length > 0
      ? eligibleTrips
      : availableTrips.length > 0
      ? availableTrips
      : MOCK_TRIPS;

  const startRoulette = () => {
    setSpinning(true);
    setWinner(null);

    let counter = 0;
    const speed = 70;
    const totalSteps = 28;

    const interval = setInterval(() => {
      counter++;
      const randomIdx = Math.floor(Math.random() * pool.length);
      setCurrentTrip(pool[randomIdx]);

      if (counter >= totalSteps) {
        clearInterval(interval);
        // Pick best trip by TripScore
        const bestTrip = [...pool].sort((a, b) => b.tripScore - a.tripScore)[
          Math.floor(Math.random() * Math.min(2, pool.length))
        ];
        setCurrentTrip(bestTrip);
        setWinner(bestTrip);
        setSpinning(false);
      }
    }, speed);
  };

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      startRoulette();
    }, 50);

    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg td-card p-6 sm:p-8 overflow-hidden z-10 border border-white/20 shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/15 text-td-muted hover:text-white transition-colors z-20"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-td-fuchsia/15 border border-td-fuchsia/30 text-td-fuchsia text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              {spinning ? 'Buscando el destino perfecto...' : '🎉 ¡Tu escapada ideal encontrada!'}
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              {spinning ? 'Girando la ruleta...' : currentTrip.destination.city}
            </h3>
          </div>

          {/* Slot Machine Card */}
          <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/40 mb-6">
            <div className="h-56 w-full relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentTrip.destination.image}
                alt={currentTrip.destination.city}
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  spinning ? 'blur-[1px] scale-105' : 'scale-100'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131828] via-transparent to-black/30" />

              {/* Flag + City Badge */}
              <div className="absolute top-4 left-4 td-glass px-3.5 py-1.5 rounded-full flex items-center gap-2">
                <span className="text-2xl leading-none">{currentTrip.destination.flag}</span>
                <span className="font-bold text-white text-sm sm:text-base">
                  {currentTrip.destination.city}, {currentTrip.destination.country}
                </span>
              </div>

              {/* TripScore Pill */}
              <div className="absolute top-4 right-4 bg-td-emerald/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-extrabold text-white shadow-lg">
                ⭐ {currentTrip.tripScore}/100 TripScore
              </div>

              {/* Total Price Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <div className="text-xs text-td-muted uppercase font-semibold">Precio total estimado</div>
                  <div className="text-3xl font-black td-gradient-text leading-none">
                    {currentTrip.totalPrice} €
                  </div>
                </div>
                <div className="text-right text-xs text-td-secondary">
                  <div>✈️ Vuelo: {currentTrip.flightPrice} €</div>
                  <div>🏨 Hotel ({currentTrip.nights}n): {currentTrip.hotelPrice} €</div>
                </div>
              </div>
            </div>

            {/* AI Explanation / Details */}
            {!spinning && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-[#131828] border-t border-white/10 text-xs sm:text-sm text-td-secondary space-y-2"
              >
                <div className="flex items-start gap-2 text-td-amber">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <p className="italic text-white/90">{currentTrip.aiExplanation}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {currentTrip.tags.map((tag) => (
                    <span key={tag} className="td-pill text-[11px] py-0.5 px-2">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {!spinning && winner ? (
              <>
                <Link
                  href={`/viaje/${winner.id}`}
                  className="td-btn-primary flex-1 justify-center py-3.5 text-sm sm:text-base font-bold shadow-lg"
                >
                  <span>Ver Escapada Completa</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={startRoulette}
                  className="td-glass hover:bg-white/15 px-4 py-3.5 rounded-full text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Probar otra</span>
                </button>
              </>
            ) : (
              <div className="w-full py-3.5 text-center text-xs text-td-muted animate-pulse">
                Calculando la mejor combinación para tu presupuesto...
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
