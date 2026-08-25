'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { MOCK_TRIPS } from '@/lib/mock-data';
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
import { ArrowLeft, Ticket, ExternalLink } from 'lucide-react';
import { getCivitatisAffiliateUrl } from '@/lib/affiliate';

export default function TripDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [carAdded, setCarAdded] = useState(false);
  const [carPrice, setCarPrice] = useState(0);
  const [insuranceAdded, setInsuranceAdded] = useState(false);
  const [insurancePrice, setInsurancePrice] = useState(0);

  const trip = MOCK_TRIPS.find((t) => t.id === id);

  if (!trip) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-4 pt-20">
          <h1 className="text-3xl font-bold mb-4">Escapada no encontrada</h1>
          <p className="text-td-muted mb-8 text-center max-w-md">
            Parece que esta escapada ya no está disponible o el enlace es incorrecto.
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
  const finalDisplayTotal = trip.totalPrice + (carAdded ? carPrice : 0);

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
              ← Ver más escapadas
            </Link>

            {trip.weather && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white shadow-sm">
                <span>{trip.weather.icon}</span>
                <span>{trip.weather.temp}°C en {trip.destination.city}</span>
                <span className="text-td-muted font-normal hidden sm:inline">· {trip.weather.text}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Left Column - Main Content */}
            <div className="w-full lg:w-2/3 flex flex-col gap-8">
              
              {/* AI Recommendation Callout */}
              <div className="td-glass p-4 rounded-2xl flex items-start gap-3 border border-td-violet/30 bg-td-violet/5">
                <div className="bg-td-violet/20 p-2 rounded-xl shrink-0 text-base">
                  💡
                </div>
                <p className="text-xs sm:text-sm text-td-primary/90 leading-relaxed pt-0.5">
                  <strong className="text-white font-bold">Por qué recomendamos esta escapada:</strong> {trip.aiExplanation}
                </p>
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
                      🎟️ Qué hacer en {trip.destination.city}
                    </h2>
                    <a
                      href={civitatisUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-td-coral hover:text-td-orange flex items-center gap-1 font-bold"
                    >
                      <span>Ver todas en Civitatis</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {trip.activities.map((activity, idx) => (
                      <div key={idx} className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-sm line-clamp-2 pr-2">{activity.name}</h3>
                          <span className="font-bold text-td-amber">{activity.price} €</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-td-muted mb-4">
                          <span>⏱️ {activity.duration}</span>
                          <span>⭐ {activity.rating}/10</span>
                        </div>
                        <a
                          href={`https://www.civitatis.com/es/buscar?q=${encodeURIComponent(`${activity.name} ${trip.destination.city}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-auto td-glass hover:bg-white/10 text-xs py-2 rounded-lg transition-colors w-full text-center font-semibold flex items-center justify-center gap-1.5"
                        >
                          <span>Ver en Civitatis</span>
                          <ExternalLink className="w-3 h-3 text-td-muted" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <ShareCard trip={trip} />
            </div>

            {/* Right Column - Sticky Sidebar */}
            <div className="w-full lg:w-1/3 lg:sticky lg:top-24 self-start">
              <PriceBreakdown 
                flightPrice={trip.flightPrice}
                hotelPrice={trip.hotelPrice}
                totalPrice={trip.totalPrice}
                budget={demoBudget}
                activities={trip.activities}
                destinationCity={trip.destination.city}
                originCode={trip.outboundFlight.origin.code}
                hotelName={trip.hotel.name}
                carPrice={carPrice}
                carAdded={carAdded}
                insurancePrice={insurancePrice}
                insuranceAdded={insuranceAdded}
              />
            </div>

          </div>
        </div>

        {/* Mobile Floating Sticky Bottom Booking Summary Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B0F1A]/95 backdrop-blur-2xl border-t border-white/15 p-4 shadow-2xl flex items-center justify-between">
          <div>
            <div className="text-[10px] text-td-muted uppercase font-bold">
              Total {trip.hotel.isAirbnb ? 'Airbnb' : 'Hotel'} + Vuelo {carAdded ? '+ Coche' : ''} {insuranceAdded ? '+ Seguro' : ''}
            </div>
            <div className="text-xl font-black td-gradient-text leading-tight">
              {trip.totalPrice + (carAdded ? carPrice : 0) + (insuranceAdded ? insurancePrice : 0)} € <span className="text-xs text-td-muted font-normal">/ pers.</span>
            </div>
          </div>
          <a
            href={civitatisUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="td-btn-primary py-2.5 px-6 text-xs font-black shadow-lg shadow-coral-950/40"
          >
            Reservar Viaje →
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
