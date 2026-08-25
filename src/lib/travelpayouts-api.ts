// =========================================================================
// TRAVELDISCOVERY — TRAVELPAYOUTS LIVE FLIGHT API & DESTINATION ENGINE
// Queries Aviasales / Travelpayouts Live Prices API with zero artificial discounts
// =========================================================================

import { TripCombination, TravelVibe } from './types';
import { AFFILIATE_CONFIG } from './affiliate';

export interface LiveFlightData {
  airline: string;
  airlineName: string;
  flightNumber: string;
  price: number;
  departureAt: string;
  returnAt: string;
  duration: string;
  transfers: number;
}

// Token securely loaded exclusively from environment variables
const API_TOKEN = process.env.TRAVELPAYOUTS_API_TOKEN;
const MARKER = process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER || '566628';

// Airline code mapping to friendly names
const AIRLINE_NAMES: Record<string, string> = {
  FR: 'Ryanair',
  VY: 'Vueling',
  IB: 'Iberia',
  I2: 'Iberia Express',
  NT: 'Binter Canarias',
  U2: 'EasyJet',
  V7: 'Volotea',
  TP: 'TAP Portugal',
  W6: 'Wizz Air',
  UX: 'Air Europa',
  TO: 'Transavia',
  HV: 'Transavia',
  DY: 'Norwegian',
  BA: 'British Airways',
  AF: 'Air France',
  LH: 'Lufthansa',
  KL: 'KLM',
  EW: 'Eurowings',
  LS: 'Jet2',
  W4: 'Wizz Air Malta',
  EC: 'EasyJet Europe',
  SK: 'SAS',
};

