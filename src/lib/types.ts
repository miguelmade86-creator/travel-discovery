// ========================================
// TRAVELDISCOVERY — CORE TYPES
// ========================================

export interface Airport {
  code: string;
  name: string;
  city: string;
  island?: string;
  region?: 'canarias' | 'peninsula' | 'baleares';
  flag?: string;
  popular?: boolean;
}

export interface FlightLeg {
  departure: string;      // ISO datetime
  arrival: string;        // ISO datetime
  origin: Airport;
  destination: Airport;
  airline: string;
  airlineLogo?: string;
  flightNumber: string;
  duration: string;       // "2h 45m"
  stops: number;
  cabinBagIncluded: boolean;
  checkedBagIncluded: boolean;
}

export type AccommodationType = 'all' | 'hotel' | 'apartment';

export interface HotelInfo {
  name: string;
  type?: 'hotel' | 'apartment';
  stars: number;
  rating: number;         // 0-10 (Booking / Airbnb-style)
  ratingLabel: string;    // "Fantástico", "Superhost", etc.
  reviewCount: number;
  distanceFromCenter: string; // "400m del centro"
  image: string;
  nightlyRate: number;
  totalPrice: number;
  freeCancellation: boolean;
  breakfastIncluded: boolean;
  // Airbnb & Apartment specific features
  isAirbnb?: boolean;
  hasKitchen?: boolean;
  superhost?: boolean;
  propertyType?: string;  // "Loft completo", "Apartamento de diseño", "Riad privado", "Hotel Boutique"
  bookingPlatform?: 'Booking' | 'Airbnb' | 'Vrbo';
}

export interface ActivitySuggestion {
  name: string;
  price: number;
  duration: string;
  rating: number;
  image?: string;
}

export interface DestinationCost {
  dailyAverage: number;      // e.g. 35 €
  beerPrice: number;         // 2.0 €
  mealPrice: number;         // 12.0 €
  coffeePrice: number;       // 1.5 €
  transportPrice: number;    // 1.8 €
  costTier: 'low' | 'medium' | 'high'; // 'low' (Oporto/Marruecos), 'medium' (Málaga/Valencia), 'high' (París/Roma)
}

export interface DayItinerary {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  tip: string;
}

export interface WeatherForecast {
  temp: number;
  text: string;
  icon: string;
}

export type TravelVibe = 'all' | 'gastronomy' | 'culture' | 'sun' | 'nightlife' | 'romantic';

export type PriceTrend = 'lowest' | 'stable' | 'rising';

export interface TripCombination {
  id: string;
  destination: {
    city: string;
    country: string;
    countryCode: string;
    flag: string;
    image: string;
    description?: string;
  };
  outboundFlight: FlightLeg;
  returnFlight: FlightLeg;
  hotel: HotelInfo;
  flightPrice: number;
  hotelPrice: number;
  totalPrice: number;
  nights: number;
  tripScore: number;
  scores: {
    price: number;
    hotel: number;
    flight: number;
    convenience: number;
    destination: number;
  };
  aiExplanation: string;
  activities?: ActivitySuggestion[];
  curatedActivity?: ActivitySuggestion;
  destinationCost?: DestinationCost;
  itinerary?: DayItinerary[];
  weather?: WeatherForecast;
  tags: string[];           // ["Vuelo directo", "Hotel céntrico", "Mejor precio", "🏡 Airbnb Plus"]
  vibe: TravelVibe;
  priceTrend: PriceTrend;
  savedByUsers?: number;
  priceDropped?: boolean;
  previousPrice?: number;
}

export interface SearchParams {
  budget: number;
  origin: string;          // Airport code
  month: string;
  nights: number;
  travelers: number;
  isResident: boolean;
  accommodation?: AccommodationType;
  vibe?: TravelVibe;
  holiday?: string;
  excludedCities?: string[];
}

export interface SearchFilters {
  sortBy: 'tripScore' | 'price' | 'hotelRating' | 'flightQuality';
  directOnly: boolean;
  accommodation: AccommodationType;
  maxStops: number;
  minHotelRating: number;
  vibe: TravelVibe;
}

// Origin airports - Canary Islands
export const CANARY_AIRPORTS: Airport[] = [
  { code: 'TFS', name: 'Tenerife Sur', city: 'Tenerife', island: 'Tenerife', region: 'canarias', flag: '🌴', popular: true },
  { code: 'TFN', name: 'Tenerife Norte', city: 'Tenerife', island: 'Tenerife', region: 'canarias', flag: '🌴', popular: true },
  { code: 'LPA', name: 'Gran Canaria', city: 'Las Palmas', island: 'Gran Canaria', region: 'canarias', flag: '🌴', popular: true },
  { code: 'ACE', name: 'Lanzarote', city: 'Arrecife', island: 'Lanzarote', region: 'canarias', flag: '🌴', popular: true },
  { code: 'FUE', name: 'Fuerteventura', city: 'Puerto del Rosario', island: 'Fuerteventura', region: 'canarias', flag: '🌴' },
  { code: 'SPC', name: 'La Palma', city: 'Santa Cruz de La Palma', island: 'La Palma', region: 'canarias', flag: '🌴' },
];

