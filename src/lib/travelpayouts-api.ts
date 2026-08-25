// =========================================================================
// TRAVELDISCOVERY — TRAVELPAYOUTS LIVE FLIGHT API CLIENT
// Connects to Aviasales / Travelpayouts v3 Flight Prices API
// =========================================================================

export interface LiveFlightPrice {
  origin: string;
  destination: string;
  price: number;
  airline: string;
  flightNumber: string;
  departureAt: string;
  returnAt: string;
  transfers: number; // 0 = direct
  link: string;
}

const API_TOKEN = process.env.TRAVELPAYOUTS_API_TOKEN || 'd85fd92624ac6838bbcb76ae11cf55a5';
const MARKER = process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER || '566628';

/**
 * Queries Travelpayouts Live Flight Prices API for cheap round trips
 */
export async function getLiveFlightPrices(
  origin: string,
  destination?: string,
  departDate?: string,
  returnDate?: string
): Promise<LiveFlightPrice[]> {
  try {
    const url = new URL('https://api.travelpayouts.com/aviasales/v3/prices_for_dates');
    url.searchParams.set('origin', origin);
    if (destination) url.searchParams.set('destination', destination);
    if (departDate) url.searchParams.set('departure_at', departDate.split('T')[0]);
    if (returnDate) url.searchParams.set('return_at', returnDate.split('T')[0]);
    url.searchParams.set('currency', 'eur');
    url.searchParams.set('direct', 'false');
    url.searchParams.set('sorting', 'price');
    url.searchParams.set('token', API_TOKEN);

    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 }, // Cache results for 1 hour
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.warn(`Travelpayouts API returned ${response.status}: ${response.statusText}`);
      return [];
    }

    const data = await response.json();

    if (!data.success || !Array.isArray(data.data)) {
      return [];
    }

    return data.data.map((item: any) => ({
      origin: item.origin,
      destination: item.destination,
      price: item.price,
      airline: item.airline,
      flightNumber: `${item.airline}${item.flight_number || ''}`,
      departureAt: item.departure_at,
      returnAt: item.return_at,
      transfers: item.transfers || 0,
      link: `https://www.aviasales.com${item.link}&marker=${MARKER}`,
    }));
  } catch (error) {
    console.error('Error fetching live flight prices from Travelpayouts:', error);
    return [];
  }
}
