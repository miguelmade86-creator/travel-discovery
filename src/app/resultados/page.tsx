'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SearchSummaryBar from '@/components/results/SearchSummaryBar';
import FilterBar from '@/components/results/FilterBar';
import TripCard from '@/components/results/TripCard';
import TripCompareModal from '@/components/results/TripCompareModal';
import { useFlightOffers } from '@/lib/hooks/useFlightOffers';
import { SearchFilters, TripCombination, TRAVEL_VIBES, TravelVibe, AccommodationType } from '@/lib/types';
import { Compass, RefreshCw, MessageCircle, X, RotateCcw, Scale, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { AFFILIATE_CONFIG } from '@/lib/affiliate';

function ResultsContent() {
  const searchParams = useSearchParams();

  // Read URL search params
  const paramBudget = Number(searchParams.get('budget')) || 150;
  const paramOrigin = searchParams.get('origin') || 'TFS';
  const paramMonth = searchParams.get('month') || 'Octubre';
  const paramNights = Number(searchParams.get('nights')) || 3;
  const paramResident = searchParams.get('resident') !== 'false';
  const paramDirectOnly = searchParams.get('direct') === 'true';
  const paramBreakfast = searchParams.get('breakfast') === 'true';
  const paramVibe = (searchParams.get('vibe') as TravelVibe) || 'all';
  const paramAccommodation = (searchParams.get('accommodation') as AccommodationType) || 'all';

  const [budget, setBudget] = useState(paramBudget);
  const [sortBy, setSortBy] = useState<SearchFilters['sortBy']>('tripScore');
  const [directOnly, setDirectOnly] = useState(paramDirectOnly);
  const [breakfastOnly, setBreakfastOnly] = useState(paramBreakfast);
  const [activeVibe, setActiveVibe] = useState<TravelVibe>(paramVibe);
  const [accommodation, setAccommodation] = useState<AccommodationType>(paramAccommodation);
  const [excludedCities, setExcludedCities] = useState<string[]>([]);
  
  // Side-by-Side Comparison State
  const [compareTrips, setCompareTrips] = useState<TripCombination[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Single Source of Truth SWR Data Hook
  const { trips: tripsWithPricing, isLoading: isLoadingLive, source } = useFlightOffers({
    origin: paramOrigin,
    isResident: paramResident,
    nights: paramNights,
    month: paramMonth,
  });

  const usingMockData = source !== 'live';

  const handleToggleCompare = (trip: TripCombination) => {
    setCompareTrips((prev) => {
      const exists = prev.some((t) => t.id === trip.id);
      if (exists) {
        return prev.filter((t) => t.id !== trip.id);
      }
      if (prev.length >= 2) {
        return [prev[1], trip]; // Keep last and add new
      }
      return [...prev, trip];
    });
  };

  const handleExcludeCity = (city: string) => {
    setExcludedCities((prev) => (prev.includes(city) ? prev : [...prev, city]));
  };

  const handleRestoreCity = (city: string) => {
    setExcludedCities((prev) => prev.filter((c) => c !== city));
  };

  const handleClearExcluded = () => {
    setExcludedCities([]);
  };

  // Filter & Sort
  const filteredTrips = useMemo(() => {
    let trips = [...tripsWithPricing];

    // Filter out excluded cities (Waynabox feature)
    if (excludedCities.length > 0) {
      trips = trips.filter((trip) => !excludedCities.includes(trip.destination.city));
    }

    // Filter by Accommodation Type (Hotel vs Airbnb vs All)
    if (accommodation === 'hotel') {
      trips = trips.filter((trip) => trip.hotel.type === 'hotel' || !trip.hotel.isAirbnb);
    } else if (accommodation === 'apartment') {
      trips = trips.filter((trip) => trip.hotel.type === 'apartment' || trip.hotel.isAirbnb);
    }

    // Filter by direct flights
    if (directOnly) {
      trips = trips.filter(
        (trip) => trip.outboundFlight.stops === 0 && trip.returnFlight.stops === 0
      );
    }

    // Filter by breakfast
    if (breakfastOnly) {
      trips = trips.filter((trip) => trip.hotel.breakfastIncluded);
    }

    // Filter by Vibe (Escape feature)
    if (activeVibe !== 'all') {
      trips = trips.filter((trip) => trip.vibe === activeVibe);
    }

    // Filter by budget
    trips = trips.filter((trip) => trip.totalPrice <= budget * 1.15);

    // Sort
    trips.sort((a, b) => {
      switch (sortBy) {
        case 'tripScore':
          return b.tripScore - a.tripScore;
        case 'price':
          return a.totalPrice - b.totalPrice;
        case 'hotelRating':
          return b.hotel.rating - a.hotel.rating;
        case 'flightQuality':
          return b.scores.flight - a.scores.flight;
        default:
          return 0;
      }
    });

    return trips;
  }, [tripsWithPricing, excludedCities, accommodation, directOnly, breakfastOnly, activeVibe, budget, sortBy]);

  return (
    <>
      {/* Sticky Top Anchored Search Summary + Filter Control Center */}
      <div className="sticky top-0 pt-16 sm:pt-[72px] z-40 w-full bg-[#0B0F1A]/98 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/80">
        <SearchSummaryBar
          originCode={paramOrigin}
          month={paramMonth}
          nights={paramNights}
          budget={budget}
          isResident={paramResident}
          usingMockData={usingMockData}
        />

        <div className="h-px w-full bg-white/5" />

        <FilterBar
          sortBy={sortBy}
          onSortChange={setSortBy}
          directOnly={directOnly}
          onDirectToggle={setDirectOnly}
          accommodation={accommodation}
          onAccommodationChange={setAccommodation}
          resultCount={filteredTrips.length}
          currentBudget={budget}
          onBudgetChange={setBudget}
        />
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Vibes / Style Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 no-scrollbar">
          {TRAVEL_VIBES.map((vibe) => (
            <button
              key={vibe.id}
              onClick={() => setActiveVibe(vibe.id as TravelVibe)}
              className={`td-pill text-xs py-2 px-4 shrink-0 transition-all font-bold ${
                activeVibe === vibe.id ? 'td-pill-active shadow-md' : 'hover:bg-white/10'
              }`}
            >
              {vibe.label}
            </button>
          ))}
        </div>

        {/* Waynabox Excluded Cities Bar */}
        {excludedCities.length > 0 && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-3 mb-6 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-red-400 font-bold">🚫 Destinos descartados ({excludedCities.length}):</span>
              <div className="flex flex-wrap gap-1.5">
                {excludedCities.map((city) => (
                  <span
                    key={city}
                    className="inline-flex items-center gap-1 bg-white/10 text-white px-2.5 py-0.5 rounded-full text-xs"
                  >
                    <span>{city}</span>
                    <button
                      onClick={() => handleRestoreCity(city)}
                      className="hover:text-red-400"
                      title="Volver a mostrar"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={handleClearExcluded}
              className="text-xs text-td-muted hover:text-white flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3 h-3" />
              Restaurar todos
            </button>
          </div>
        )}

        {/* Community Telegram / WhatsApp Deals Banner */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-teal-950/20 to-transparent border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-white">Canal VIP de Chollos de Viajes</h4>
              <p className="text-xs text-td-muted">Recibe 1 escapada secreta al día por menos de 150 € directo en WhatsApp / Telegram.</p>
            </div>
          </div>
          <a
            href={AFFILIATE_CONFIG.whatsappChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#0B0F1A] text-xs font-black transition-colors shrink-0 flex items-center gap-1.5 shadow-lg"
          >
            <span>Unirme Gratis</span>
          </a>
        </div>

        {/* Trips Grid */}
        {filteredTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map((trip, idx) => (
              <TripCard
                key={trip.id}
                trip={trip}
                index={idx}
                onExcludeCity={handleExcludeCity}
                onToggleCompare={handleToggleCompare}
                isComparing={compareTrips.some((t) => t.id === trip.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center td-card p-8 max-w-xl mx-auto border border-white/10">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
              <Compass className="w-8 h-8 text-td-coral" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              {accommodation === 'apartment' && source === 'live'
                ? 'Filtro Airbnb solo disponible en escapadas de ejemplo'
                : 'No encontramos escapadas con estos filtros'}
            </h2>
            <p className="text-td-secondary text-sm max-w-md mb-6 leading-relaxed">
              {accommodation === 'apartment' && source === 'live'
                ? 'Las tarifas en vivo de aerolíneas se combinan actualmente con hoteles recomendados. Cambia el filtro a "Todos" o "Hoteles" para ver todas las tarifas en vivo.'
                : 'Prueba a cambiar a "Todos los alojamientos", subir el presupuesto o cambiar la temática.'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  setBudget(200);
                  setActiveVibe('all');
                  setAccommodation('all');
                  setExcludedCities([]);
                  setBreakfastOnly(false);
                }}
                className="td-btn-primary py-2.5 px-6 text-sm"
              >
                Ver todos los alojamientos
              </button>
              <Link
                href="/"
                className="td-glass hover:bg-white/10 py-2.5 px-5 rounded-full text-xs font-semibold text-white transition-colors"
              >
                Volver a la Home
              </Link>
            </div>
          </div>
        )}

        {/* Floating Compare Dock Bar */}
        {compareTrips.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#0B0F1A]/95 border border-white/20 p-3 sm:p-4 rounded-3xl shadow-2xl backdrop-blur-xl flex items-center gap-3 sm:gap-4 max-w-lg w-[92%] sm:w-auto">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-td-amber/20 flex items-center justify-center text-td-amber shrink-0">
                <Scale className="w-4 h-4" />
              </div>
              <div className="text-xs truncate">
                <div className="font-extrabold text-white">
                  Comparador: {compareTrips.map((t) => t.destination.city).join(' vs ')}
                </div>
                <div className="text-[10px] text-td-muted">
                  {compareTrips.length === 1 ? 'Selecciona 1 escapada más para el duelo' : '2 escapadas seleccionadas'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 ml-auto shrink-0">
              {compareTrips.length === 2 ? (
                <button
                  type="button"
                  onClick={() => setIsCompareModalOpen(true)}
                  className="bg-td-amber hover:bg-amber-400 text-[#0B0F1A] px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-lg transition-all"
                >
                  <span>Ver Duelo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="text-[10px] text-td-amber font-bold bg-td-amber/10 px-2 py-1 rounded-lg">
                  Elige 1 más
                </span>
              )}
              <button
                type="button"
                onClick={() => setCompareTrips([])}
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-td-muted hover:text-white"
                title="Limpiar"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Side by Side Compare Modal */}
        <TripCompareModal
          isOpen={isCompareModalOpen}
          onClose={() => setIsCompareModalOpen(false)}
          tripA={compareTrips[0]}
          tripB={compareTrips[1]}
        />
      </main>
    </>
  );
}

export default function ResultadosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-td-deep">
      <Header />
      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center min-h-[50vh]">
            <div className="flex items-center gap-3 text-td-secondary text-sm animate-pulse">
              <RefreshCw className="w-5 h-5 animate-spin text-td-coral" />
              <span>Calculando las mejores combinaciones...</span>
            </div>
          </div>
        }
      >
        <ResultsContent />
      </Suspense>
      <Footer />
    </div>
  );
}
