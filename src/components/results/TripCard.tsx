'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Bell, Ticket, TrendingDown, EyeOff, Scale, Wallet, ArrowRight, Home } from 'lucide-react';
import { TripCombination } from '@/lib/types';
import TripScoreBadge from './TripScoreBadge';
import { useUser } from '@/lib/user-context';

interface TripCardProps {
  trip: TripCombination;
  index: number;
  onExcludeCity?: (cityName: string) => void;
  onToggleCompare?: (trip: TripCombination) => void;
  isComparing?: boolean;
}

export default function TripCard({
  trip,
  index,
  onExcludeCity,
  onToggleCompare,
  isComparing,
}: TripCardProps) {
  const { isFavorite, toggleFavorite, openAlertModal } = useUser();
  const isFav = isFavorite(trip.id);
  const isAirbnb = trip.hotel.isAirbnb || trip.hotel.type === 'apartment';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`td-card group overflow-hidden flex flex-col h-full relative shadow-xl transition-all ${
        isComparing ? 'border-td-amber ring-2 ring-td-amber/30' : 'hover:border-td-coral/40'
      }`}
    >
      {/* Top Image Section */}
      <div className="relative h-52 w-full overflow-hidden shrink-0">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-108"
          style={{ backgroundImage: `url(${trip.destination.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131828] via-transparent to-black/30" />
        
        {/* Badges Overlay */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 items-start">
          <div className="td-glass-strong px-3 py-1.5 rounded-full flex items-center gap-2 shadow-md">
            <span className="text-xl leading-none">{trip.destination.flag}</span>
            <span className="font-bold text-white text-sm">{trip.destination.city}</span>
          </div>

          {/* Hopper-Style Price Trend Indicator */}
          {trip.priceTrend === 'lowest' && (
            <div className="bg-emerald-500/90 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-black text-[#0B0F1A] rounded-full flex items-center gap-1 shadow-lg">
              <TrendingDown className="w-3 h-3 text-[#0B0F1A]" />
              <span>Mínimo Histórico</span>
            </div>
          )}

          {trip.priceDropped && (
            <div className="bg-red-500/90 backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-bold text-white rounded-full flex items-center gap-1 shadow-md">
              🔥 Bajó {trip.previousPrice ? trip.previousPrice - trip.totalPrice : 25} €
            </div>
          )}
        </div>
        
        {/* TripScore Ring */}
        <div className="absolute top-3.5 right-3.5 z-10">
          <TripScoreBadge score={trip.tripScore} />
        </div>

        {/* Waynabox Discard Button (Top Right hover) */}
        {onExcludeCity && (
          <button
            onClick={() => onExcludeCity(trip.destination.city)}
            className="absolute bottom-3 right-3 td-glass px-2.5 py-1 rounded-full text-[10px] text-td-muted hover:text-red-400 hover:bg-red-500/20 transition-all opacity-0 group-hover:opacity-100 flex items-center gap-1"
            title="Ya conozco esta ciudad (ocultar)"
          >
            <EyeOff className="w-3 h-3" />
            <span>Ya la conozco</span>
          </button>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow gap-4">
        
        {/* Price Header */}
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black td-gradient-text">
              {trip.totalPrice} €
            </span>
            <span className="text-xs text-td-muted font-medium">/ persona todo incl.</span>
            {trip.previousPrice && (
              <span className="text-sm text-td-muted line-through ml-1">
                {trip.previousPrice} €
              </span>
            )}
          </div>
          
          {/* Triad Breakdown: Flight + Accommodation */}
          <div className="flex flex-col gap-1.5 text-xs text-td-secondary mt-2 bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5">
                <span>✈️</span>
                <strong className="text-white">Vuelo ida/vuelta</strong>
                <span className="text-td-muted">({trip.outboundFlight.airline})</span>
              </span>
              <span className="font-bold text-white">{trip.flightPrice} €</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5 truncate pr-2">
                {isAirbnb ? (
                  <>
                    <Home className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <strong className="text-rose-300">Airbnb</strong>
                    <span className="text-td-muted truncate">({trip.hotel.ratingLabel})</span>
                  </>
                ) : (
                  <>
                    <span>🏨</span>
                    <strong className="text-white">Hotel {trip.hotel.stars}★</strong>
                    <span className="text-td-muted truncate">({trip.hotel.ratingLabel})</span>
                  </>
                )}
              </span>
              <span className="font-bold text-white">{trip.hotelPrice} €</span>
            </div>
          </div>
        </div>

        {/* Destination Pocket Cost Badge */}
        {trip.destinationCost && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-1.5 flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5" />
              <span>Gasto en destino:</span>
            </span>
            <span className="text-white font-extrabold">~{trip.destinationCost.dailyAverage} € / día</span>
          </div>
        )}

        {/* LuckyTrip 3rd Pillar: Curated Activity Included / Suggested */}
        {trip.curatedActivity && (
          <div className="bg-td-amber/10 border border-td-amber/20 rounded-xl p-2.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 min-w-0 pr-2">
              <Ticket className="w-4 h-4 text-td-amber shrink-0" />
              <div className="truncate">
                <span className="text-td-muted text-[10px] block uppercase font-bold">Experiencia top sugerida:</span>
                <span className="font-semibold text-white truncate block">{trip.curatedActivity.name}</span>
              </div>
            </div>
            <span className="font-bold text-td-amber shrink-0">+{trip.curatedActivity.price} €</span>
          </div>
        )}

        {/* Details Pill Row */}
        <div className="grid grid-cols-2 gap-2 text-xs text-td-secondary td-glass p-2.5 rounded-xl">
          <div className="flex flex-col">
            <span className="text-[10px] text-td-muted uppercase tracking-wider font-semibold">Estancia</span>
            <span className="font-bold text-white">{trip.nights} noches</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-td-muted uppercase tracking-wider font-semibold">Vuelo</span>
            <span className="font-bold text-white">
              {trip.outboundFlight.stops === 0 ? 'Directo' : `${trip.outboundFlight.stops} escala(s)`}
            </span>
          </div>
        </div>

        {/* Feature Tags */}
        <div className="flex flex-wrap gap-1.5">
          {trip.tags.map((tag) => (
            <span key={tag} className="td-pill text-[10px] py-0.5 px-2">
              {tag}
            </span>
          ))}
        </div>

        {/* AI Explanation Quote */}
        <div className="text-[11px] text-td-secondary/80 italic flex gap-2 items-start mt-auto pt-3 border-t border-white/5">
          <span className="text-td-amber shrink-0 text-sm leading-none">💡</span>
          <p className="leading-snug">{trip.aiExplanation}</p>
        </div>
      </div>

      {/* Action Buttons Zone */}
      <div className="p-5 pt-0 mt-auto flex items-center gap-2.5">
        
        {/* Primary Booking Call To Action Button */}
        <Link 
          href={`/viaje/${trip.id}`} 
          className="td-btn-primary flex-1 justify-center py-3 text-xs sm:text-sm font-black shadow-xl shadow-coral-950/50 flex items-center gap-2 group transition-all"
        >
          <span>Ver Escapada</span>
          <ArrowRight className="w-4 h-4 text-[#0B0F1A] group-hover:translate-x-1 transition-transform" />
        </Link>
        
        {/* Utilities Dock Capsule */}
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/10 shrink-0">
          
          {/* Compare Button */}
          {onToggleCompare && (
            <button
              type="button"
              onClick={() => onToggleCompare(trip)}
              className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all ${
                isComparing 
                  ? 'bg-td-amber text-[#0B0F1A] shadow-md' 
                  : 'text-td-muted hover:text-white hover:bg-white/10'
              }`}
              title={isComparing ? 'Seleccionado para comparar' : 'Comparar cara a cara'}
            >
              <Scale className="w-4 h-4" />
            </button>
          )}

          {/* Favorite Heart Button */}
          <button 
            type="button"
            onClick={() => toggleFavorite(trip.id)}
            className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all ${
              isFav 
                ? 'bg-td-coral/20 text-td-coral border border-td-coral/40' 
                : 'text-td-muted hover:text-white hover:bg-white/10'
            }`}
            aria-label="Guardar en favoritos"
            title={isFav ? "Guardado en favoritos" : "Guardar en favoritos"}
          >
            <motion.div whileTap={{ scale: 0.75 }}>
              <Heart 
                className="w-4 h-4" 
                fill={isFav ? "var(--td-coral)" : "none"} 
                color={isFav ? "var(--td-coral)" : "currentColor"} 
              />
            </motion.div>
          </button>

          {/* Price Alert Bell Button */}
          <button 
            type="button"
            onClick={() => openAlertModal(trip)}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-td-muted hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Crear alerta de precio"
            title="Avisarme si baja de precio"
          >
            <Bell className="w-4 h-4" />
          </button>

        </div>
      </div>
    </motion.div>
  );
}
