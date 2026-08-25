'use client';

import useSWR from 'swr';
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

  const queryParams = new URLSearchParams({
    origin: cleanOrigin,
    resident: isResident ? 'true' : 'false',
    nights: (Number(nights) || 3).toString(),
    month: month || 'Octubre',
  });

  const cacheKey = `/api/flights?${queryParams.toString()}`;

  const { data, error, isLoading, mutate } = useSWR(cacheKey, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000, // 1 minute cache deduplication across components
  });

  // Determine the source and data
  let trips: TripCombination[] = [];
  let source: FlightDataSource = 'empty';

  if (data?.success && Array.isArray(data.data) && data.data.length > 0) {
    trips = data.data;
    source = 'live';
  } else if (!isLoading) {
    // Graceful fallback to curated trips without mutating prices
    trips = MOCK_TRIPS.filter(
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
    source = trips.length > 0 ? 'mock' : 'empty';
  }

  return {
    trips,
    isLoading,
    isError: !!error,
    source,
    mutate,
  };
}
