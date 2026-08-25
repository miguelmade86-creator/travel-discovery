'use client';

import { SearchFilters, AccommodationType } from '@/lib/types';
import { Sparkles, DollarSign, Hotel, Plane, Check, Building, Home, LucideIcon } from 'lucide-react';

interface FilterBarProps {
  sortBy: SearchFilters['sortBy'];
  onSortChange: (sort: SearchFilters['sortBy']) => void;
  directOnly: boolean;
  onDirectToggle: (val: boolean) => void;
  accommodation: AccommodationType;
  onAccommodationChange: (acc: AccommodationType) => void;
  resultCount: number;
  currentBudget: number;
  onBudgetChange?: (newBudget: number) => void;
}

export default function FilterBar({
  sortBy,
  onSortChange,
  directOnly,
  onDirectToggle,
  accommodation,
  onAccommodationChange,
  resultCount,
  currentBudget,
  onBudgetChange,
}: FilterBarProps) {
  const sortOptions: { value: SearchFilters['sortBy']; label: string; icon: LucideIcon }[] = [
    { value: 'tripScore', label: 'Recomendados', icon: Sparkles },
    { value: 'price', label: 'Más baratos', icon: DollarSign },
    { value: 'hotelRating', label: 'Mejor estancia', icon: Hotel },
    { value: 'flightQuality', label: 'Vuelo rápido', icon: Plane },
  ];

  const budgetPresets = [100, 150, 200, 300];

  return (
    <div className="w-full py-2.5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
        
        {/* Result Count & Active budget badge */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-td-secondary font-medium">
          <span>
            Hemos encontrado <strong className="text-white font-black">{resultCount} escapadas</strong>
          </span>
          <span className="text-xs text-td-muted">| Max: <strong className="text-td-coral">{currentBudget} €</strong></span>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Accommodation Type Toggle (Hoteles vs Airbnb vs Todos) */}
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-0.5">
            <button
              type="button"
              onClick={() => onAccommodationChange('all')}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                accommodation === 'all'
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-td-muted hover:text-white'
              }`}
            >
              ✨ Todos
            </button>
            <button
              type="button"
              onClick={() => onAccommodationChange('hotel')}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                accommodation === 'hotel'
                  ? 'bg-td-coral/20 text-td-coral font-black border border-td-coral/30 shadow-sm'
                  : 'text-td-muted hover:text-white'
              }`}
            >
              <Building className="w-3 h-3" />
              <span>Hoteles</span>
            </button>
            <button
              type="button"
              onClick={() => onAccommodationChange('apartment')}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                accommodation === 'apartment'
                  ? 'bg-rose-500/25 text-rose-300 font-black border border-rose-500/40 shadow-sm'
                  : 'text-td-muted hover:text-white'
              }`}
            >
              <Home className="w-3 h-3 text-rose-400" />
              <span>Airbnb</span>
            </button>
          </div>

          {/* Quick Budget Adjusters */}
          {onBudgetChange && (
            <div className="hidden sm:flex items-center gap-1 pr-2 border-r border-white/10">
              {budgetPresets.map((b) => (
                <button
                  key={b}
                  onClick={() => onBudgetChange(b)}
                  className={`py-1 px-2 rounded-full text-xs font-bold transition-all ${
                    currentBudget === b
                      ? 'bg-td-coral text-[#0B0F1A] shadow-md shadow-coral-950/40'
                      : 'bg-white/5 text-td-secondary hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {b}€
                </button>
              ))}
            </div>
          )}

          {/* Sort Options */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
            {sortOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = sortBy === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => onSortChange(opt.value)}
                  className={`py-1.5 px-3 rounded-full text-xs font-extrabold transition-all shrink-0 flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-td-coral/15 border-td-coral text-td-coral shadow-md shadow-coral-950/30'
                      : 'bg-white/5 border-white/5 text-td-secondary hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-td-coral' : 'text-td-muted'}`} />
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>

          {/* Direct flights switch */}
          <button
            type="button"
            onClick={() => onDirectToggle(!directOnly)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 border ml-auto sm:ml-0 shrink-0 ${
              directOnly
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                : 'bg-white/5 border-white/10 text-td-muted hover:text-white'
            }`}
          >
            <span>✈️ Directos</span>
            {directOnly && <Check className="w-3 h-3 text-emerald-400" />}
          </button>
        </div>

      </div>
    </div>
  );
}
