'use client';

import { useState } from 'react';
import { DayItinerary } from '@/lib/types';
import { Compass, Sun, Sunset, Moon, Lightbulb, Share2, Check, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ItineraryTimelineProps {
  itinerary?: DayItinerary[];
  cityName: string;
  totalPrice: number;
}

export default function ItineraryTimeline({
  itinerary,
  cityName,
  totalPrice,
}: ItineraryTimelineProps) {
  const [selectedDay, setSelectedDay] = useState(1);
  const [copied, setCopied] = useState(false);

  if (!itinerary || itinerary.length === 0) return null;

  const currentDay = itinerary.find((d) => d.day === selectedDay) || itinerary[0];

  const shareToWhatsApp = () => {
    const text = `🗺️ ¡Mira este planazo de escapada a ${cityName} por solo ${totalPrice} € (Vuelo + Hotel)!%0A%0A📍 *Plan de viaje:*%0A${itinerary
      .map((d) => `*Día ${d.day}:* ${d.title}%0A- Mañana: ${d.morning}%0A- Tarde: ${d.afternoon}%0A- Noche: ${d.evening}`)
      .join('%0A%0A')}%0A%0AEncontrado en TravelDiscovery.`;
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const copyPlan = () => {
    const text = `🗺️ Escapada a ${cityName} (${totalPrice} € Vuelo + Hotel)\n\n` +
      itinerary.map(d => `Día ${d.day} - ${d.title}:\n• Mañana: ${d.morning}\n• Tarde: ${d.afternoon}\n• Noche: ${d.evening}\n💡 Tip: ${d.tip}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="td-card p-6 sm:p-7 border border-white/10">
      {/* Header with Title & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-td-violet/15 border border-td-violet/30 text-xs font-bold text-td-violet uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5" />
            Itinerario Inteligente Sugerido
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Tu escapada perfecta de 3 días en {cityName}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={copyPlan}
            className="td-glass hover:bg-white/10 px-3.5 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '¡Copiado!' : 'Copiar Plan'}</span>
          </button>

          <button
            type="button"
            onClick={shareToWhatsApp}
            className="bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-300 flex items-center gap-1.5 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Compartir WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Day Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4 overflow-x-auto no-scrollbar">
        {itinerary.map((d) => (
          <button
            key={d.day}
            type="button"
            onClick={() => setSelectedDay(d.day)}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 flex items-center gap-2 ${
              selectedDay === d.day
                ? 'bg-td-coral text-[#0B0F1A] shadow-lg shadow-coral-950/40 scale-105'
                : 'bg-white/5 text-td-secondary hover:bg-white/10 hover:text-white'
            }`}
          >
            <span>Día {d.day}</span>
            <span className="opacity-80 font-normal hidden sm:inline truncate max-w-[140px]">· {d.title}</span>
          </button>
        ))}
      </div>

      {/* Day Content Timeline */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDay.day}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-bold text-white mb-2">
            {currentDay.title}
          </h3>

          {/* Morning */}
          <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="w-8 h-8 rounded-xl bg-amber-400/15 flex items-center justify-center shrink-0 mt-0.5">
              <Sun className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="text-xs font-extrabold uppercase text-amber-400">Por la Mañana</div>
              <p className="text-xs sm:text-sm text-td-secondary mt-0.5 leading-relaxed">{currentDay.morning}</p>
            </div>
          </div>

          {/* Afternoon */}
          <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="w-8 h-8 rounded-xl bg-td-orange/15 flex items-center justify-center shrink-0 mt-0.5">
              <Sunset className="w-4 h-4 text-td-orange" />
            </div>
            <div>
              <div className="text-xs font-extrabold uppercase text-td-orange">Por la Tarde</div>
              <p className="text-xs sm:text-sm text-td-secondary mt-0.5 leading-relaxed">{currentDay.afternoon}</p>
            </div>
          </div>

          {/* Evening */}
          <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="w-8 h-8 rounded-xl bg-td-violet/15 flex items-center justify-center shrink-0 mt-0.5">
              <Moon className="w-4 h-4 text-td-violet" />
            </div>
            <div>
              <div className="text-xs font-extrabold uppercase text-td-violet">Por la Noche</div>
              <p className="text-xs sm:text-sm text-td-secondary mt-0.5 leading-relaxed">{currentDay.evening}</p>
            </div>
          </div>

          {/* Local Tip Box */}
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
            <Lightbulb className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="text-xs text-emerald-200">
              <strong className="text-emerald-300">Consejo local:</strong> {currentDay.tip}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
