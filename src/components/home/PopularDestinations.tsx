import { getLiveFlightTrips } from '@/lib/travelpayouts-api';
import { POPULAR_DESTINATIONS } from '@/lib/mock-data';
import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';
import PopularDestinationsClient, { DestinationCardItem } from './PopularDestinationsClient';

interface PopularDestinationsProps {
  origin?: string;
  isResident?: boolean;
  nights?: number;
  month?: string;
}

export default async function PopularDestinations({
  origin = 'TFS',
  isResident = true,
  nights = 3,
  month = 'Octubre',
}: PopularDestinationsProps) {
  let displayItems: DestinationCardItem[] = [];
  let isLive = false;

  try {
    const liveTrips = await getLiveFlightTrips(origin, isResident, nights);
    if (liveTrips && liveTrips.length > 0) {
      isLive = true;
      displayItems = liveTrips.slice(0, 8).map((trip) => ({
        city: trip.destination.city,
        flag: trip.destination.flag,
        image: trip.destination.image,
        from: trip.totalPrice,
        airline: trip.outboundFlight.airline,
        tripId: trip.id,
      }));
    }
  } catch (err) {
    console.error('Error server-fetching live flights for PopularDestinations:', err);
  }

  // Fallback to curated popular destinations if API has 0 results
  if (displayItems.length === 0) {
    displayItems = POPULAR_DESTINATIONS.map((dest) => ({
      city: dest.city,
      flag: dest.flag,
      image: dest.image,
      from: dest.from,
      airline: 'Vuelo directo',
      tripId: undefined,
    }));
  }

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
                isLive
                  ? 'bg-td-coral/10 border border-td-coral/20 text-td-coral'
                  : 'bg-white/5 border border-white/10 text-td-secondary'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>
                {isLive
                  ? `⚡ Tarifas en Vivo · Salida desde ${origin}`
                  : `Ejemplos orientativos · Salida desde ${origin}`}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Escapadas más deseadas <span className="td-gradient-text">de toda España</span>
            </h2>
            <p className="text-td-secondary text-sm sm:text-base mt-2 max-w-xl">
              Precios cerrados calculados con vuelos directos y hoteles céntricos de alta puntuación.
            </p>
          </div>

          <Link
            href={`/resultados?origin=${origin}&resident=${isResident}&nights=${nights}&month=${encodeURIComponent(month)}`}
            className="td-pill text-xs font-bold text-white hover:text-td-coral flex items-center gap-2 self-start sm:self-auto py-2.5 px-5 shadow-md group"
          >
            <span>Ver todas las escapadas ({origin})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Server Rendered HTML with Client Motion/Hover wrapper */}
        <PopularDestinationsClient
          items={displayItems}
          origin={origin}
          isResident={isResident}
          nights={nights}
          month={month}
        />
      </div>
    </section>
  );
}