// Origin airports - Península
export const PENINSULA_AIRPORTS: Airport[] = [
  { code: 'MAD', name: 'Madrid-Barajas', city: 'Madrid', region: 'peninsula', flag: '🏛️', popular: true },
  { code: 'BCN', name: 'Barcelona-El Prat', city: 'Barcelona', region: 'peninsula', flag: '🌊', popular: true },
  { code: 'AGP', name: 'Málaga-Costa del Sol', city: 'Málaga', region: 'peninsula', flag: '☀️', popular: true },
  { code: 'SVQ', name: 'Sevilla', city: 'Sevilla', region: 'peninsula', flag: '💃', popular: true },
  { code: 'VLC', name: 'Valencia', city: 'Valencia', region: 'peninsula', flag: '🥘', popular: true },
  { code: 'BIO', name: 'Bilbao', city: 'Bilbao', region: 'peninsula', flag: '🌲', popular: true },
  { code: 'ALC', name: 'Alicante-Elche', city: 'Alicante', region: 'peninsula', flag: '⛵' },
  { code: 'SCQ', name: 'Santiago de Compostela', city: 'Santiago', region: 'peninsula', flag: '⛪' },
  { code: 'ZAZ', name: 'Zaragoza', city: 'Zaragoza', region: 'peninsula', flag: '🏰' },
  { code: 'OVD', name: 'Asturias', city: 'Oviedo / Gijón', region: 'peninsula', flag: '⛰️' },
];

// Origin airports - Islas Baleares
export const BALEARIC_AIRPORTS: Airport[] = [
  { code: 'PMI', name: 'Palma de Mallorca', city: 'Mallorca', island: 'Mallorca', region: 'baleares', flag: '🏖️', popular: true },
  { code: 'IBZ', name: 'Ibiza', city: 'Ibiza', island: 'Ibiza', region: 'baleares', flag: '🎉' },
  { code: 'MAH', name: 'Menorca', city: 'Menorca', island: 'Menorca', region: 'baleares', flag: '🩵' },
];

// Combined list of all Spanish Airports
export const ALL_AIRPORTS: Airport[] = [
  ...PENINSULA_AIRPORTS,
  ...CANARY_AIRPORTS,
  ...BALEARIC_AIRPORTS,
];

// High traffic / popular selection for quick picks
export const POPULAR_AIRPORTS: Airport[] = [
  { code: 'MAD', name: 'Madrid-Barajas', city: 'Madrid', region: 'peninsula', flag: '🏛️' },
  { code: 'BCN', name: 'Barcelona-El Prat', city: 'Barcelona', region: 'peninsula', flag: '🌊' },
  { code: 'TFS', name: 'Tenerife Sur', city: 'Tenerife', island: 'Tenerife', region: 'canarias', flag: '🌴' },
  { code: 'LPA', name: 'Gran Canaria', city: 'Las Palmas', island: 'Gran Canaria', region: 'canarias', flag: '🌴' },
  { code: 'AGP', name: 'Málaga', city: 'Málaga', region: 'peninsula', flag: '☀️' },
  { code: 'SVQ', name: 'Sevilla', city: 'Sevilla', region: 'peninsula', flag: '💃' },
  { code: 'VLC', name: 'Valencia', city: 'Valencia', region: 'peninsula', flag: '🥘' },
  { code: 'PMI', name: 'Mallorca', city: 'Mallorca', island: 'Mallorca', region: 'baleares', flag: '🏖️' },
  { code: 'BIO', name: 'Bilbao', city: 'Bilbao', region: 'peninsula', flag: '🌲' },
];

export const MONTHS = [
  'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
];

export const NIGHT_OPTIONS = [
  { value: 2, label: 'Fin de semana', sublabel: '2 noches' },
  { value: 3, label: 'Escapada', sublabel: '3 noches' },
  { value: 4, label: 'Puente', sublabel: '4 noches' },
  { value: 5, label: 'Mini vacaciones', sublabel: '5 noches' },
  { value: 7, label: 'Semana', sublabel: '7 noches' },
];

export const TRAVEL_VIBES = [
  { id: 'all', label: 'Todas las Vibes ✨', emoji: '✨' },
  { id: 'gastronomy', label: 'Tapas & Gastronomía 🥘', emoji: '🥘' },
  { id: 'culture', label: 'Cultura & Museos 🏛️', emoji: '🏛️' },
  { id: 'sun', label: 'Sol & Playa ☀️', emoji: '☀️' },
  { id: 'nightlife', label: 'Fiesta & Noche 🍸', emoji: '🍸' },
  { id: 'romantic', label: 'Escapada Romántica 💑', emoji: '💑' },
];

export const CANARY_HOLIDAYS = [
  { id: 'pilar', name: 'Puente del Pilar', dates: '10 - 13 Octubre', days: 4, month: 'Octubre', emoji: '🎉' },
  { id: 'santos', name: 'Todos los Santos', dates: '31 Oct - 3 Nov', days: 4, month: 'Noviembre', emoji: '🎃' },
  { id: 'constitucion', name: 'Puente Constitución', dates: '5 - 9 Diciembre', days: 5, month: 'Diciembre', emoji: '🎄' },
  { id: 'reyes', name: 'Fin de Año / Reyes', dates: '30 Dic - 2 Ene', days: 4, month: 'Diciembre', emoji: '✨' },
  { id: 'carnaval', name: 'Carnavales', dates: '27 Feb - 3 Mar', days: 5, month: 'Febrero', emoji: '🎭' },
  { id: 'semana-santa', name: 'Semana Santa', dates: '16 - 20 Abril', days: 5, month: 'Abril', emoji: '☀️' },
];
