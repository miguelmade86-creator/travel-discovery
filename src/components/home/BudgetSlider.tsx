'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Sparkles } from 'lucide-react';

interface BudgetSliderProps {
  budget: number;
  onBudgetChange: (value: number) => void;
}

const PRESETS = [100, 125, 150, 180, 220, 300];

export default function BudgetSlider({ budget, onBudgetChange }: BudgetSliderProps) {
  const getBudgetMood = (val: number) => {
    if (val <= 115) return { label: 'Ganga / Mochilero 🎒', color: 'from-emerald-400 to-teal-400' };
    if (val <= 155) return { label: 'Escapada Smart (Top Ventas) ✨', color: 'from-td-coral to-td-orange' };
    if (val <= 210) return { label: 'Fin de Semana Top (Hotel 4★) 🌟', color: 'from-td-violet to-td-fuchsia' };
    return { label: 'Viajazo VIP / Todo Incluido 👑', color: 'from-amber-400 to-yellow-500' };
  };

  const mood = getBudgetMood(budget);

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Header with Title & Amount */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-td-coral/15 flex items-center justify-center border border-td-coral/30">
            <Wallet className="w-4.5 h-4.5 text-td-coral" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-td-muted">
              1. Presupuesto Máximo
            </h3>
            <span className="text-xs text-td-secondary">Vuelo ida/vuelta + Hotel incluido</span>
          </div>
        </div>

        {/* Dynamic Mood Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-white self-start sm:self-auto">
          <Sparkles className="w-3 h-3 text-td-amber" />
          <span>{mood.label}</span>
        </div>
      </div>

      {/* Big Animated Display */}
      <div className="bg-black/30 border border-white/10 rounded-2xl p-4 sm:p-5 flex items-center justify-between">
        <div>
          <span className="text-xs text-td-muted block mb-0.5">Tengo para gastar:</span>
          <div className="flex items-baseline gap-1.5">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={budget}
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                className="text-4xl sm:text-5xl font-black td-gradient-text tracking-tight"
              >
                {budget} €
              </motion.span>
            </AnimatePresence>
            <span className="text-xs font-semibold text-td-muted">/ persona</span>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center justify-end gap-1.5 max-w-[200px] sm:max-w-none">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => onBudgetChange(preset)}
              className={`td-pill text-xs py-1 px-2.5 transition-all font-bold ${
                budget === preset ? 'td-pill-active scale-105 shadow-md' : 'hover:scale-105'
              }`}
            >
              {preset === 300 ? '300€+' : `${preset}€`}
            </button>
          ))}
        </div>
      </div>

      {/* Tactile Range Slider */}
      <div className="px-1 pt-1">
        <input
          type="range"
          min="60"
          max="400"
          step="5"
          value={budget}
          onChange={(e) => onBudgetChange(Number(e.target.value))}
          className="td-slider cursor-pointer"
          aria-label="Ajustar presupuesto máximo"
        />
        <div className="flex justify-between text-[11px] text-td-muted mt-2 font-medium">
          <span>60 € (Mochilero)</span>
          <span>150 € (Recomendado)</span>
          <span>400 €+ (Lujo)</span>
        </div>
      </div>
    </div>
  );
}
