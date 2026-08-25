'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const QUICK_FILTERS = [
  { label: '🎉 Puente del Pilar (10-13 Oct)', href: '/resultados?budget=160&month=Octubre&nights=4&resident=true', highlight: true },
  { label: '🎃 Todos los Santos (31 Oct - 3 Nov)', href: '/resultados?budget=160&month=Noviembre&nights=4&resident=true', highlight: true },
  { label: '🎄 Puente Constitución (5-9 Dic)', href: '/resultados?budget=180&month=Diciembre&nights=5&resident=true', highlight: true },
  { label: '🔥 Ganga Absoluta (< 120 €)', href: '/resultados?budget=120&resident=true' },
  { label: '🥘 Tapas & Gastronomía', href: '/resultados?vibe=gastronomy' },
  { label: '🥐 Con Desayuno Buffet', href: '/resultados?budget=150&resident=true' },
  { label: '✈️ 100% Vuelos Directos', href: '/resultados?direct=true' },
  { label: '🏛️ Cultura & Museos', href: '/resultados?vibe=culture' },
  { label: '☀️ Sol & Playa', href: '/resultados?vibe=sun' },
  { label: '🍸 Vida Nocturna & Fiesta', href: '/resultados?vibe=nightlife' },
  { label: '💑 Escapada Romántica', href: '/resultados?vibe=romantic' },
];

export default function QuickCategoryPills() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto py-2 group">
      {/* Left Scroll Button (Desktop) */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scroll('left')}
          className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#0D1220]/90 border border-white/20 items-center justify-center text-white shadow-xl hover:bg-td-coral hover:border-td-coral hover:text-[#0B0F1A] transition-all -ml-2"
          aria-label="Desplazar a la izquierda"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="w-full overflow-x-auto no-scrollbar scroll-smooth flex items-center gap-2.5 px-3 py-1"
      >
        <span className="text-[11px] font-bold uppercase tracking-wider text-td-muted shrink-0 flex items-center gap-1">
          <span>🗓️</span>
          <span>Radar de Puentes:</span>
        </span>

        {QUICK_FILTERS.map((cat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="shrink-0"
          >
            <Link
              href={cat.href}
              className={`td-pill text-xs py-1.5 px-3.5 transition-all flex items-center gap-1.5 shadow-sm font-semibold whitespace-nowrap ${
                cat.highlight
                  ? 'bg-td-amber/15 border-td-amber/40 text-amber-300 hover:bg-td-amber/25'
                  : 'bg-white/[0.04] hover:bg-white/10 hover:border-td-coral/40 text-td-secondary hover:text-white'
              }`}
            >
              {cat.label}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Right Scroll Button (Desktop) */}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => scroll('right')}
          className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#0D1220]/90 border border-white/20 items-center justify-center text-white shadow-xl hover:bg-td-coral hover:border-td-coral hover:text-[#0B0F1A] transition-all -mr-2"
          aria-label="Desplazar a la derecha"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
