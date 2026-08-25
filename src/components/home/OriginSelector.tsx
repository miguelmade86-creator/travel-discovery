'use client';

import { useState } from 'react';
import { PlaneTakeoff, Check } from 'lucide-react';
import { 
  ALL_AIRPORTS, 
  POPULAR_AIRPORTS, 
  CANARY_AIRPORTS, 
  PENINSULA_AIRPORTS, 
  BALEARIC_AIRPORTS,
  Airport 
} from '@/lib/types';

interface OriginSelectorProps {
  origin: string;
  onOriginChange: (code: string) => void;
}

type OriginTab = 'popular' | 'canarias' | 'peninsula' | 'baleares';

export default function OriginSelector({ origin, onOriginChange }: OriginSelectorProps) {
  const [activeTab, setActiveTab] = useState<OriginTab>('popular');

  const getAirportsForTab = (): Airport[] => {
    switch (activeTab) {
      case 'popular':
        return POPULAR_AIRPORTS;
      case 'canarias':
        return CANARY_AIRPORTS;
      case 'peninsula':
        return PENINSULA_AIRPORTS;
      case 'baleares':
        return BALEARIC_AIRPORTS;
      default:
        return POPULAR_AIRPORTS;
    }
  };

  const currentAirports = getAirportsForTab();
  const selectedAirport = ALL_AIRPORTS.find((a) => a.code === origin) || POPULAR_AIRPORTS[0];

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-td-amber/15 flex items-center justify-center border border-td-amber/30 shrink-0">
            <PlaneTakeoff className="w-4 h-4 text-td-amber" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-td-muted">
              2. ¿Desde dónde vuelas?
            </h3>
            <span className="text-xs text-td-secondary font-medium">
              Seleccionado: <strong className="text-white">{selectedAirport.name} ({selectedAirport.code})</strong>
            </span>
          </div>
        </div>

        {/* Region Tabs */}
        <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/10 self-start sm:self-auto overflow-x-auto max-w-full">
          {[
            { id: 'popular', label: '✨ Populares' },
            { id: 'canarias', label: '🌴 Canarias' },
            { id: 'peninsula', label: '🇪🇸 Península' },
            { id: 'baleares', label: '🌊 Baleares' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as OriginTab)}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-td-coral text-white shadow-md shadow-td-coral/30'
                  : 'text-td-muted hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Airport Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 max-h-[220px] overflow-y-auto pr-1">
        {currentAirports.map((airport) => {
          const isSelected = origin === airport.code;
          return (
            <button
              key={airport.code}
              type="button"
              onClick={() => onOriginChange(airport.code)}
              className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all flex items-center justify-between relative overflow-hidden group ${
                isSelected
                  ? 'bg-td-coral/15 border-td-coral/50 shadow-lg shadow-td-coral/10'
                  : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.07] hover:border-white/20'
              }`}
            >
              <div className="flex flex-col min-w-0 pr-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm">{airport.flag || '✈️'}</span>
                  <span className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-td-primary'}`}>
                    {airport.name}
                  </span>
                </div>
                <span className="text-[10px] text-td-muted font-mono mt-0.5">
                  {airport.code} · {airport.city}
                </span>
              </div>

              {isSelected && (
                <div className="w-5 h-5 rounded-full bg-td-coral flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#0B0F1A]" strokeWidth={3} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
