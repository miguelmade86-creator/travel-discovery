'use client';

import { useState } from 'react';
import { ActivitySuggestion } from '@/lib/types';
import { Plus, Check, ExternalLink, ShieldCheck, Car } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getFlightBookingAffiliateUrl, getBookingAffiliateUrl, getCarRentalAffiliateUrl } from '@/lib/affiliate';

interface PriceBreakdownProps {
  flightPrice: number;
  hotelPrice: number;
  totalPrice: number;
  budget: number;
  activities?: ActivitySuggestion[];
  destinationCity?: string;
  originCode?: string;
  hotelName?: string;
  carPrice?: number;
  carAdded?: boolean;
  insurancePrice?: number;
  insuranceAdded?: boolean;
}

export default function PriceBreakdown({
  flightPrice,
  hotelPrice,
  totalPrice,
  budget,
  activities,
  destinationCity = 'Europa',
  originCode = 'TFS',
  hotelName = 'Hotel',
  carPrice = 0,
  carAdded = false,
  insurancePrice = 0,
  insuranceAdded = false,
}: PriceBreakdownProps) {
  const [selectedActivities, setSelectedActivities] = useState<number[]>([]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const toggleActivity = (idx: number) => {
    setSelectedActivities((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const activitiesCost = selectedActivities.reduce((acc, idx) => {
    return acc + (activities ? activities[idx]?.price || 0 : 0);
  }, 0);

  const grandTotal = totalPrice + activitiesCost + (carAdded ? carPrice : 0) + (insuranceAdded ? insurancePrice : 0);
  const budgetPercentage = Math.min(100, Math.round((grandTotal / budget) * 100));
  const isOverBudget = grandTotal > budget;
  const barColor = isOverBudget ? 'bg-td-coral' : 'bg-td-emerald';

  const flightBookingUrl = getFlightBookingAffiliateUrl(originCode, 'DEST');
  const hotelBookingUrl = getBookingAffiliateUrl(hotelName, destinationCity);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="td-glass-strong p-6 sm:p-7 rounded-[28px] sticky top-24 shadow-2xl border border-white/15"
      >
        <h2 className="text-base font-extrabold text-white mb-5 flex items-center justify-between">
          <span>💰 Resumen de tu escapada</span>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold">
            Precio verificado
          </span>
        </h2>

        <div className="space-y-3 mb-5">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="text-td-secondary flex items-center gap-2">✈️ Vuelo ida y vuelta</span>
            <span className="font-bold text-white">{flightPrice} €</span>
          </div>
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="text-td-secondary flex items-center gap-2">🏨 Hotel céntrico (3 noches)</span>
            <span className="font-bold text-white">{hotelPrice} €</span>
          </div>

          {carAdded && (
            <div className="flex justify-between items-center text-xs sm:text-sm text-emerald-400 font-semibold pt-2 border-t border-white/5">
              <span className="flex items-center gap-1.5">🚗 Coche de alquiler</span>
              <span>+{carPrice} €</span>
            </div>
          )}

          {insuranceAdded && (
            <div className="flex justify-between items-center text-xs sm:text-sm text-cyan-300 font-semibold pt-2 border-t border-white/5">
              <span className="flex items-center gap-1.5">🛡️ Seguro de viaje IATI</span>
              <span>+{insurancePrice} €</span>
            </div>
          )}

          {selectedActivities.length > 0 && (
            <div className="flex justify-between items-center text-xs sm:text-sm text-td-amber font-semibold pt-2 border-t border-white/5">
              <span>🎟️ Actividades seleccionadas ({selectedActivities.length})</span>
              <span>+{activitiesCost} €</span>
            </div>
          )}
        </div>

        <div className="h-px w-full bg-white/10 mb-5" />

        {/* Big Total */}
        <div className="flex flex-col items-center mb-6 text-center bg-black/25 py-4 rounded-2xl border border-white/5">
          <span className="text-xs text-td-muted font-medium mb-0.5">Precio Total Estimado</span>
          <div className="text-4xl sm:text-5xl font-black tracking-tight td-gradient-text">
            {grandTotal} €
          </div>
          <span className="text-[11px] text-td-muted mt-1 font-semibold">por persona</span>
        </div>

        {/* Budget Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-td-muted">Presupuesto: {budget} €</span>
            <span className={isOverBudget ? 'text-td-coral font-bold' : 'text-td-emerald font-bold'}>
              {budgetPercentage}% del total
            </span>
          </div>
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${budgetPercentage}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`h-full rounded-full ${barColor}`}
            />
          </div>
          {isOverBudget && (
            <p className="text-[10px] text-td-coral mt-1.5 text-center">
              Supera tu presupuesto por {grandTotal - budget} €
            </p>
          )}
        </div>

        {/* Optional Activities */}
        {activities && activities.length > 0 && (
          <div className="pt-5 border-t border-white/10 mb-6">
            <h3 className="text-xs font-bold text-td-secondary uppercase tracking-wider mb-3">
              Añadir al viaje (Opcional)
            </h3>
            <div className="space-y-2">
              {activities.slice(0, 2).map((act, idx) => {
                const isSelected = selectedActivities.includes(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleActivity(idx)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-td-amber/15 border-td-amber/40 text-white'
                        : 'bg-white/[0.03] border-white/5 text-td-secondary hover:bg-white/[0.07]'
                    }`}
                  >
                    <div className="flex flex-col pr-2">
                      <span className="text-xs font-bold truncate max-w-[170px]">{act.name}</span>
                      <span className="text-[10px] text-td-muted">+{act.price} € · ⭐ {act.rating}/10</span>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        isSelected ? 'bg-td-amber text-[#0B0F1A]' : 'bg-white/10 text-white'
                      }`}
                    >
                      {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CTA Button */}
        <button
          onClick={() => setIsBookingModalOpen(true)}
          className="w-full td-btn-primary justify-center text-base py-4 font-extrabold shadow-xl shadow-coral-950/40"
        >
          <span>Reservar Esta Escapada</span>
          <ExternalLink className="w-4 h-4" />
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-td-muted mt-3 text-center">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Redirección directa y segura a aerolínea y hotel</span>
        </div>
      </motion.div>

      {/* Booking Provider Links Modal */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md td-card p-6 sm:p-8 z-10 border border-white/20 shadow-2xl space-y-6"
            >
              <div className="text-center">
                <div className="text-4xl mb-2">✈️ + 🏨</div>
                <h3 className="text-2xl font-extrabold text-white">
                  Reserva tu Escapada a {destinationCity}
                </h3>
                <p className="text-xs text-td-secondary mt-1">
                  Te enviamos a los proveedores oficiales con las fechas exactas ya configuradas:
                </p>
              </div>

              <div className="space-y-3">
                {/* Step 1: Flight */}
                <a
                  href={flightBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-td-coral/40 hover:bg-white/10 transition-all flex items-center justify-between group block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-td-coral/15 flex items-center justify-center text-lg">
                      ✈️
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-td-coral transition-colors">
                        Paso 1: Reservar Vuelo ({flightPrice} €)
                      </h4>
                      <p className="text-[11px] text-td-muted">Vuelo directo ida y vuelta verificado</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-td-muted group-hover:text-white" />
                </a>

                {/* Step 2: Hotel */}
                <a
                  href={hotelBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-td-amber/40 hover:bg-white/10 transition-all flex items-center justify-between group block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-td-amber/15 flex items-center justify-center text-lg">
                      🏨
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-td-amber transition-colors">
                        Paso 2: Reservar Hotel ({hotelPrice} €)
                      </h4>
                      <p className="text-[11px] text-td-muted">{hotelName} · Cancelación gratis</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-td-muted group-hover:text-white" />
                </a>
              </div>

              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="td-glass hover:bg-white/10 w-full py-3 rounded-full text-xs font-bold text-td-secondary hover:text-white transition-colors"
              >
                Cerrar
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