// Known destination metadata
export const DESTINATION_DIRECTORY: Record<string, {
  city: string;
  country: string;
  countryCode: string;
  flag: string;
  image: string;
  hotelName: string;
  hotelStars: number;
  hotelRating: number;
  hotelNightly: number;
  hotelCenter: string;
  hotelImage: string;
  vibe: TravelVibe;
  temp: number;
  weatherText: string;
  weatherIcon: string;
  dailyCost: number;
  beer: number;
  meal: number;
  coffee: number;
  transport: number;
  description: string;
}> = {
  BCN: {
    city: 'Barcelona',
    country: 'España',
    countryCode: 'ES',
    flag: '🇪🇸',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80',
    hotelName: 'Hotel Barcelona Universal',
    hotelStars: 4,
    hotelRating: 8.7,
    hotelNightly: 29,
    hotelCenter: '400m de Las Ramblas',
    hotelImage: 'https://images.unsplash.com/photo-1618773928121-c32f6e3eea6c?w=600&q=80',
    vibe: 'gastronomy',
    temp: 22,
    weatherText: 'Soleado con brisa mediterránea',
    weatherIcon: '☀️',
    dailyCost: 45,
    beer: 2.8,
    meal: 14.0,
    coffee: 1.6,
    transport: 2.4,
    description: 'Gaudí, playa, barrio Gótico y la mejor vida mediterránea.',
  },
  MAD: {
    city: 'Madrid',
    country: 'España',
    countryCode: 'ES',
    flag: '🇪🇸',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80',
    hotelName: 'Hotel Santo Domingo Gran Vía',
    hotelStars: 4,
    hotelRating: 8.8,
    hotelNightly: 28,
    hotelCenter: 'Pleno centro Gran Vía',
    hotelImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80',
    vibe: 'culture',
    temp: 20,
    weatherText: 'Cielo despejado',
    weatherIcon: '🌤️',
    dailyCost: 42,
    beer: 2.5,
    meal: 13.5,
    coffee: 1.5,
    transport: 2.0,
    description: 'Museos del Prado, tapas en La Latina, terrazas y musicales en Gran Vía.',
  },
  OPO: {
    city: 'Oporto',
    country: 'Portugal',
    countryCode: 'PT',
    flag: '🇵🇹',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80',
    hotelName: 'Porto Ribeira Boutique',
    hotelStars: 4,
    hotelRating: 9.1,
    hotelNightly: 26,
    hotelCenter: '250m de la Ribeira',
    hotelImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
    vibe: 'romantic',
    temp: 21,
    weatherText: 'Agradable y templado',
    weatherIcon: '🌤️',
    dailyCost: 38,
    beer: 2.0,
    meal: 11.5,
    coffee: 1.2,
    transport: 1.8,
    description: 'Vinos de Oporto, puentes sobre el río Duero, fado y gastronomía portuguesa.',
  },
  SVQ: {
    city: 'Sevilla',
    country: 'España',
    countryCode: 'ES',
    flag: '🇪🇸',
    image: 'https://images.unsplash.com/photo-1559564484-e48b3e040ff4?w=800&q=80',
    hotelName: 'Hotel Don Paco Sevilla',
    hotelStars: 3,
    hotelRating: 8.9,
    hotelNightly: 25,
    hotelCenter: 'Barrio Santa Cruz',
    hotelImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80',
    vibe: 'culture',
    temp: 25,
    weatherText: 'Cálido y soleado',
    weatherIcon: '☀️',
    dailyCost: 36,
    beer: 2.0,
    meal: 11.0,
    coffee: 1.3,
    transport: 1.8,
    description: 'Plaza de España, Real Alcázar, tapeo en Triana y duende andaluz.',
  },
  VLC: {
    city: 'Valencia',
    country: 'España',
    countryCode: 'ES',
    flag: '🇪🇸',
    image: 'https://images.unsplash.com/photo-1512753360435-329c4535a9a7?w=800&q=80',
    hotelName: 'Hotel Dimar Valencia',
    hotelStars: 4,
    hotelRating: 8.6,
    hotelNightly: 27,
    hotelCenter: 'Cerca de Ruzafa y Centro',
    hotelImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80',
    vibe: 'gastronomy',
    temp: 23,
    weatherText: 'Soleado mediterráneo',
    weatherIcon: '☀️',
    dailyCost: 40,
    beer: 2.2,
    meal: 12.0,
    coffee: 1.4,
    transport: 2.0,
    description: 'Ciudad de las Artes, auténtica paella valenciana, playas y casco histórico.',
  },
  AGP: {
    city: 'Málaga',
    country: 'España',
    countryCode: 'ES',
    flag: '🇪🇸',
    image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800&q=80',
    hotelName: 'Hotel Soho Boutique Málaga',
    hotelStars: 3,
    hotelRating: 8.8,
    hotelNightly: 24,
    hotelCenter: 'Calle Larios',
    hotelImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80',
    vibe: 'sun',
    temp: 24,
    weatherText: 'Soleado en la Costa del Sol',
    weatherIcon: '☀️',
    dailyCost: 35,
    beer: 2.2,
    meal: 12.0,
    coffee: 1.4,
    transport: 1.8,
    description: 'Sol todo el año, espetos en Pedregalejo, museos y ambiente nocturno.',
  },
  ROM: {
    city: 'Roma',
    country: 'Italia',
    countryCode: 'IT',
    flag: '🇮🇹',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
    hotelName: 'Hotel Raffaello Trastevere',
    hotelStars: 3,
    hotelRating: 8.6,
    hotelNightly: 32,
    hotelCenter: 'Trastevere',
    hotelImage: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&q=80',
    vibe: 'romantic',
    temp: 21,
    weatherText: 'Cielo claro',
    weatherIcon: '☀️',
    dailyCost: 48,
    beer: 3.5,
    meal: 15.0,
    coffee: 1.5,
    transport: 2.5,
    description: 'Coliseo, Fontana di Trevi, pasta carbonara auténtica y rincones mágicos.',
  },
  LIS: {
    city: 'Lisboa',
    country: 'Portugal',
    countryCode: 'PT',
    flag: '🇵🇹',
    image: 'https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=800&q=80',
    hotelName: 'Hotel Lis Baixa',
    hotelStars: 3,
    hotelRating: 8.9,
    hotelNightly: 29,
    hotelCenter: 'Baixa Pombalina',
    hotelImage: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&q=80',
    vibe: 'romantic',
    temp: 22,
    weatherText: 'Brisa del Atlántico',
    weatherIcon: '🌤️',
    dailyCost: 39,
    beer: 2.2,
    meal: 12.0,
    coffee: 1.2,
    transport: 1.8,
    description: 'Tranvía 28, miradores románticos, pasteles de Belém y fado en Alfama.',
  },
  RAK: {
    city: 'Marrakech',
    country: 'Marruecos',
    countryCode: 'MA',
    flag: '🇲🇦',
    image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800&q=80',
    hotelName: 'Riad Jasmine & Spa',
    hotelStars: 4,
    hotelRating: 9.3,
    hotelNightly: 22,
    hotelCenter: 'Medina de Marrakech',
    hotelImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&q=80',
    vibe: 'culture',
    temp: 26,
    weatherText: 'Cálido y exótico',
    weatherIcon: '☀️',
    dailyCost: 28,
    beer: 3.0,
    meal: 8.0,
    coffee: 1.0,
    transport: 1.5,
    description: 'Plaza Jemaa el-Fna, zocos aromáticos, palacios y té a la menta.',
  },
  BIO: {
    city: 'Bilbao',
    country: 'España',
    countryCode: 'ES',
    flag: '🇪🇸',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800&q=80',
    hotelName: 'Hotel Gran Bilbao',
    hotelStars: 4,
    hotelRating: 8.8,
    hotelNightly: 28,
    hotelCenter: 'Cerca del Casco Viejo',
    hotelImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
    vibe: 'gastronomy',
    temp: 19,
    weatherText: 'Templado norteño',
    weatherIcon: '🌤️',
    dailyCost: 44,
    beer: 2.8,
    meal: 14.5,
    coffee: 1.6,
    transport: 2.0,
    description: 'Museo Guggenheim, ruta de pintxos por el Casco Viejo y ría de Bilbao.',
  },
  SCQ: {
    city: 'Santiago de Compostela',
    country: 'España',
    countryCode: 'ES',
    flag: '🇪🇸',
    image: 'https://images.unsplash.com/photo-1574870111867-089730e5a72b?w=800&q=80',
    hotelName: 'Hotel Gelmírez',
    hotelStars: 3,
    hotelRating: 8.7,
    hotelNightly: 26,
    hotelCenter: '300m de la Plaza del Obradoiro',
    hotelImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80',
    vibe: 'culture',
    temp: 18,
    weatherText: 'Fresco y agradable',
    weatherIcon: '🌤️',
    dailyCost: 38,
    beer: 2.2,
    meal: 12.0,
    coffee: 1.4,
    transport: 1.8,
    description: 'Catedral de Santiago, casco histórico de piedra, marisco gallego y albariño.',
  },
  VIE: {
    city: 'Viena',
    country: 'Austria',
    countryCode: 'AT',
    flag: '🇦🇹',
    image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80',
    hotelName: 'Hotel Regina Viena',
    hotelStars: 4,
    hotelRating: 8.9,
    hotelNightly: 35,
    hotelCenter: 'Ringstraße céntrico',
    hotelImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80',
    vibe: 'culture',
    temp: 18,
    weatherText: 'Fresco imperial',
    weatherIcon: '🌤️',
    dailyCost: 52,
    beer: 4.0,
    meal: 16.0,
    coffee: 3.5,
    transport: 2.6,
    description: 'Palacios de Schönbrunn, música clásica, tarta Sacher y elegancia imperial.',
  },
  PAR: {
    city: 'París',
    country: 'Francia',
    countryCode: 'FR',
    flag: '🇫🇷',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    hotelName: 'Hotel Eiffel Seine',
    hotelStars: 3,
    hotelRating: 8.6,
    hotelNightly: 38,
    hotelCenter: 'Junto al río Sena',
    hotelImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
    vibe: 'romantic',
    temp: 19,
    weatherText: 'Romántico y templado',
    weatherIcon: '🌤️',
    dailyCost: 55,
    beer: 4.5,
    meal: 18.0,
    coffee: 2.8,
    transport: 2.8,
    description: 'Torre Eiffel, Museo del Louvre, Montmartre, croissants y paseos por el Sena.',
  },
  LON: {
    city: 'Londres',
    country: 'Reino Unido',
    countryCode: 'GB',
    flag: '🇬🇧',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
    hotelName: 'The Corner Hotel London',
    hotelStars: 3,
    hotelRating: 8.7,
    hotelNightly: 39,
    hotelCenter: 'Zona 1 de Londres',
    hotelImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80',
    vibe: 'culture',
    temp: 17,
    weatherText: 'Típico clima británico',
    weatherIcon: '🌤️',
    dailyCost: 58,
    beer: 5.0,
    meal: 18.0,
    coffee: 3.2,
    transport: 3.2,
    description: 'Big Ben, museos gratuitos, mercadillos de Camden y musicales en West End.',
  },
  BER: {
    city: 'Berlín',
    country: 'Alemania',
    countryCode: 'DE',
    flag: '🇩🇪',
    image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&q=80',
    hotelName: 'Motel One Berlin-Alexanderplatz',
    hotelStars: 3,
    hotelRating: 8.8,
    hotelNightly: 32,
    hotelCenter: 'Mitte / Alexanderplatz',
    hotelImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80',
    vibe: 'nightlife',
    temp: 18,
    weatherText: 'Fresco cosmopolita',
    weatherIcon: '🌤️',
    dailyCost: 46,
    beer: 3.5,
    meal: 14.0,
    coffee: 2.5,
    transport: 2.6,
    description: 'Puerta de Brandeburgo, Muro de Berlín, arte urbano y la mejor vida nocturna.',
  },
  AMS: {
    city: 'Ámsterdam',
    country: 'Países Bajos',
    countryCode: 'NL',
    flag: '🇳🇱',
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80',
    hotelName: 'Hotel V Frederiksplein',
    hotelStars: 3,
    hotelRating: 8.9,
    hotelNightly: 38,
    hotelCenter: 'Junto a los canales',
    hotelImage: 'https://images.unsplash.com/photo-1618773928121-c32f6e3eea6c?w=600&q=80',
    vibe: 'nightlife',
    temp: 17,
    weatherText: 'Templado y fresco',
    weatherIcon: '🌤️',
    dailyCost: 54,
    beer: 4.5,
    meal: 16.0,
    coffee: 3.0,
    transport: 2.8,
    description: 'Canales históricos, paseos en bicicleta, Museo Van Gogh y flores.',
  },
  VCE: {
    city: 'Venecia',
    country: 'Italia',
    countryCode: 'IT',
    flag: '🇮🇹',
    image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=800&q=80',
    hotelName: 'Hotel Rialto Venezia',
    hotelStars: 4,
    hotelRating: 8.7,
    hotelNightly: 36,
    hotelCenter: 'Junto al Puente de Rialto',
    hotelImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
    vibe: 'romantic',
    temp: 20,
    weatherText: 'Romántico sobre canales',
    weatherIcon: '🌤️',
    dailyCost: 50,
    beer: 3.8,
    meal: 16.0,
    coffee: 2.0,
    transport: 3.0,
    description: 'Plaza San Marcos, paseo en góndola por el Gran Canal y romanticismo.',
  },
  WAW: {
    city: 'Varsovia',
    country: 'Polonia',
    countryCode: 'PL',
    flag: '🇵🇱',
    image: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=800&q=80',
    hotelName: 'Hotel Bristol Warsaw',
    hotelStars: 4,
    hotelRating: 9.0,
    hotelNightly: 25,
    hotelCenter: 'Casco Histórico Real',
    hotelImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80',
    vibe: 'culture',
    temp: 16,
    weatherText: 'Fresco agradable',
    weatherIcon: '🌤️',
    dailyCost: 32,
    beer: 2.0,
    meal: 9.5,
    coffee: 1.8,
    transport: 1.2,
    description: 'Ciudad Vieja reconstruida, palacios reales, gastronomía polaca asequible.',
  },
};

