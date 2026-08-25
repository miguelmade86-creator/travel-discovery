'use client';

import { useState } from 'react';
import { CarRentalInfo } from '@/lib/types';
import { Car, Check, Fuel, ShieldCheck, Sparkles, ExternalLink, Plus, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { getCarRentalAffiliateUrl } from '@/lib/affiliate';

interface CarRentalCardProps {
  rental?: CarRentalInfo;
  city: string;
  nights: number;
  pickupDate?: string;
  returnDate?: string;
  onToggleAddCar?: (added: boolean, price: number) => void;
}

export default function CarRentalCard({
  rental,
  city,
  nights,
  pickupDate,
  returnDate,
  onToggleAddCar,
}: CarRentalCardProps) {
  const [isAdded, setIsAdded] = useState(false);

  // Fallback defaults if destination doesn't have custom car data
  const carData: CarRentalInfo = rental || {
    available: true,
    company: 'DiscoverCars Partner',
    carModel: 'Fiat 500 o similar',
    carType: 'Económico 4 plazas',
    dailyRate: 14,
    totalPrice: 14 * nights,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&q=80',
    fuelPolicy: 'Lleno a lleno',
    unlimitedMileage: true,
    freeCancellation: true,
    pickupLocation: 'Terminal de Llegadas (Aeropuerto)',
  };

  const affiliateUrl = getCarRentalAffiliateUrl(city, pickupDate, returnDate);

  const handleToggle = () => {
    const nextState = !isAdded;
    setIsAdded(nextState);
    if (onToggleAddCar) {
      onToggleAddCar(nextState, carData.totalPrice);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`td-card p-6 border transition-all relative overflow-hidden ${
        isAdded
          ? 'border-emerald-500/50 bg-gradient-to-br from-emerald-950/20 via-white/[0.02] to-transparent shadow-xl shadow-emerald-950/30'
          : 'border-white/10'
      }`}
    >
      {/* Top Banner Tag */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-td-coral/15 flex items-center justify-center border border-td-coral/30">
            <Car className="w-4.5 h-4.5 text-td-coral" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-white">
                Alquiler de Coche en {city}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase">
                Opcional
              </span>
            </div>
            <p className="text-xs text-td-muted">Libertad total para recorrer la región y playas</p>
          </div>
        </div>

        {/* Price Tag */}
        <div className="text-right">
          <div className="text-xs text-td-muted">Desde</div>
          <div className="text-xl sm:text-2xl font-black td-gradient-text">
            {carData.dailyRate} € <span className="text-xs font-normal text-td-muted">/ día</span>
          </div>
        </div>
      </div>

      {/* Main Car Details & Image */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center mb-6">
        
        {/* Car Image Preview */}
        <div className="md:col-span-4 h-36 rounded-2xl overflow-hidden relative border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={carData.image}
            alt={carData.carModel}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-black/70 backdrop-blur-md text-[10px] font-bold text-white border border-white/15">
            {carData.company}
          </div>
        </div>

        {/* Features & Specs */}
        <div className="md:col-span-8 flex flex-col gap-3">
          <div>
            <h4 className="text-sm font-extrabold text-white">{carData.carModel}</h4>
            <span className="text-xs text-td-muted">{carData.carType} · {carData.pickupLocation}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-300">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{carData.fuelPolicy}</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-300">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Kilometraje ilimitado</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-300">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Cancelación gratuita</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-300">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Recogida en aeropuerto</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 border-t border-white/5">
        <div className="text-xs text-td-secondary text-center sm:text-left">
          Total {nights} noches:{' '}
          <strong className="text-white font-black text-sm">~{carData.totalPrice} €</strong>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {/* Add to Trip Toggle */}
          <button
            type="button"
            onClick={handleToggle}
            className={`flex-1 sm:flex-none px-4 py-2.5 rounded-full text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all border ${
              isAdded
                ? 'bg-emerald-500 text-[#0B0F1A] border-emerald-400 shadow-md shadow-emerald-950/40'
                : 'bg-white/5 hover:bg-white/10 text-white border-white/15'
            }`}
          >
            {isAdded ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Coche incluido (+{carData.totalPrice} €)</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 text-td-coral" />
                <span>Sumar coche al viaje (+{carData.totalPrice} €)</span>
              </>
            )}
          </button>

          {/* External Affiliate Link */}
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none td-glass hover:bg-white/10 px-4 py-2.5 rounded-full text-xs font-bold text-td-primary hover:text-white flex items-center justify-center gap-1.5 border border-white/15 transition-colors"
          >
            <span>Ver coches en DiscoverCars</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
