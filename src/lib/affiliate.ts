// =========================================================================
// TRAVELDISCOVERY — CENTRALIZED AFFILIATE ENGINE (OPTION A)
// Supports Travelpayouts (Kiwi/Aviasales/Booking), Civitatis, and Direct Booking
// =========================================================================

export const AFFILIATE_CONFIG = {
  // Travelpayouts Marker (All-in-One: Kiwi, Aviasales, WayAway, Hotellook, Booking)
  travelpayoutsMarker: process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER || '612890',
  
  // Civitatis Affiliate Partner ID (Direct Tours & Activities)
  civitatisAffiliateId: process.env.NEXT_PUBLIC_CIVITATIS_AFFILIATE_ID || '14285',
  
  // Booking.com Direct Affiliate AID (if using direct Booking partner program)
  bookingAid: process.env.NEXT_PUBLIC_BOOKING_AFFILIATE_ID || '2418902',
};

/**
 * Builds a direct tracking deeplink to Booking.com with affiliate marker
 */
export function getBookingAffiliateUrl(
  hotelName: string,
  cityName: string,
  checkInDate?: string,
  checkOutDate?: string
): string {
  const query = `${hotelName} ${cityName}`.trim();
  const baseUrl = 'https://www.booking.com/searchresults.es.html';
  
  const params = new URLSearchParams({
    ss: query,
    aid: AFFILIATE_CONFIG.bookingAid,
    label: `td_hotel_${encodeURIComponent(cityName.toLowerCase())}`,
  });

  if (checkInDate) {
    const d = new Date(checkInDate);
    params.set('checkin_year', d.getFullYear().toString());
    params.set('checkin_month', (d.getMonth() + 1).toString());
    params.set('checkin_monthday', d.getDate().toString());
  }

  if (checkOutDate) {
    const d = new Date(checkOutDate);
    params.set('checkout_year', d.getFullYear().toString());
    params.set('checkout_month', (d.getMonth() + 1).toString());
    params.set('checkout_monthday', d.getDate().toString());
  }

  return `${baseUrl}?${params.toString()}`;
}

/**
 * Builds an Airbnb search URL with destination and dates
 */
export function getAirbnbSearchUrl(
  cityName: string,
  checkInDate?: string,
  checkOutDate?: string
): string {
  const baseUrl = `https://www.airbnb.es/s/${encodeURIComponent(cityName)}/homes`;
  const params = new URLSearchParams();

  if (checkInDate) {
    params.set('checkin', checkInDate.split('T')[0]);
  }
  if (checkOutDate) {
    params.set('checkout', checkOutDate.split('T')[0]);
  }

  const qs = params.toString();
  return qs ? `${baseUrl}?${qs}` : baseUrl;
}

/**
 * Builds a flight booking deeplink with Travelpayouts marker (Kiwi / Aviasales / Skyscanner)
 */
export function getFlightBookingAffiliateUrl(
  originCode: string,
  destCode: string,
  departureDate?: string,
  returnDate?: string
): string {
  const dep = departureDate ? departureDate.split('T')[0] : '';
  const ret = returnDate ? returnDate.split('T')[0] : '';

  // Kiwi.com with Travelpayouts affiliate tracking
  const kiwiUrl = new URL('https://www.kiwi.com/es/search/results');
  kiwiUrl.pathname = `/es/search/results/${originCode.toLowerCase()}/${destCode.toLowerCase()}/${dep || 'anytime'}/${ret || 'anytime'}`;
  
  // Inject Travelpayouts marker / affiliate tag
  kiwiUrl.searchParams.set('affilid', AFFILIATE_CONFIG.travelpayoutsMarker);
  kiwiUrl.searchParams.set('marker', AFFILIATE_CONFIG.travelpayoutsMarker);

  return kiwiUrl.toString();
}

/**
 * Builds a Civitatis affiliate deeplink with tracking partner ID
 */
export function getCivitatisAffiliateUrl(
  cityName: string,
  activityName?: string
): string {
  const query = activityName ? `${cityName} ${activityName}` : cityName;
  const baseUrl = 'https://www.civitatis.com/es/buscar';
  
  const params = new URLSearchParams({
    q: query,
    aid: AFFILIATE_CONFIG.civitatisAffiliateId,
    cmp: 'traveldiscovery_app',
  });

  return `${baseUrl}?${params.toString()}`;
}

/**
 * Builds a Car Rental affiliate deeplink with Travelpayouts / DiscoverCars tracking
 */
export function getCarRentalAffiliateUrl(
  cityName: string,
  pickupDate?: string,
  returnDate?: string
): string {
  const baseUrl = 'https://www.discovercars.com/es';
  const params = new URLSearchParams({
    a_aid: AFFILIATE_CONFIG.travelpayoutsMarker,
    city: cityName,
    label: `td_car_${encodeURIComponent(cityName.toLowerCase())}`,
  });

  if (pickupDate) {
    params.set('pickup_date', pickupDate.split('T')[0]);
  }
  if (returnDate) {
    params.set('return_date', returnDate.split('T')[0]);
  }

  return `${baseUrl}?${params.toString()}`;
}
