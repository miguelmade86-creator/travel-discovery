'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useFlightOffers } from '@/lib/hooks/useFlightOffers';
import { MOCK_TRIPS } from '@/lib/mock-data';
import { TripCombination } from '@/lib/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FlightCard from '@/components/trip/FlightCard';
import HotelCard from '@/components/trip/HotelCard';
import CarRentalCard from '@/components/trip/CarRentalCard';
import TravelInsuranceCard from '@/components/trip/TravelInsuranceCard';
import PriceBreakdown from '@/components/trip/PriceBreakdown';
import TripHeader from '@/components/trip/TripHeader';
import ShareCard from '@/components/trip/ShareCard';
import DestinationCostCard from '@/components/trip/DestinationCostCard';
import ItineraryTimeline from '@/components/trip/ItineraryTimeline';
import Link from 'next/link';
import { ArrowLeft, Ticket, Loader2 } from 'lucide-react';
import { getCivitatisAffiliateUrl } from '@/lib/affiliate';

export default function TripDetailPage() {
  const params = useParams();
  const id = (params?.id as string) || '';

  const [carAdded, setCarAdded] = useState(false);
  const [carPrice, setCarPrice] = useState(0);
  const [insuranceAdded, setInsuranceAdded] = useState(false);
  const [insurancePrice, setInsurancePrice] = useState(0);

  // Extract origin and destination from dynamic ID if available
  const parts = id.split('-');
  const isDynamic = parts.length >= 3 && parts[0] === 'trip';
  const destCode = isDynamic ? parts[1].toUpperCase() : '';
  const originCode = isDynamic ? parts[2].toUpperCase() : 'TFS';

  const { trips, isLoading } = useFlightOffers({ origin: originCode });

  const trip = useMemo<TripCombination | null>(() => {
    if (trips.length > 0) {
      const liveMatch = trips.find(
        (t) =>
          t.id.toLowerCase() === id.toLowerCase() ||
          t.outboundFlight.destination.code.toUpperCase() === destCode
      );
      if (liveMatch) return liveMatch;
    }

    let mockMatch = MOCK_TRIPS.find((t) => t.id === id);
    if (!mockMatch && id) {
      const cleanId = id.toLowerCase();
      mockMatch = MOCK_TRIPS.find(
        (t) =>
          cleanId.includes(t.outboundFlight.destination.code.toLowerCase()) ||
          cleanId.includes(t.destination.city.toLowerCase())
      );
    }
    return mockMatch || null;
  }, [trips, id, destCode]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#070A12] text-td-primary">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-4 pt-20">
          <Loader2 className="w-10 h-10 text-td-coral animate-spin mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Cargando tarifas en vivo...</h2>
          <p className="text-xs text-td-muted">Consultando disponibilidad y precios reales con aerolíneas</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen flex flex-col bg-[#070A12] text-td-primary">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-4 pt-20">
          <h1 className="text-3xl font-bold mb-4">Escapada no encontrada</h1>
          <p className="text-td-muted mb-8 text-center max-w-md">
            Parece que esta escapada ya no está disponible o el enlace ha caducado.
          </p>
          <Link href="/resultados" className="td-btn-primary">
            Buscar nuevas escapadas
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const demoBudget = trip.totalPrice + 50;
  const civitatisUrl = getCivitatisAffiliateUrl(trip.destination.city);
  const finalDisplayTotal = trip.totalPrice + (carAdded ? carPrice : 0) + (insuranceAdded ? insurancePrice : 0);

  return (
    <div className="min-h-screen flex flex-col bg-td-deep text-td-primary">
      <Header />
      
      <main className="flex-1 pb-16">
        <TripHeader trip={trip} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          {/* Top Bar with Back Link & Weather Pill */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <Link href="/resultados" className="inline-flex items-center gap-2 text-sm text-td-muted hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>← Ver más escapadas</span>
            </Link>

            {trip.weather && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white shadow-sm">
                <span>{trip.weather.icon}</span>
                <span>{trip.weather.temp}°C</span>
                <span className="text-td-muted hidden sm:inline">· {trip.weather.text}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Flights, Hotel, Car, Insurance, Itinerary, True Cost, Activities */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* AI Explanation / Deal Highlight Banner */}
              <div className="p-5 rounded-3xl bg-gradient-to-r from-td-coral/10 via-td-amber/10 to-transparent border border-td-coral/20 flex items-start gap-3.5">
                <span className="text-2xl shrink-0">✨</span>
                <div>
                  <h3 className="text-sm font-extrabold text-white mb-1">Por qué recomendamos este viaje</h3>
                  <p className="text-xs text-td-secondary leading-relaxed">{trip.aiExplanation}</p>
                </div>
              </div>

              {/* Flight Details */}
              <FlightCard 
                outbound={trip.outboundFlight} 
                returnFlight={trip.returnFlight} 
                price={trip.flightPrice} 
              />
              
              {/* Hotel Details */}
              <HotelCard 
                hotel={trip.hotel} 
                nights={trip.nights} 
                checkIn={trip.outboundFlight.departure}
                checkOut={trip.returnFlight.arrival}
                destinationCity={trip.destination.city}
              />

              {/* Optional Car Rental Add-on Card (Travelpayouts DiscoverCars) */}
              <CarRentalCard
                rental={trip.carRental}
                city={trip.destination.city}
                nights={trip.nights}
                pickupDate={trip.outboundFlight.departure}
                returnDate={trip.returnFlight.arrival}
                onToggleAddCar={(added, price) => {
                  setCarAdded(added);
                  setCarPrice(added ? price : 0);
                }}
              />

              {/* Optional Travel Insurance Add-on Card (IATI / Travelpayouts) */}
              <TravelInsuranceCard
                country={trip.destination.country}
                city={trip.destination.city}
                nights={trip.nights}
                onToggleInsurance={(added, price) => {
                  setInsuranceAdded(added);
                  setInsurancePrice(added ? price : 0);
                }}
              />

              {/* Destination Living Cost Calculator (Real True Cost) */}
              <DestinationCostCard
                cost={trip.destinationCost}
                city={trip.destination.city}
                nights={trip.nights}
                tripBasePrice={trip.totalPrice}
              />

              {/* 3-Day Itinerary Planner with WhatsApp Sharing */}
              <ItineraryTimeline
                itinerary={trip.itinerary}
                cityName={trip.destination.city}
                totalPrice={trip.totalPrice}
              />

              {/* Activities Section */}
              {trip.activities && trip.activities.length > 0 && (
                <div className="td-card p-6 sm:p-7">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <Ticket className="w-5 h-5 text-td-amber" />
                      <span>🎟️ Qué hacer en {trip.destination.city}</span>
                    </h2>
                    <a
                      href={civitatisUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-td-coral hover:text-td-orange flex items-center gap-1 font-bold"
                    >
                      <span>Ver todas en Civitatis</span>
                    </a>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {trip.activities.map((act) => (
                      <div key={act.name} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                        <img 
                          src={act.image} 
                          alt={act.name} 
                          className="w-20 h-20 rounded-xl object-cover"
                        />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-bold text-sm text-white line-clamp-1">{act.name}</h3>
                            <p className="text-[11px] text-td-muted mt-0.5">{act.duration}</p>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs font-bold text-td-amber">⭐ {act.rating}</span>
                            <span className="text-sm font-extrabold text-white">{act.price} €</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Col: Price Breakdown & Sticky Reservation CTA */}
            <div className="space-y-6">
              <PriceBreakdown 
                flightPrice={trip.flightPrice}
                hotelPrice={trip.hotelPrice}
                totalPrice={finalDisplayTotal}
                budget={demoBudget}
                activities={trip.activities}
                destinationCity={trip.destination.city}
                destCode={trip.outboundFlight.destination.code}
                originCode={trip.outboundFlight.origin.code}
                departureDate={trip.outboundFlight.departure}
                returnDate={trip.returnFlight.departure}
                hotelName={trip.hotel.name}
                carAdded={carAdded}
                carPrice={carPrice}
                insuranceAdded={insuranceAdded}
                insurancePrice={insurancePrice}
              />

              <ShareCard trip={trip} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
