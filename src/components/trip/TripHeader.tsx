'use client';

import { TripCombination } from '@/lib/types';
import { Heart, Bell, Share } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser } from '@/lib/user-context';
import TripScoreBadge from '@/components/results/TripScoreBadge';

interface TripHeaderProps {
  trip: TripCombination;
}

export default function TripHeader({ trip }: TripHeaderProps) {
  const { isFavorite, toggleFavorite, openAlertModal } = useUser();
  const isFav = isFavorite(trip.id);

  const startDate = new Date(trip.outboundFlight.departure);
  const endDate = new Date(trip.returnFlight.arrival);
  
  const startDay = startDate.getDate();
  const endDay = endDate.getDate();
  const month = endDate.toLocaleDateString('es-ES', { month: 'long' });
  const year = endDate.getFullYear();

  const dateRangeString = `${startDay} - ${endDay} de ${month} ${year}`;

  return (
    <div className="relative w-full pt-28 pb-12 sm:pt-36 sm:pb-16 min-h-[380px] sm:min-h-[460px] flex flex-col justify-end items-center td-hero-bg overflow-hidden">
      
      {/* Background Destination Photo with Smooth Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <img 
          src={trip.destination.image} 
          alt={trip.destination.city} 
          className="w-full h-full object-cover filter brightness-[0.75] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-[#0B0F1A]/70 to-black/40" />
      </div>

      {/* TripScore Floating Badge (Top Right) */}
      <div className="absolute top-20 sm:top-24 right-4 sm:right-8 z-20">
        <TripScoreBadge score={trip.tripScore} size="lg" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Country & Flag Pill */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full td-glass-strong text-xs sm:text-sm font-bold text-white mb-3 shadow-lg"
        >
          <span className="text-base">{trip.destination.flag}</span>
          <span>{trip.destination.country}</span>
          {trip.hotel.isAirbnb && (
            <>
              <span className="text-white/20">|</span>
              <span className="text-rose-300 font-extrabold">🏡 Airbnb Superhost</span>
            </>
          )}
        </motion.div>
        
        {/* City Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-3 drop-shadow-2xl"
        >
          {trip.destination.city}
        </motion.h1>
        
        {/* Dates & Duration */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2 text-td-secondary text-sm sm:text-base font-semibold"
        >
          <span className="text-white font-bold">{dateRangeString}</span>
          <span className="w-1.5 h-1.5 bg-td-coral rounded-full" />
          <span>{trip.nights} noches de estancia</span>
          <span className="w-1.5 h-1.5 bg-td-coral rounded-full" />
          <span className="text-emerald-400 font-bold">
            {trip.outboundFlight.stops === 0 ? '✈️ Vuelo Directo' : '✈️ Vuelo con escala'}
          </span>
        </motion.div>

        {/* Action Buttons Row */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-2.5 mt-6"
        >
          <button 
            type="button"
            onClick={() => toggleFavorite(trip.id)}
            className={`td-glass transition-all rounded-full px-4 py-2 flex items-center gap-2 text-xs font-bold shadow-md ${
              isFav ? 'bg-td-coral/25 border-td-coral text-white' : 'hover:bg-white/10 text-white'
            }`}
          >
            <Heart className="w-4 h-4 text-td-coral" fill={isFav ? "var(--td-coral)" : "none"} />
            <span>{isFav ? 'Guardado en favoritos' : 'Guardar escapada'}</span>
          </button>

          <button 
            type="button"
            onClick={() => openAlertModal(trip)}
            className="td-glass hover:bg-white/10 transition-all rounded-full px-4 py-2 flex items-center gap-2 text-xs font-bold text-white shadow-md"
          >
            <Bell className="w-4 h-4 text-td-amber" />
            <span>Crear Alerta de Precio</span>
          </button>

          <button 
            type="button"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `Escapada a ${trip.destination.city} por ${trip.totalPrice} €`,
                  url: window.location.href,
                }).catch(() => {});
              } else {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
            className="td-glass hover:bg-white/10 transition-all rounded-full px-4 py-2 flex items-center gap-2 text-xs font-bold text-white shadow-md"
          >
            <Share className="w-4 h-4 text-td-cyan" />
            <span>Compartir</span>
          </button>
        </motion.div>
        
      </div>
    </div>
  );
}
