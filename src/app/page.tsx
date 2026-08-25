import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomeHero from '@/components/home/HomeHero';
import PopularDestinations from '@/components/home/PopularDestinations';
import TrustStatsBar from '@/components/home/TrustStatsBar';
import FlashDealsSection from '@/components/home/FlashDealsSection';
import HolidayPlannerSection from '@/components/home/HolidayPlannerSection';
import CommunityVipBanner from '@/components/home/CommunityVipBanner';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';
import Link from 'next/link';
import { 
  Search, 
  Compass, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Plane, 
  Hotel, 
  Zap, 
  Flame 
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#070A12] text-td-primary selection:bg-td-coral/30 selection:text-white">
      <Header />

      <main className="flex-1 flex flex-col">
        {/* =========================================================================
            ULTRA-FINE LUXURY HERO SECTION WITH NAUTICAL & FLIGHT NAVIGATION CHART
           ========================================================================= */}
        <HomeHero />

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
            DYNAMIC LIVE ANIMATED STATS BAR
           ========================================================================= */}
        <TrustStatsBar />

        {/* =========================================================================
            VIRAL FLASH DEALS UNDER 120€ (Server-Rendered SSR/SSG)
           ========================================================================= */}
        <FlashDealsSection origin="TFS" isResident={true} nights={3} month="Octubre" />

        {/* =========================================================================
            POPULAR DESTINATIONS CAROUSEL (Server-Rendered SSR/SSG)
           ========================================================================= */}
        <PopularDestinations origin="TFS" isResident={true} nights={3} month="Octubre" />

        {/* =========================================================================
            SMART SPANISH BANK HOLIDAYS & LONG WEEKENDS PLANNER
           ========================================================================= */}
        <HolidayPlannerSection />

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
                <div
                  key={i}
                  className="bg-white/[0.02] border border-white/[0.08] p-8 rounded-3xl text-center flex flex-col items-center gap-4 hover:border-white/20 transition-all shadow-xl"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/10 shadow-inner">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white">{step.title}</h3>
                  <p className="text-td-secondary text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS & SOCIAL PROOF */}
        <TestimonialsSection />

        {/* =========================================================================
            VIP COMMUNITY LEAD CAPTURE (WHATSAPP & TELEGRAM DEAL CHANNELS)
           ========================================================================= */}
        <CommunityVipBanner />

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
              <Link
                href="/resultados?budget=150&origin=TFS&resident=true"
                className="td-btn-surprise px-8 py-4 text-base font-bold shadow-2xl inline-flex items-center gap-2"
              >
                <span>🎲 Explorar Escapadas Ahora</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
