// ========================================
// TRAVELDISCOVERY — SOCIAL PROOF & FAQS
// ========================================

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  destination: string;
  flag: string;
  price: number;
  nights: number;
  quote: string;
  date: string;
}

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Carlos M.',
    location: 'Santa Cruz de Tenerife',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
    destination: 'Milán',
    flag: '🇮🇹',
    price: 148,
    nights: 3,
    quote: 'Puse 150 € y no me creía que pudiera ir a Milán con hotel céntrico. El vuelo directo fue comodísimo.',
    date: 'Hace 2 semanas',
  },
  {
    id: 't-2',
    name: 'Marcos R.',
    location: 'Madrid',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    destination: 'Oporto',
    flag: '🇵🇹',
    price: 98,
    nights: 3,
    quote: 'Salí un viernes desde Barajas. Por 98 € tuve vuelo directo y hotel boutique junto al río Duero en Ribeira.',
    date: 'Hace 5 días',
  },
  {
    id: 't-3',
    name: 'Elena & Javi',
    location: 'Las Palmas de Gran Canaria',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80',
    destination: 'Barcelona',
    flag: '🇪🇸',
    price: 129,
    nights: 3,
    quote: 'Con el descuento de residente el vuelo nos costó poquísimo y nos alojamos en un 4 estrellas con desayuno buffet.',
    date: 'Hace 4 días',
  },
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    question: '¿Cómo funciona el buscador por presupuesto?',
    answer: 'En lugar de obligarte a elegir un destino primero, nos dices cuánto quieres gastar (ej. 150 €), cuántas noches y desde qué isla sales. Nuestro motor cruza vuelos directos y hoteles con alta puntuación (>8/10) para darte viajes reales completos dentro de tu presupuesto.',
  },
  {
    question: '¿Cómo se aplica el descuento de residente canario del 75%?',
    answer: 'Al activar la casilla "Soy residente canario", aplicamos automáticamente la bonificación estatal del 75% en las tarifas aéreas de rutas a la Península (Madrid, Barcelona, Sevilla, etc.) y vuelos interinsulares. Las rutas internacionales (Londres, Milán, Lisboa) se calculan con tarifa estándar sin subvención.',
  },
  {
    question: '¿Los precios mostrados son finales o tienen costes ocultos?',
    answer: 'Mostramos el precio total estimado (Vuelo ida/vuelta + Hotel por persona). No cobramos comisiones de gestión. Al pulsar "Ver Escapada", te redirigimos directamente a las aerolíneas y a Booking/Agoda con las fechas y parámetros exactos precargados.',
  },
  {
    question: '¿Qué incluye la función "Sorpréndeme"?',
    answer: 'Es nuestro selector inteligente de escapadas. Analiza todas las combinaciones posibles dentro de tu presupuesto, calcula la mejor relación calidad-precio (TripScore) y te presenta una propuesta lista para reservar con justificación automática.',
  },
  {
    question: '¿Puedo recibir alertas si una escapada baja de precio?',
    answer: 'Sí. Puedes guardar cualquier viaje o ruta en tus favoritos o configurar una alerta indicando tu precio objetivo. Te avisaremos en cuanto detectemos una bajada de tarifa.',
  },
];

export const TRUST_STATS = [
  { value: '140 €', label: 'Presupuesto medio', sublabel: 'Vuelo + Hotel 3 noches' },
  { value: '8.6/10', label: 'Puntuación hotelera', sublabel: 'Solo hoteles céntricos verificados' },
  { value: '75%', label: 'Descuento residente', sublabel: 'Integrado en rutas nacionales' },
  { value: '100%', label: 'Transparente', sublabel: 'Sin comisiones ocultas' },
];
