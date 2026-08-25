'use client';

import { HotelInfo } from '@/lib/types';
import { Star, MapPin, Check, Coffee, ExternalLink, Home, Utensils, Key } from 'lucide-react';
import { motion } from 'framer-motion';
import { getBookingAffiliateUrl, getAirbnbSearchUrl } from '@/lib/affiliate';

interface HotelCardProps {
  hotel: HotelInfo;
  nights: number;
  checkIn: string;
  checkOut: string;
  destinationCity?: string;
}

export default function HotelCard({ hotel, nights, checkIn, checkOut, destinationCity }: HotelCardProps) {
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  const isAirbnb = hotel.isAirbnb || hotel.type === 'apartment';
  
  const partnerUrl = isAirbnb
    ? getAirbnbSearchUrl(destinationCity || 'Oporto', checkIn, checkOut)
    : getBookingAffiliateUrl(hotel.name, destinationCity || 'Barcelona', checkIn, checkOut);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`td-card overflow-hidden border ${isAirbnb ? 'border-rose-500/30' : 'border-white/10'}`}
    >
      <div className="h-48 sm:h-56 w-full relative">
        <img 
          src={hotel.image} 
          alt={hotel.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131828] via-transparent to-transparent"></div>
        
        {/* Rating or Superhost Badge */}
        <div className="absolute top-4 right-4 bg-[#131828]/90 backdrop-blur-md rounded-2xl px-3 py-1.5 flex flex-col items-center border border-white/15 shadow-xl">
          <span className="text-base font-black text-white">{hotel.rating}</span>
          <span className="text-[10px] text-td-coral font-bold uppercase tracking-wider">{hotel.ratingLabel}</span>
        </div>

        {/* Top Left Property Type Pill */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 shadow-lg ${
            isAirbnb
              ? 'bg-rose-500 text-white'
              : 'bg-td-coral text-[#0B0F1A]'
          }`}>
            {isAirbnb ? <Home className="w-3.5 h-3.5" /> : <span>🏨</span>}
            <span>{isAirbnb ? 'Apartamento Airbnb' : 'Hotel recomendado'}</span>
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col gap-1 mb-4">
          {!isAirbnb && hotel.stars > 0 && (
            <div className="flex items-center gap-1 text-td-amber">
              {[...Array(hotel.stars)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
          )}
          
          <h2 className="text-xl sm:text-2xl font-black text-white">{hotel.name}</h2>
          
          <div className="flex items-center gap-4 text-xs text-td-muted mt-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-td-coral" />
              <span>{hotel.distanceFromCenter}</span>
            </span>
            <span>·</span>
            <span>{hotel.reviewCount.toLocaleString('es-ES')} opiniones de viajeros</span>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {isAirbnb && (
            <div className="flex items-center gap-1.5 bg-rose-500/10 text-rose-300 border border-rose-500/25 rounded-full px-3 py-1 text-xs font-bold">
              <Utensils className="w-3 h-3 text-rose-400" />
              <span>🍳 Cocina privada equipada</span>
            </div>
          )}

          {isAirbnb && (
            <div className="flex items-center gap-1.5 bg-white/5 text-white border border-white/10 rounded-full px-3 py-1 text-xs font-semibold">
              <Key className="w-3 h-3 text-td-amber" />
              <span>🔑 Entrada autónoma</span>
            </div>
          )}

          {hotel.freeCancellation && (
            <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-full px-3 py-1 text-xs font-bold">
              <Check className="w-3 h-3 text-emerald-400" />
              <span>✅ Cancelación flexible</span>
            </div>
          )}

          {hotel.breakfastIncluded && (
            <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded-full px-3 py-1 text-xs font-bold">
              <Coffee className="w-3 h-3 text-amber-400" />
              <span>🥐 Desayuno incluido</span>
            </div>
          )}
        </div>

        {/* Price & Action Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
          <div>
            <div className="text-xs text-td-muted mb-1">
              {nights} noches ({formatDate(checkIn)} - {formatDate(checkOut)})
            </div>
            <div className="text-base font-bold text-white">
              {isAirbnb ? '🏡 Estancia estimada:' : '🏨 Estancia estimada:'}{' '}
              <span className="font-black text-xl td-gradient-text">{hotel.totalPrice} €</span>
            </div>
            <div className="text-[11px] text-td-muted mt-0.5">
              (~{hotel.nightlyRate} € / noche)
            </div>
          </div>
          
          <a 
            href={partnerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-all rounded-full px-6 py-3 text-xs font-extrabold flex items-center gap-2 w-full sm:w-auto justify-center shadow-lg ${
              isAirbnb
                ? 'bg-rose-500 hover:bg-rose-400 text-white shadow-rose-950/40'
                : 'td-btn-primary shadow-coral-950/40'
            }`}
          >
            <span>{isAirbnb ? 'Ver apartamento en Airbnb' : 'Ver hotel en Booking'}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
