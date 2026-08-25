'use client';

import { useState } from 'react';
import { ShieldCheck, Check, ExternalLink, Plus, CheckCircle2, HeartPulse, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { getTravelInsuranceAffiliateUrl } from '@/lib/affiliate';

interface TravelInsuranceCardProps {
  country: string;
  city: string;
  nights: number;
  onToggleInsurance?: (added: boolean, price: number) => void;
}

export default function TravelInsuranceCard({
  country,
  city,
  nights,
  onToggleInsurance,
}: TravelInsuranceCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const insurancePrice = nights <= 3 ? 9 : 14;
  const affiliateUrl = getTravelInsuranceAffiliateUrl(country, nights);

  const handleToggle = () => {
    const nextState = !isAdded;
    setIsAdded(nextState);
    if (onToggleInsurance) {
      onToggleInsurance(nextState, insurancePrice);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className={`td-card p-6 border transition-all relative overflow-hidden ${
        isAdded
          ? 'border-cyan-500/50 bg-gradient-to-br from-cyan-950/20 via-white/[0.02] to-transparent shadow-xl shadow-cyan-950/30'
          : 'border-white/10'
      }`}
    >
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/15 flex items-center justify-center border border-cyan-500/30">
            <ShieldCheck className="w-4.5 h-4.5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-white">
                Seguro de Viaje IATI Escapadas
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[10px] font-black uppercase">
                Recomendado
              </span>
            </div>
            <p className="text-xs text-td-muted">Cobertura médica 24h en español + Cancelación de viaje</p>
          </div>
        </div>

        {/* Price Tag */}
        <div className="text-right">
          <div className="text-xs text-td-muted">Precio total</div>
          <div className="text-xl sm:text-2xl font-black text-cyan-400">
            {insurancePrice} € <span className="text-xs font-normal text-td-muted">/ viaje</span>
          </div>
        </div>
      </div>

      {/* Coverage Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 text-xs bg-black/25 p-4 rounded-2xl border border-white/5">
        <div className="flex items-center gap-2 text-cyan-200">
          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>Asistencia médica hasta <strong>50.000 €</strong></span>
        </div>
        <div className="flex items-center gap-2 text-cyan-200">
          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>Cobertura por pérdida o retraso de equipaje</span>
        </div>
        <div className="flex items-center gap-2 text-cyan-200">
          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>Atención telefónica 24/7 en español</span>
        </div>
        <div className="flex items-center gap-2 text-cyan-200">
          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>Reembolso por anulación de vuelo/hotel</span>
        </div>
      </div>

      {/* Action Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/5">
        <div className="text-xs text-td-secondary text-center sm:text-left">
          IATI Seguros Oficial con <strong className="text-cyan-300 font-black">5% dto. TravelDiscovery</strong>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {/* Add Toggle Button */}
          <button
            type="button"
            onClick={handleToggle}
            className={`flex-1 sm:flex-none px-4 py-2.5 rounded-full text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all border ${
              isAdded
                ? 'bg-cyan-400 text-[#0B0F1A] border-cyan-300 shadow-md shadow-cyan-950/40'
                : 'bg-white/5 hover:bg-white/10 text-white border-white/15'
            }`}
          >
            {isAdded ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Seguro añadido (+{insurancePrice} €)</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 text-cyan-400" />
                <span>Sumar seguro al viaje (+{insurancePrice} €)</span>
              </>
            )}
          </button>

          {/* External Link */}
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none td-glass hover:bg-white/10 px-4 py-2.5 rounded-full text-xs font-bold text-td-primary hover:text-white flex items-center justify-center gap-1.5 border border-white/15 transition-colors"
          >
            <span>Ver póliza en IATI</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
