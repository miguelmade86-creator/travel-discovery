'use client';

import { useState } from 'react';
import SleekSearchConsole from '@/components/home/SleekSearchConsole';
import NavigationChartBackground from '@/components/home/NavigationChartBackground';
import SurpriseMeModal from '@/components/home/SurpriseMeModal';
import QuickCategoryPills from '@/components/home/QuickCategoryPills';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { MONTHS } from '@/lib/types';

export default function HomeHero() {
  const [budget, setBudget] = useState(150);
  const [origin, setOrigin] = useState('TFS');
  const [month, setMonth] = useState(MONTHS[1] || 'Octubre');
  const [nights, setNights] = useState(3);
  const [travelers, setTravelers] = useState(1);
  const [isResident, setIsResident] = useState(true);
  const [isSurpriseModalOpen, setIsSurpriseModalOpen] = useState(false);

  const searchUrl = `/resultados?budget=${budget}&origin=${origin}&month=${encodeURIComponent(
    month
  )}&nights=${nights}&travelers=${travelers}&resident=${isResident}`;

  return (
    <>
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[86vh] flex items-center justify-center">
        {/* Celestial & Portolan Navigation Vector Chart + Ambient Aurora */}
        <NavigationChartBackground />

        {/* Floating Atmospheric Micro-Badges (Desktop Only) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="hidden xl:flex items-center gap-3 absolute top-36 left-10 td-glass p-3 rounded-2xl shadow-2xl z-10 max-w-[240px] border border-white/10"
        >
          <div className="w-8 h-8 rounded-xl bg-td-coral/15 flex items-center justify-center text-sm shrink-0">
            ✈️
          </div>
          <div className="text-xs">
            <div className="font-bold text-white leading-tight">TFS → Oporto · 118 €</div>
            <div className="text-[10px] text-td-muted">Vuelo directo + Hotel 3n</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="hidden xl:flex items-center gap-3 absolute top-40 right-10 td-glass p-3 rounded-2xl shadow-2xl z-10 max-w-[240px] border border-white/10"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-500/15 flex items-center justify-center text-sm shrink-0">
            ⭐
          </div>
          <div className="text-xs">
            <div className="font-bold text-white leading-tight">9.8/10 TripScore</div>
            <div className="text-[10px] text-td-muted">Málaga Soho Boutique + Desayuno</div>
          </div>
        </motion.div>

        {/* Center Column */}
        <div className="max-w-4xl mx-auto text-center z-10 relative w-full">
          {/* Pill Tag */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-[11px] font-bold tracking-wider text-td-coral mb-5 shadow-inner"
          >
            <Sparkles className="w-3.5 h-3.5 text-td-amber" />
            <span>MOTOR DE DESCUBRIMIENTO BUDGET-FIRST</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-4 leading-[1.08] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
          >
            ¿Cuánto tienes <br className="hidden sm:inline" />
            <span className="td-gradient-text">para escaparte?</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm sm:text-lg text-td-secondary max-w-xl mx-auto leading-relaxed mb-6 font-medium drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
          >
            Dinos tu presupuesto y te encontramos el viaje completo:{' '}
            <strong className="text-white font-semibold">Vuelo directo + Hotel céntrico</strong>.
          </motion.p>

          {/* Quick Inspiration Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mb-8"
          >
            <QuickCategoryPills />
          </motion.div>

          {/* Floating Search Dock */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SleekSearchConsole
              budget={budget}
              onBudgetChange={setBudget}
              origin={origin}
              onOriginChange={setOrigin}
              month={month}
              onMonthChange={setMonth}
              nights={nights}
              onNightsChange={setNights}
              travelers={travelers}
              onTravelersChange={setTravelers}
              isResident={isResident}
              onResidentToggle={() => setIsResident(!isResident)}
              onSurpriseClick={() => setIsSurpriseModalOpen(true)}
              searchUrl={searchUrl}
            />
          </motion.div>
        </div>
      </section>

      {/* ROULETTE SURPRISE MODAL */}
      <SurpriseMeModal
        isOpen={isSurpriseModalOpen}
        onClose={() => setIsSurpriseModalOpen(false)}
        userBudget={budget}
      />
    </>
  );
}
