'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SleekSearchConsole from '@/components/home/SleekSearchConsole';
import NavigationChartBackground from '@/components/home/NavigationChartBackground';
import SurpriseMeModal from '@/components/home/SurpriseMeModal';
import PopularDestinations from '@/components/home/PopularDestinations';
import TrustStatsBar from '@/components/home/TrustStatsBar';
import QuickCategoryPills from '@/components/home/QuickCategoryPills';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';
import { motion } from 'framer-motion';
import { 
  Search, 
  Compass, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Plane, 
  Hotel, 
  Zap, 
  ShieldCheck, 
  Award, 
  Flame 
} from 'lucide-react';
import { MONTHS } from '@/lib/types';

export default function Home() {
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
    <div className="min-h-screen flex flex-col bg-[#070A12] text-td-primary selection:bg-td-coral/30 selection:text-white">
      <Header />

      <main className="flex-1 flex flex-col">
        {/* =========================================================================
            ULTRA-FINE LUXURY HERO SECTION WITH NAUTICAL & FLIGHT NAVIGATION CHART
           ========================================================================= */}
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
              Dinos tu presupuesto y te encontramos el viaje completo: 
              <strong className="text-white font-semibold"> Vuelo directo + Hotel céntrico</strong>.
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

            {/* =========================================================================
                THE SLEEK FLOATING SEARCH DOCK
               ========================================================================= */}
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

        {/* =========================================================================
            LIVE DEALS MARQUEE TICKER (Continuous Live Feed)
           ========================================================================= */}
        <div className="w-full bg-[#0B0F1A] border-y border-white/[0.08] py-3.5 overflow-hidden">
          <div className="td-marquee">
            <div className="td-marquee-content text-xs sm:text-sm font-bold text-white tracking-wide">
              <span className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-td-coral animate-pulse" />
                <span>TFS → Málaga 109 € (Mínimo Histórico)</span>
              </span>
              <span className="text-td-muted">·</span>
              <span className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-td-amber" />
                <span>LPA → Oporto 118 € (Vuelo + Hotel Ribeira)</span>
              </span>
              <span className="text-td-muted">·</span>
              <span className="flex items-center gap-2">
                <Hotel className="w-4 h-4 text-td-emerald" />
                <span>Barcelona Universal 4★ + Desayuno 129 €</span>
              </span>
              <span className="text-td-muted">·</span>
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-td-violet" />
                <span>Marrakech Riad 4★ con piscina 135 €</span>
              </span>
              <span className="text-td-muted">·</span>
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Roma Centro Histórico 138 € (TripScore 93/100)</span>
              </span>
              <span className="text-td-muted">·</span>
              {/* Duplicate for seamless infinite loop */}
              <span className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-td-coral animate-pulse" />
                <span>TFS → Málaga 109 € (Mínimo Histórico)</span>
              </span>
              <span className="text-td-muted">·</span>
              <span className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-td-amber" />
                <span>LPA → Oporto 118 € (Vuelo + Hotel Ribeira)</span>
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            BUDGETTRIPS-STYLE COUNTER STATS SECTION
           ========================================================================= */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-white/5 bg-[#090D18]/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-center">
              {[
                {
                  icon: <Flame className="w-5 h-5 text-td-coral" />,
                  number: '1.450+',
                  label: 'Escapadas Encontradas',
                  sub: 'este mes desde Canarias',
                },
                {
                  icon: <Zap className="w-5 h-5 text-td-amber" />,
                  number: '109 €',
                  label: 'Precio Más Bajo',
                  sub: 'Vuelo directo + Hotel 3★',
                },
                {
                  icon: <Award className="w-5 h-5 text-emerald-400" />,
                  number: '9.8 / 10',
                  label: 'TripScore Máximo',
                  sub: 'Calidad & confort auditado',
                },
                {
                  icon: <Plane className="w-5 h-5 text-td-violet" />,
                  number: '12',
                  label: 'Destinos Directos',
                  sub: 'Península, Europa & Marruecos',
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white/[0.02] border border-white/[0.08] p-5 sm:p-6 rounded-3xl flex flex-col items-center gap-1.5 hover:border-td-coral/30 hover:bg-white/[0.04] transition-all shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-1">
                    {stat.icon}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black td-gradient-text tracking-tight">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white">{stat.label}</div>
                  <div className="text-[11px] text-td-muted">{stat.sub}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST & STATS BAR */}
        <TrustStatsBar />

        {/* POPULAR DESTINATIONS CAROUSEL */}
        <PopularDestinations />

        {/* HOW IT WORKS SECTION */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/[0.01] border-t border-white/5 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 text-xs text-td-coral font-bold uppercase tracking-wider mb-3 border border-white/10">
                Algoritmo Inteligente
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
                La magia de <span className="td-gradient-text">TravelDiscovery</span>
              </h2>
              <p className="text-td-secondary max-w-xl mx-auto text-sm sm:text-base">
                Cruza millones de tarifas aéreas y disponibilidades de hotel para entregarte viajes 100% coherentes.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 relative">
              {[
                {
                  icon: <Search className="w-6 h-6 text-td-coral" />,
                  title: '1. Elige tu presupuesto',
                  desc: 'Dinos cuánto dinero tienes y desde qué isla sales. Olvídate de buscar destino por destino.',
                },
                {
                  icon: <Compass className="w-6 h-6 text-td-amber" />,
                  title: '2. Filtramos con TripScore',
                  desc: 'Solo combinamos vuelos directos con horarios cómodos y hoteles céntricos (>8.0/10).',
                },
                {
                  icon: <CheckCircle2 className="w-6 h-6 text-td-emerald" />,
                  title: '3. Tú te escapas',
                  desc: 'Confirmas tu viaje con enlaces directos a aerolíneas y Booking sin comisiones intermedias.',
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="bg-white/[0.02] border border-white/[0.08] p-8 rounded-3xl text-center flex flex-col items-center gap-4 hover:border-white/20 transition-all shadow-xl"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/10 shadow-inner">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white">{step.title}</h3>
                  <p className="text-td-secondary text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS & SOCIAL PROOF */}
        <TestimonialsSection />

        {/* FAQS SECTION */}
        <FAQSection />

        {/* BOTTOM CTA BANNER */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-td-coral/10 via-td-violet/10 to-td-amber/10 border-t border-b border-white/10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h3 className="text-3xl sm:text-5xl font-black text-white">
              ¿Listo para tu próxima escapada?
            </h3>
            <p className="text-td-secondary text-sm sm:text-base max-w-xl mx-auto">
              No esperes a tener 1.000 € ahorrados. Hay escapadas increíbles esperando desde 109 €.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setIsSurpriseModalOpen(true)}
                className="td-btn-surprise px-8 py-4 text-base font-bold shadow-2xl inline-flex items-center gap-2"
              >
                <span>🎲 Probar la Ruleta Sorpréndeme</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* ROULETTE SURPRISE MODAL */}
      <SurpriseMeModal
        isOpen={isSurpriseModalOpen}
        onClose={() => setIsSurpriseModalOpen(false)}
        userBudget={budget}
      />
    </div>
  );
}
