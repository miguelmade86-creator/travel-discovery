'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Moon, 
  Users, 
  Plus, 
  Minus, 
  Check, 
  Dice5,
  ChevronDown,
  PlaneTakeoff,
  Briefcase,
  Coffee,
  SlidersHorizontal,
  Flame,
  ArrowRight,
  Home,
  Building
} from 'lucide-react';
import Link from 'next/link';
import { ALL_AIRPORTS, POPULAR_AIRPORTS, CANARY_AIRPORTS, MONTHS, NIGHT_OPTIONS, TRAVEL_VIBES, TravelVibe, AccommodationType } from '@/lib/types';

interface SleekSearchConsoleProps {
  budget: number;
  onBudgetChange: (val: number) => void;
  origin: string;
  onOriginChange: (code: string) => void;
  month: string;
  onMonthChange: (month: string) => void;
  nights: number;
  onNightsChange: (nights: number) => void;
  travelers: number;
  onTravelersChange: (count: number) => void;
  isResident: boolean;
  onResidentToggle: () => void;
  onSurpriseClick: () => void;
  searchUrl: string;
}

const BUDGET_PRESETS = [100, 125, 150, 180, 220, 300];

export default function SleekSearchConsole({
  budget,
  onBudgetChange,
  origin,
  onOriginChange,
  month,
  onMonthChange,
  nights,
  onNightsChange,
  travelers,
  onTravelersChange,
  isResident,
  onResidentToggle,
  onSurpriseClick,
  searchUrl,
}: SleekSearchConsoleProps) {
  const [isTravelersOpen, setIsTravelersOpen] = useState(false);
  const [directOnly, setDirectOnly] = useState(true);
  const [breakfastOnly, setBreakfastOnly] = useState(false);
  const [selectedVibe, setSelectedVibe] = useState<TravelVibe>('all');
  const [accommodation, setAccommodation] = useState<AccommodationType>('all');
  const travelersRef = useRef<HTMLDivElement>(null);

  const selectedAirport = ALL_AIRPORTS.find((a) => a.code === origin) || POPULAR_AIRPORTS[0];

  // Close travelers popover on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (travelersRef.current && !travelersRef.current.contains(event.target as Node)) {
        setIsTravelersOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getBudgetMood = (val: number) => {
    if (val <= 115) return { label: 'Ganga', color: 'text-emerald-400' };
    if (val <= 160) return { label: 'Escapada Smart', color: 'text-td-coral' };
    if (val <= 220) return { label: 'Fin de Semana Top', color: 'text-td-violet' };
    return { label: 'Viajazo VIP', color: 'text-amber-400' };
  };

  const mood = getBudgetMood(budget);

  // Dynamic URL construction with all filters including accommodation type
  const computedSearchUrl = `${searchUrl}&direct=${directOnly}&breakfast=${breakfastOnly}&vibe=${selectedVibe}&accommodation=${accommodation}`;

  const getTravelerLabel = (num: number) => {
    if (num === 1) return '1 persona · Solo';
    if (num === 2) return '2 personas · Pareja';
    if (num === 3) return '3 personas · Amigos';
    if (num === 4) return '4 personas · Grupo';
    return `${num} personas · Familia`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Outer Floating Glow Frame */}
      <div className="relative rounded-[32px] p-[1px] bg-gradient-to-b from-white/20 via-white/10 to-white/5 shadow-[0_24px_64px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
        
        {/* Main Sleek Console Card */}
        <div className="bg-[#0D1220]/95 rounded-[31px] p-5 sm:p-7 flex flex-col gap-5 relative overflow-visible">
          
          {/* Subtle Top Accent Beam */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-td-coral to-transparent opacity-70" />

          {/* =========================================================================
              ROW 1: THE BUDGET & ORIGIN COMMAND BAR
             ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            
            {/* Left: The Budget Dial (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col gap-3 bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-bold tracking-wider text-td-muted">
                    Presupuesto por persona
                  </span>
                  <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 ${mood.color}`}>
                    {mood.label}
                  </span>
                </div>
                <span className="text-xs text-td-secondary font-medium">Vuelo + Alojamiento</span>
              </div>

              {/* Big Clean Number & Preset Pills */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
                <div className="flex items-baseline gap-2">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={budget}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="text-4xl sm:text-5xl font-black td-gradient-text tracking-tight leading-none"
                    >
                      {budget} €
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-xs text-td-muted font-semibold">máximo todo incl.</span>
                </div>

                {/* Preset Fast Chips */}
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                  {BUDGET_PRESETS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => onBudgetChange(p)}
                      className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all shrink-0 ${
                        budget === p
                          ? 'bg-td-coral text-[#0B0F1A] shadow-md shadow-coral-900/40 scale-105'
                          : 'bg-white/5 text-td-secondary hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {p === 300 ? '300€+' : `${p}€`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ultra-Fine Tactile Range Slider */}
              <div className="pt-1">
                <input
                  type="range"
                  min="60"
                  max="350"
                  step="5"
                  value={budget}
                  onChange={(e) => onBudgetChange(Number(e.target.value))}
                  className="td-slider w-full cursor-pointer"
                  aria-label="Presupuesto"
                />
              </div>
            </div>

            {/* Right: Island & Peninsula Origin Selector (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-2 bg-white/[0.03] border border-white/10 rounded-2xl p-3.5 sm:p-4 h-full justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <PlaneTakeoff className="w-4 h-4 text-td-amber" />
                  <span className="text-xs uppercase font-bold tracking-wider text-td-muted">
                    Salida desde España
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[11px] text-td-coral font-bold font-mono">
                    {selectedAirport.code}
                  </span>
                  <span className="text-[11px] text-td-muted hidden sm:inline">
                    · {selectedAirport.city}
                  </span>
                </div>
              </div>

              {/* Top 6 Popular Hub Pills */}
              <div className="grid grid-cols-6 gap-1 pt-0.5">
                {POPULAR_AIRPORTS.slice(0, 6).map((airport) => {
                  const isSelected = origin === airport.code;
                  return (
                    <button
                      key={airport.code}
                      type="button"
                      onClick={() => onOriginChange(airport.code)}
                      className={`py-1.5 px-1 rounded-xl text-center border transition-all flex flex-col items-center justify-center ${
                        isSelected
                          ? 'bg-td-coral/20 border-td-coral/60 text-white shadow-md shadow-coral-950/40'
                          : 'bg-white/[0.02] border-white/5 text-td-secondary hover:bg-white/[0.06] hover:text-white'
                      }`}
                      title={`${airport.name} (${airport.city})`}
                    >
                      <span className={`text-[11px] font-black font-mono leading-tight ${isSelected ? 'text-td-coral' : 'text-white'}`}>
                        {airport.code}
                      </span>
                      <span className="text-[8px] text-td-muted truncate max-w-full">
                        {airport.city}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Full Dropdown for all Spanish Airports (Canarias, Península, Baleares) */}
              <div className="pt-0.5">
                <select
                  value={origin}
                  onChange={(e) => onOriginChange(e.target.value)}
                  className="w-full bg-[#070A12] border border-white/10 rounded-xl px-2.5 py-1.5 text-[11px] font-semibold text-td-secondary hover:text-white outline-none cursor-pointer"
                  aria-label="Seleccionar otro aeropuerto de origen"
                >
                  <optgroup label="✨ Principales">
                    {POPULAR_AIRPORTS.map((a) => (
                      <option key={`pop-${a.code}`} value={a.code} className="bg-[#0B0F1A] text-white">
                        {a.flag} {a.name} ({a.code})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="🌴 Islas Canarias">
                    {CANARY_AIRPORTS.map((a) => (
                      <option key={`can-${a.code}`} value={a.code} className="bg-[#0B0F1A] text-white">
                        🌴 {a.name} ({a.code})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="🇪🇸 Península & Baleares">
                    {ALL_AIRPORTS.filter((a) => a.region !== 'canarias').map((a) => (
                      <option key={`pen-${a.code}`} value={a.code} className="bg-[#0B0F1A] text-white">
                        {a.flag || '✈️'} {a.name} ({a.code})
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>

          </div>

          {/* =========================================================================
              ROW 2: DATES, TRAVELERS (PERSONAS) & RESIDENT DISCOUNT
             ========================================================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center pt-1">
            
            {/* Month & Duration Pill (5 Cols) */}
            <div className="lg:col-span-5 flex items-center gap-2 bg-white/[0.03] border border-white/10 rounded-2xl p-3 px-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-td-muted">
                  <Calendar className="w-3.5 h-3.5 text-td-violet" />
                  <span>Mes</span>
                </div>
                <select
                  value={month}
                  onChange={(e) => onMonthChange(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm font-bold text-white outline-none w-full cursor-pointer appearance-none mt-1"
                >
                  {MONTHS.map((m) => (
                    <option key={m} value={m} className="bg-[#0B0F1A] text-white">
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-px h-7 bg-white/10 mx-1" />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-td-muted">
                  <Moon className="w-3.5 h-3.5 text-td-cyan" />
                  <span>Estancia</span>
                </div>
                <select
                  value={nights}
                  onChange={(e) => onNightsChange(Number(e.target.value))}
                  className="bg-transparent text-xs sm:text-sm font-bold text-white outline-none w-full cursor-pointer appearance-none mt-1"
                >
                  {NIGHT_OPTIONS.slice(0, 4).map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-[#0B0F1A] text-white">
                      {opt.value} noches ({opt.label})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* PERSONAS / TRAVELERS SELECTOR (4 Cols with Dropdown Popover) */}
            <div ref={travelersRef} className="lg:col-span-4 relative">
              <button
                type="button"
                onClick={() => setIsTravelersOpen(!isTravelersOpen)}
                className="w-full flex items-center justify-between p-3 px-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-all text-left"
              >
                <div className="flex flex-col min-w-0 pr-1">
                  <span className="text-[10px] uppercase font-bold text-td-muted flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-td-amber" />
                    <span>Viajeros</span>
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-white truncate mt-1">
                    {getTravelerLabel(travelers)}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-td-muted transition-transform shrink-0 ${isTravelersOpen ? 'rotate-180 text-td-coral' : ''}`} />
              </button>

              {/* Travelers Popover Menu */}
              <AnimatePresence>
                {isTravelersOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute top-full left-0 right-0 mt-2 p-4 bg-[#0C101D] border border-white/20 rounded-2xl shadow-2xl z-50 flex flex-col gap-3 min-w-[260px]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Número de personas</span>
                      <div className="flex items-center gap-2.5 bg-white/5 p-1 rounded-xl border border-white/10">
                        <button
                          type="button"
                          onClick={() => onTravelersChange(Math.max(1, travelers - 1))}
                          disabled={travelers <= 1}
                          className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 flex items-center justify-center text-white transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-black text-white w-4 text-center">{travelers}</span>
                        <button
                          type="button"
                          onClick={() => onTravelersChange(Math.min(6, travelers + 1))}
                          disabled={travelers >= 6}
                          className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 flex items-center justify-center text-white transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Quick presets */}
                    <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-white/10">
                      {[
                        { num: 1, label: 'Solo 👤' },
                        { num: 2, label: 'Pareja 👥' },
                        { num: 3, label: '3 Amigos 🍻' },
                        { num: 4, label: 'Familia 👨‍👩‍👧' },
                      ].map((item) => (
                        <button
                          key={item.num}
                          type="button"
                          onClick={() => {
                            onTravelersChange(item.num);
                            setIsTravelersOpen(false);
                          }}
                          className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center ${
                            travelers === item.num
                              ? 'bg-td-coral text-[#0B0F1A] shadow-md shadow-coral-950/40'
                              : 'bg-white/5 text-td-secondary hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Resident Canary Switch (3 Cols) */}
            <div 
              onClick={onResidentToggle}
              className={`lg:col-span-3 flex items-center justify-between p-3 px-4 rounded-2xl border cursor-pointer transition-all ${
                isResident
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-white'
                  : 'bg-white/[0.02] border-white/10 text-td-muted hover:bg-white/[0.05]'
              }`}
            >
              <div className="flex flex-col min-w-0 pr-1">
                <span className="text-xs font-bold flex items-center gap-1.5 truncate">
                  <span>🏝️</span>
                  <span>Residente Canario</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-bold mt-0.5">-75% en vuelos nac.</span>
              </div>
              
              <div className={`w-8 h-5 rounded-full p-0.5 transition-colors shrink-0 ${isResident ? 'bg-emerald-500' : 'bg-white/20'}`}>
                <div className={`w-4 h-4 rounded-full bg-[#0B0F1A] shadow-md transition-transform ${isResident ? 'translate-x-3' : 'translate-x-0'}`} />
              </div>
            </div>

          </div>

          {/* =========================================================================
              ROW 3: PRIMARY ACTION BAR (ALOJAMIENTO AIRBNB/HOTEL + HERO BUSCAR + RULETA)
             ========================================================================= */}
          <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Left: Quick Preferences (Alojamiento: Hoteles / Airbnb, Directos, Desayuno, Vibe) */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              
              {/* Accommodation Type Selector (Hoteles / Airbnb / Ambos) */}
              <div className="flex items-center gap-1 bg-white/[0.03] border border-white/10 rounded-xl p-0.5">
                <button
                  type="button"
                  onClick={() => setAccommodation('all')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    accommodation === 'all'
                      ? 'bg-white/15 text-white'
                      : 'text-td-muted hover:text-white'
                  }`}
                  title="Buscar tanto en Hoteles como en Airbnb"
                >
                  ✨ Todos
                </button>
                <button
                  type="button"
                  onClick={() => setAccommodation('hotel')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    accommodation === 'hotel'
                      ? 'bg-td-coral/20 text-td-coral font-black border border-td-coral/30'
                      : 'text-td-muted hover:text-white'
                  }`}
                  title="Solo buscar Hoteles verificados"
                >
                  <Building className="w-3 h-3" />
                  <span>Hoteles</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAccommodation('apartment')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    accommodation === 'apartment'
                      ? 'bg-rose-500/20 text-rose-300 font-black border border-rose-500/40'
                      : 'text-td-muted hover:text-white'
                  }`}
                  title="Solo buscar Airbnb y Apartamentos con cocina"
                >
                  <Home className="w-3 h-3 text-rose-400" />
                  <span>Airbnb</span>
                </button>
              </div>

              {/* Direct Flights Toggle */}
              <button
                type="button"
                onClick={() => setDirectOnly(!directOnly)}
                className={`px-2.5 py-1.5 rounded-xl border text-xs transition-all flex items-center gap-1 font-bold ${
                  directOnly
                    ? 'bg-td-coral/15 border-td-coral/40 text-td-coral'
                    : 'bg-white/[0.02] border-white/10 text-td-muted hover:text-white'
                }`}
              >
                <span>✈️</span>
                <span>Directos</span>
                {directOnly && <Check className="w-3 h-3 text-td-coral" />}
              </button>

              {/* Breakfast Included Toggle */}
              <button
                type="button"
                onClick={() => setBreakfastOnly(!breakfastOnly)}
                className={`px-2.5 py-1.5 rounded-xl border text-xs transition-all flex items-center gap-1 font-bold ${
                  breakfastOnly
                    ? 'bg-amber-400/15 border-amber-400/40 text-amber-300'
                    : 'bg-white/[0.02] border-white/10 text-td-muted hover:text-white'
                }`}
              >
                <span>🥐</span>
                <span>Desayuno</span>
                {breakfastOnly && <Check className="w-3 h-3 text-amber-300" />}
              </button>

              {/* Vibe Dropdown */}
              <div className="flex items-center gap-1 bg-white/[0.03] border border-white/10 rounded-xl px-2.5 py-1 text-xs">
                <span className="text-[10px] text-td-muted uppercase font-bold">Vibe:</span>
                <select
                  value={selectedVibe}
                  onChange={(e) => setSelectedVibe(e.target.value as TravelVibe)}
                  className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer appearance-none pr-1"
                >
                  {TRAVEL_VIBES.map((v) => (
                    <option key={v.id} value={v.id} className="bg-[#0B0F1A] text-white">
                      {v.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right: Master Duo Action Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
              <Link
                href={computedSearchUrl}
                className="td-btn-primary flex-1 sm:flex-none justify-center px-7 py-3.5 text-sm sm:text-base font-black shadow-xl shadow-coral-950/60 flex items-center gap-2 group"
              >
                <Flame className="w-4 h-4 text-[#0B0F1A] fill-[#0B0F1A] group-hover:scale-110 transition-transform" />
                <span>Buscar Escapadas</span>
                <ArrowRight className="w-4 h-4 text-[#0B0F1A] group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                type="button"
                onClick={onSurpriseClick}
                className="td-btn-surprise py-3.5 px-4 text-sm font-extrabold shadow-xl flex items-center gap-2 shrink-0"
                title="Probar la Ruleta de Destinos"
              >
                <Dice5 className="w-4 h-4 animate-spin-slow" />
                <span className="hidden md:inline">Ruleta</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
