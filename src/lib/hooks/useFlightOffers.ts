'use client';

import useSWR from 'swr';
import { useMemo } from 'react';
import { TripCombination, ALL_AIRPORTS } from '@/lib/types';
import { MOCK_TRIPS } from '@/lib/mock-data';

export type FlightDataSource = 'live' | 'mock' | 'empty';

export interface UseFlightOffersParams {
  origin?: string;
  isResident?: boolean;
  nights?: number;
  month?: string;
}

export interface UseFlightOffersResult {
  trips: TripCombination[];
  isLoading: boolean;
  isError: boolean;
  source: FlightDataSource;
  mutate: () => Promise<any>;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Flight API error: ${res.statusText}`);
  }
  return res.json();
};

export function useFlightOffers({
  origin = 'TFS',
  isResident = true,
  nights = 3,
  month = 'Octubre',
}: UseFlightOffersParams = {}): UseFlightOffersResult {
  const cleanOrigin = (origin || 'TFS').toUpperCase().trim();
  const originAirport = ALL_AIRPORTS.find((a) => a.code === cleanOrigin) || ALL_AIRPORTS[0];
  const nightsCount = Number(nights) > 0 ? Number(nights) : 3;

  // Single shared cache key per origin and residency status
  const cacheKey = `/api/flights?origin=${cleanOrigin}&resident=${isResident ? 'true' : 'false'}`;

  const { data, error, isLoading, mutate } = useSWR(cacheKey, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

  const { trips, source } = useMemo(() => {
    let rawTrips: TripCombination[] = [];
    let currentSource: FlightDataSource = 'empty';

    if (data?.success && Array.isArray(data.data) && data.data.length > 0) {
      rawTrips = data.data;
      currentSource = 'live';
    } else if (!isLoading) {
      rawTrips = MOCK_TRIPS.filter(
        (trip) => trip.destination.city.toLowerCase() !== originAirport.city.toLowerCase()
      ).map((trip) => ({
        ...trip,
        outboundFlight: {
          ...trip.outboundFlight,
          origin: originAirport,
        },
        returnFlight: {
          ...trip.returnFlight,
          destination: originAirport,
        },
      }));
      currentSource = rawTrips.length > 0 ? 'mock' : 'empty';
    }

    // Dynamically calculate hotel cost and total price in memory for selected nights
    const adjustedTrips = rawTrips.map((t) => {
      const hotelTotal = t.hotel.nightlyRate * nightsCount;
      const total = t.flightPrice + hotelTotal;
      return {
        ...t,
        nights: nightsCount,
        hotelPrice: hotelTotal,
        totalPrice: total,
        hotel: {
          ...t.hotel,
          totalPrice: hotelTotal,
        },
        aiExplanation: `Oferta desde ${cleanOrigin} a ${t.destination.city}. Vuelo ida y vuelta con ${t.outboundFlight.airline} (${t.flightPrice} €) + ${nightsCount} noches en hotel céntrico (${hotelTotal} €) por ${total} € total.`,
      };
    });

    return { trips: adjustedTrips, source: currentSource };
  }, [data, isLoading, cleanOrigin, originAirport, nightsCount]);

  return {
    trips,
    isLoading,
    isError: !!error,
    source,
    mutate,
  };
}
