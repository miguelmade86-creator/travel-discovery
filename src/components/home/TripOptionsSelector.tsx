'use client';

import { Calendar, Moon, Users, Plus, Minus } from 'lucide-react';
import { MONTHS, NIGHT_OPTIONS } from '@/lib/types';

interface TripOptionsSelectorProps {
  month: string;
  onMonthChange: (month: string) => void;
  nights: number;
  onNightsChange: (nights: number) => void;
  travelers: number;
  onTravelersChange: (count: number) => void;
}

export default function TripOptionsSelector({
  month,
  onMonthChange,
  nights,
  onNightsChange,
  travelers,
  onTravelersChange,
}: TripOptionsSelectorProps) {
  const monthBadges: Record<string, string> = {
    Septiembre: '🏖️',
    Octubre: '🍁',
    Noviembre: '🍂',
    Diciembre: '🎄',
    Enero: '✨',
    Febrero: '🎭',
    Marzo: '🌸',
    Abril: '☀️',
    Mayo: '🌴',
    Junio: '🌊',
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Month Selector */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-td-violet/15 flex items-center justify-center border border-td-violet/30">
            <Calendar className="w-4 h-4 text-td-violet" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-td-muted">
              3. ¿En qué mes quieres viajar?
            </h3>
            <span className="text-xs text-td-secondary">Fechas flexibles para el mejor precio</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {MONTHS.map((m) => {
            const isSelected = month === m;
            return (
              <button
                key={m}
                type="button"
                onClick={() => onMonthChange(m)}
                className={`td-pill text-xs py-2 px-3.5 flex items-center gap-1.5 shrink-0 transition-all font-semibold ${
                  isSelected ? 'td-pill-active scale-105 shadow-md' : 'hover:scale-105'
                }`}
              >
                <span>{monthBadges[m] || '✈️'}</span>
                <span>{m}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Nights & Travelers Split Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        {/* Nights */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Moon className="w-3.5 h-3.5 text-td-cyan" />
            <span className="text-xs font-bold uppercase tracking-wider text-td-muted">
              Duración del viaje
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {NIGHT_OPTIONS.slice(0, 3).map((opt) => {
              const isSelected = nights === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onNightsChange(opt.value)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    isSelected
                      ? 'bg-td-cyan/15 border-td-cyan/50 text-white font-bold shadow-sm'
                      : 'bg-white/[0.03] border-white/10 text-td-secondary hover:bg-white/[0.07]'
                  }`}
                >
                  <div className="text-xs font-bold">{opt.label}</div>
                  <div className="text-[10px] text-td-muted">{opt.sublabel}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Travelers Stepper */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-td-emerald" />
            <span className="text-xs font-bold uppercase tracking-wider text-td-muted">
              Número de personas
            </span>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-2 flex items-center justify-between">
            <div className="flex items-center gap-2 pl-3">
              <span className="text-sm">👥</span>
              <span className="text-xs font-bold text-white">
                {travelers === 1 ? '1 persona (Solo)' : travelers === 2 ? '2 personas (Pareja)' : `${travelers} personas (Grupo)`}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onTravelersChange(Math.max(1, travelers - 1))}
                disabled={travelers <= 1}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-white transition-colors"
                aria-label="Restar persona"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center font-bold text-sm text-white">{travelers}</span>
              <button
                type="button"
                onClick={() => onTravelersChange(Math.min(6, travelers + 1))}
                disabled={travelers >= 6}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-white transition-colors"
                aria-label="Sumar persona"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
