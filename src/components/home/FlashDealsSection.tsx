import { getLiveFlightTrips } from '@/lib/travelpayouts-api';
import { Flame, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import FlashDealsClient from './FlashDealsClient';

interface FlashDealsSectionProps {
  origin?: string;
  isResident?: boolean;
  nights?: number;
  month?: string;
}

export default async function FlashDealsSection({
  origin = 'TFS',
  isResident = true,
  nights = 3,
  month = 'Octubre',
}: FlashDealsSectionProps) {
  let liveDeals: any[] = [];

  try {
    const liveTrips = await getLiveFlightTrips(origin, isResident, nights);
    if (liveTrips && liveTrips.length > 0) {
      liveDeals = [...liveTrips].sort((a, b) => a.totalPrice - b.totalPrice).slice(0, 4);
    }
  } catch (err) {
    console.error('Error server-fetching live flights for FlashDealsSection:', err);
  }

  if (liveDeals.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-transparent via-rose-950/10 to-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-xs font-black text-rose-400 uppercase tracking-wider mb-3">
              <Flame className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>Chollos Flash Relámpago desde {origin}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Escapadas por <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-td-coral to-amber-300">menos de 120 €</span>
            </h2>
            <p className="text-td-secondary text-sm sm:text-base mt-2 max-w-xl">
              Vuelo ida y vuelta con aerolínea real + {nights} noches de hotel céntrico. Tarifas mínimas detectadas en vivo.
            </p>
          </div>

          <Link
            href={`/resultados?budget=120&origin=${origin}&resident=${isResident}&nights=${nights}&month=${encodeURIComponent(month)}`}
            className="td-pill text-xs font-bold text-white hover:text-rose-400 flex items-center gap-2 self-start sm:self-auto py-2.5 px-5 shadow-md border-rose-500/30 group"
          >
            <span>Ver todos los chollos desde {origin}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Server Rendered HTML with Client Motion */}
        <FlashDealsClient deals={liveDeals} />
      </div>
    </section>
  );
}
