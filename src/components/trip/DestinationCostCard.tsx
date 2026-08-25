'use client';

import { useState } from 'react';
import { DestinationCost } from '@/lib/types';
import { Wallet, Coffee, Beer, Utensils, Bus, Sparkles } from 'lucide-react';

interface DestinationCostCardProps {
  cost?: DestinationCost;
  city: string;
  nights: number;
  tripBasePrice: number;
}

type SpendingStyle = 'budget' | 'standard' | 'luxury';

export default function DestinationCostCard({
  cost,
  city,
  nights,
  tripBasePrice,
}: DestinationCostCardProps) {
  const [style, setStyle] = useState<SpendingStyle>('standard');

  if (!cost) return null;

  const styleMultiplier = style === 'budget' ? 0.75 : style === 'standard' ? 1 : 1.6;
  const estimatedDaily = Math.round(cost.dailyAverage * styleMultiplier);
  const totalDestinationSpend = estimatedDaily * nights;
  const grandTotalTripCost = tripBasePrice + totalDestinationSpend;

  return (
    <div className="td-card p-6 border border-white/10 relative overflow-hidden">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center border border-emerald-500/30">
            <Wallet className="w-4.5 h-4.5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">
              ¿Cuánto te gastarás en {city}?
            </h3>
            <p className="text-xs text-td-muted">Índice real de coste de vida en destino</p>
          </div>
        </div>

        {/* Style Selector Tabs */}
        <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/10 self-start sm:self-auto">
          {[
            { id: 'budget', label: '🎒 Mochilero' },
            { id: 'standard', label: '✨ Estándar' },
            { id: 'luxury', label: '👑 Disfrutón' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStyle(tab.id as SpendingStyle)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                style === tab.id
                  ? 'bg-emerald-500 text-[#0B0F1A] shadow-md shadow-emerald-950/40'
                  : 'text-td-muted hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing Index Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 flex items-center gap-2.5">
          <Beer className="w-4 h-4 text-td-amber shrink-0" />
          <div>
            <div className="text-[10px] text-td-muted uppercase font-bold">Cerveza / Caña</div>
            <div className="text-sm font-extrabold text-white">~{(cost.beerPrice * (style === 'luxury' ? 1.5 : 1)).toFixed(2)} €</div>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 flex items-center gap-2.5">
          <Utensils className="w-4 h-4 text-td-coral shrink-0" />
          <div>
            <div className="text-[10px] text-td-muted uppercase font-bold">Menú / Comida</div>
            <div className="text-sm font-extrabold text-white">~{Math.round(cost.mealPrice * styleMultiplier)} €</div>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 flex items-center gap-2.5">
          <Coffee className="w-4 h-4 text-amber-300 shrink-0" />
          <div>
            <div className="text-[10px] text-td-muted uppercase font-bold">Café Espresso</div>
            <div className="text-sm font-extrabold text-white">~{cost.coffeePrice.toFixed(2)} €</div>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 flex items-center gap-2.5">
          <Bus className="w-4 h-4 text-td-cyan shrink-0" />
          <div>
            <div className="text-[10px] text-td-muted uppercase font-bold">Metro / Bus</div>
            <div className="text-sm font-extrabold text-white">~{cost.transportPrice.toFixed(2)} €</div>
          </div>
        </div>
      </div>

      {/* True Total Calculation Bar */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-transparent border border-emerald-500/20 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-0.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Presupuesto Real Estimado de Bolsillo</span>
          </div>
          <div className="text-xs text-td-secondary">
            ~{estimatedDaily} € / día en comida, transporte y ocio ({nights} noches = ~{totalDestinationSpend} €)
          </div>
        </div>

        <div className="text-center sm:text-right shrink-0 bg-black/40 px-4 py-2 rounded-xl border border-white/10">
          <span className="text-[10px] text-td-muted uppercase font-bold block">Coste Total Todo Incluido</span>
          <span className="text-xl sm:text-2xl font-black text-white">
            ~{grandTotalTripCost} € <span className="text-[11px] font-normal text-td-muted">estimado</span>
          </span>
        </div>
      </div>
    </div>
  );
}
