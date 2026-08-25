'use client';

import { FlightLeg } from '@/lib/types';
import { Plane, Clock, Backpack, Briefcase, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { getFlightBookingAffiliateUrl } from '@/lib/affiliate';

interface FlightCardProps {
  outbound: FlightLeg;
  returnFlight: FlightLeg;
  price: number;
}

export default function FlightCard({ outbound, returnFlight, price }: FlightCardProps) {
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  const flightUrl = getFlightBookingAffiliateUrl(
    outbound.origin.code,
    outbound.destination.code,
    outbound.departure,
    returnFlight.departure
  );

  const renderFlightLeg = (leg: FlightLeg, type: 'Ida' | 'Vuelta') => (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center text-sm">
        <span className="font-semibold text-td-secondary uppercase tracking-wider">{type} • {formatDate(leg.departure)}</span>
        <span className="text-td-muted">{leg.airline} - {leg.flightNumber}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-center">
          <div className="text-2xl font-bold">{formatTime(leg.departure)}</div>
          <div className="text-td-muted text-sm">{leg.origin.code}</div>
        </div>

        <div className="flex-1 px-4 flex flex-col items-center">
          <div className="text-xs text-td-muted mb-1 flex items-center gap-1">
            <Clock className="w-3 h-3" /> {leg.duration}
          </div>
          <div className="w-full flex items-center">
            <div className="h-px bg-white/20 flex-1 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-td-card px-2">
                {leg.stops === 0 ? (
                  <span className="text-[10px] text-td-emerald border border-td-emerald/30 bg-td-emerald/10 rounded-full px-2 py-0.5 whitespace-nowrap font-bold">
                    Directo
                  </span>
                ) : (
                  <span className="text-[10px] text-td-coral border border-td-coral/30 bg-td-coral/10 rounded-full px-2 py-0.5 whitespace-nowrap font-bold">
                    {leg.stops} escala{leg.stops > 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>
            <Plane className="w-4 h-4 text-td-secondary ml-2" />
          </div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold">{formatTime(leg.arrival)}</div>
          <div className="text-td-muted text-sm">{leg.destination.code}</div>
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs bg-white/5 rounded-lg p-2.5 mt-2">
        {leg.checkedBagIncluded ? (
          <div className="flex items-center gap-1.5 text-td-primary">
            <Briefcase className="w-4 h-4 text-td-amber" />
            <span>🧳 Maleta incluida</span>
          </div>
        ) : leg.cabinBagIncluded ? (
          <div className="flex items-center gap-1.5 text-td-primary">
            <Backpack className="w-4 h-4 text-td-cyan" />
            <span>🎒 Solo equipaje de mano</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-td-muted">
            <Backpack className="w-4 h-4" />
            <span>Sin equipaje incluido</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="td-card p-6"
    >
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Plane className="w-5 h-5 text-td-coral" />
        Vuelos
      </h2>

      {renderFlightLeg(outbound, 'Ida')}
      
      <div className="my-6 border-t border-dashed border-white/10 relative">
        <div className="absolute top-1/2 -left-8 -translate-y-1/2 w-4 h-4 bg-td-deep rounded-full border border-white/10"></div>
        <div className="absolute top-1/2 -right-8 -translate-y-1/2 w-4 h-4 bg-td-deep rounded-full border border-white/10"></div>
      </div>

      {renderFlightLeg(returnFlight, 'Vuelta')}

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
        <div className="text-lg">
          ✈️ Vuelo ida y vuelta: <span className="font-bold text-td-coral">{price} €</span>
        </div>
        <a 
          href={flightUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="td-btn-primary rounded-full px-6 py-2.5 text-xs font-bold flex items-center gap-2 shadow-lg"
        >
          <span>Buscar vuelos oficiales ({price} €)</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}