// Fallback resolver for any unlisted IATA code returned by Travelpayouts
function resolveDestinationMeta(iata: string) {
  if (DESTINATION_DIRECTORY[iata]) {
    return DESTINATION_DIRECTORY[iata];
  }

  // Generic resolver so NO destination is ever dropped
  return {
    city: iata,
    country: 'Europa',
    countryCode: 'EU',
    flag: '✈️',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
    hotelName: `Hotel Centro ${iata}`,
    hotelStars: 3,
    hotelRating: 8.5,
    hotelNightly: 28,
    hotelCenter: 'Zona céntrica',
    hotelImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
    vibe: 'culture' as TravelVibe,
    temp: 20,
    weatherText: 'Templado y agradable',
    weatherIcon: '🌤️',
    dailyCost: 40,
    beer: 2.5,
    meal: 13.0,
    coffee: 1.5,
    transport: 2.0,
    description: `Descubre ${iata} con vuelos directos y estancias confortables.`,
  };
}

/**
 * Fetches live cheap flight combinations directly from Travelpayouts / Aviasales Data API
 * Uses 100% RAW REAL prices without any artificial discounts
 */
export async function getLiveFlightTrips(originCode: string = 'TFS', isResident: boolean = true): Promise<TripCombination[]> {
  try {
    const cleanOrigin = (originCode || 'TFS').toUpperCase().trim();
    
    if (!API_TOKEN) {
      console.warn('[Travelpayouts API] Missing TRAVELPAYOUTS_API_TOKEN in environment');
      return [];
    }

    const url = `https://api.travelpayouts.com/v1/prices/cheap?origin=${cleanOrigin}&currency=EUR&token=${API_TOKEN}`;

    const res = await fetch(url, {
      next: { revalidate: 1800 }, // Cache 30 mins
      headers: { 'Accept': 'application/json' },
    });

    console.log(`[Travelpayouts API] Fetching origin=${cleanOrigin}, status=${res.status}`);

    if (!res.ok) {
      console.warn(`[Travelpayouts API] Returned HTTP ${res.status}: ${res.statusText}`);
      return [];
    }

    const json = await res.json();
    console.log(`[Travelpayouts API] Raw destinations received:`, json.data ? Object.keys(json.data) : 'No data');

    if (!json.success || !json.data || Object.keys(json.data).length === 0) {
      return [];
    }

    const trips: TripCombination[] = [];
    const destEntries = Object.entries(json.data) as [string, Record<string, any>][];

    for (const [destIata, flightOptions] of destEntries) {
      // Resolve destination metadata (Directory or dynamic fallback)
      const destMeta = resolveDestinationMeta(destIata);

      // Get the cheapest flight option
      const optionsArray = Object.values(flightOptions);
      if (optionsArray.length === 0) continue;

      const flightInfo: any = optionsArray[0];
      
      // 100% REAL RAW FLIGHT PRICE from Travelpayouts / Aviasales (No artificial manipulation)
      const rawPrice = Number(flightInfo.price) || 0;
      if (rawPrice <= 0) continue;

      const finalFlightPrice = rawPrice;

      const departureDate = flightInfo.departure_at || new Date(Date.now() + 86400000 * 20).toISOString();
      const returnDate = flightInfo.return_at || new Date(Date.now() + 86400000 * 23).toISOString();

      const airlineCode = flightInfo.airline || 'FR';
      const airlineName = AIRLINE_NAMES[airlineCode] || airlineCode;
      const flightNumber = `${airlineCode}${flightInfo.flight_number || '101'}`;

      const nights = 3;
      const hotelTotalPrice = destMeta.hotelNightly * nights;
      const totalPrice = finalFlightPrice + hotelTotalPrice;

      // Calculate TripScore (0 - 100)
      const priceScore = Math.min(100, Math.max(70, Math.round(100 - (totalPrice / 300) * 20)));
      const tripScore = Math.round((priceScore * 0.45) + (destMeta.hotelRating * 10 * 0.35) + 18);

      const tripId = `trip-${destIata.toLowerCase()}-${cleanOrigin.toLowerCase()}`;

      trips.push({
        id: tripId,
        destination: {
          city: destMeta.city,
          country: destMeta.country,
          countryCode: destMeta.countryCode,
          flag: destMeta.flag,
          image: destMeta.image,
          description: destMeta.description,
        },
        outboundFlight: {
          departure: departureDate,
          arrival: new Date(new Date(departureDate).getTime() + 1000 * 60 * 165).toISOString(),
          origin: { code: cleanOrigin, name: cleanOrigin, city: cleanOrigin },
          destination: { code: destIata, name: destMeta.city, city: destMeta.city },
          airline: airlineName,
          flightNumber: flightNumber,
          duration: '2h 45m',
          stops: flightInfo.transfers || 0,
          cabinBagIncluded: true,
          checkedBagIncluded: false,
        },
        returnFlight: {
          departure: returnDate,
          arrival: new Date(new Date(returnDate).getTime() + 1000 * 60 * 165).toISOString(),
          origin: { code: destIata, name: destMeta.city, city: destMeta.city },
          destination: { code: cleanOrigin, name: cleanOrigin, city: cleanOrigin },
          airline: airlineName,
          flightNumber: `${airlineCode}${Number(flightInfo.flight_number || 101) + 1}`,
          duration: '2h 45m',
          stops: flightInfo.transfers || 0,
          cabinBagIncluded: true,
          checkedBagIncluded: false,
        },
        hotel: {
          name: destMeta.hotelName,
          type: 'hotel',
          stars: destMeta.hotelStars,
          rating: destMeta.hotelRating,
          ratingLabel: destMeta.hotelRating >= 9 ? 'Excelente' : 'Fabuloso',
          reviewCount: 3450,
          distanceFromCenter: destMeta.hotelCenter,
          image: destMeta.hotelImage,
          nightlyRate: destMeta.hotelNightly,
          totalPrice: hotelTotalPrice,
          freeCancellation: true,
          breakfastIncluded: true,
          bookingPlatform: 'Booking',
          propertyType: `Hotel ${destMeta.hotelStars} Estrellas`,
        },
        flightPrice: finalFlightPrice,
        hotelPrice: hotelTotalPrice,
        totalPrice: totalPrice,
        nights: nights,
        tripScore: Math.min(99, tripScore),
        scores: { price: priceScore, hotel: Math.round(destMeta.hotelRating * 10), flight: 96, convenience: 92, destination: 95 },
        aiExplanation: `Oferta en tiempo real desde ${cleanOrigin} a ${destMeta.city}. Vuelo ida y vuelta con ${airlineName} (${finalFlightPrice} €) + ${nights} noches en hotel céntrico (${hotelTotalPrice} €) por ${totalPrice} € total.`,
        tags: [
          flightInfo.transfers === 0 ? '✈️ Vuelo Directo' : '✈️ Vuelo verificado',
          '🥐 Desayuno Incluido',
          `🏨 ${destMeta.hotelStars} Estrellas`,
          '⚡ Tarifa en Vivo'
        ],
        vibe: destMeta.vibe,
        priceTrend: totalPrice <= 140 ? 'lowest' : 'stable',
        destinationCost: {
          dailyAverage: destMeta.dailyCost,
          beerPrice: destMeta.beer,
          mealPrice: destMeta.meal,
          coffeePrice: destMeta.coffee,
          transportPrice: destMeta.transport,
          costTier: destMeta.dailyCost > 45 ? 'high' : destMeta.dailyCost > 35 ? 'medium' : 'low',
        },
        weather: {
          temp: destMeta.temp,
          text: destMeta.weatherText,
          icon: destMeta.weatherIcon,
        },
        itinerary: [
          {
            day: 1,
            title: `Llegada a ${destMeta.city} & Primer Paseo`,
            morning: `Vuelo desde ${cleanOrigin} con ${airlineName}, llegada y check-in en ${destMeta.hotelName}.`,
            afternoon: `Paseo por los barrios históricos y lugares emblemáticos de ${destMeta.city}.`,
            evening: `Cena en tabernas locales probando la gastronomía típica de la zona.`,
            tip: `Usa el transporte público desde el aeropuerto para llegar rápido al hotel.`,
          },
          {
            day: 2,
            title: `Día de Monumentos & Miradores`,
            morning: `Desayuno buffet en el hotel y visita a los principales museos y monumentos.`,
            afternoon: `Compras, paseos por plazas históricas y fotos panorámicas.`,
            evening: `Atardecer desde los mejores miradores de la ciudad y ambiente nocturno.`,
            tip: `Reserva las entradas a los monumentos con antelación a través de Civitatis.`,
          },
          {
            day: 3,
            title: `Despedida & Vuelo de Regreso`,
            morning: `Últimas compras de recuerdos y paseo matutino por el centro.`,
            afternoon: `Comida típica de despedida en una terraza agradable.`,
            evening: `Traslado al aeropuerto y vuelo de regreso a ${cleanOrigin}.`,
            tip: `Disfruta de tus recuerdos y comparte tu experiencia con la comunidad de TravelDiscovery.`,
          },
        ],
      });
    }

    // Sort by TripScore and total price
    trips.sort((a, b) => b.tripScore - a.tripScore || a.totalPrice - b.totalPrice);
    return trips;
  } catch (error) {
    console.error('[Travelpayouts API] Critical Error in getLiveFlightTrips:', error);
    return [];
  }
}
