'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane } from 'lucide-react';

export default function FlightPageTransition() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [initialMount, setInitialMount] = useState(true);
  const [isAscending, setIsAscending] = useState(false);

  // Trigger curtain transition on route or searchParam change
  useEffect(() => {
    if (initialMount) {
      setInitialMount(false);
      return;
    }

    setIsTransitioning(true);
    setIsAscending(false);

    // Halfway through (when screen is covered), prepare upward takeoff
    const turnTimer = setTimeout(() => {
      setIsAscending(true);
    }, 420);

    const endTimer = setTimeout(() => {
      setIsTransitioning(false);
      setIsAscending(false);
    }, 850);

    return () => {
      clearTimeout(turnTimer);
      clearTimeout(endTimer);
    };
  }, [pathname, searchParams]);

  // Listen to in-app link clicks for instantaneous response
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (
        href &&
        href.startsWith('/') &&
        !href.startsWith('#') &&
        !target.getAttribute('target')
      ) {
        setIsTransitioning(true);
        setIsAscending(false);
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, [pathname]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <div className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden">
          {/* Full Screen Curtain: Sweeps DOWN (-100% -> 0%), holds, then sweeps UP (0% -> -100%) */}
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: ['-100%', '0%', '0%', '-100%'] }}
            exit={{ y: '-100%' }}
            transition={{
              duration: 0.85,
              times: [0, 0.42, 0.58, 1],
              ease: [0.77, 0, 0.175, 1],
            }}
            className="absolute inset-0 bg-[#070A12]/95 backdrop-blur-2xl flex flex-col justify-end border-b border-cyan-400/40 shadow-2xl"
          >
            {/* Ambient Aurora inside the Curtain */}
            <div className="absolute inset-0 bg-gradient-to-b from-td-coral/10 via-td-violet/15 to-cyan-500/10 pointer-events-none" />

            {/* FULL-WIDTH HORIZONTAL LASER LINE ACROSS VIEWPORT */}
            <div className="relative w-full h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_24px_rgba(56,189,248,1),0_0_12px_rgba(244,63,94,0.8)]">
              
              {/* Airplane in the exact center of the horizontal line */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                
                {/* Radar Sonic Wave Pulse */}
                <div className="absolute w-16 h-16 rounded-full border border-cyan-400/40 animate-ping pointer-events-none" />
                
                {/* Center Jet Emblem with Dynamic Rotation (Down on descent, Up on ascent) */}
                <motion.div
                  animate={{ rotate: isAscending ? 0 : 180 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="w-12 h-12 rounded-full bg-[#0B0F1A] border-2 border-cyan-400 shadow-[0_0_28px_rgba(56,189,248,1)] flex items-center justify-center relative"
                >
                  <Plane 
                    className="w-6 h-6 text-cyan-300 drop-shadow-[0_0_10px_rgba(56,189,248,0.9)]" 
                    strokeWidth={2.5} 
                  />
                  
                  {/* Jet Afterburner Sparkle */}
                  <div className="absolute -top-1 w-2.5 h-2.5 rounded-full bg-td-coral blur-[2px] animate-pulse" />
                </motion.div>

                {/* Subtitle Badge */}
                <span className="text-[10px] font-black uppercase tracking-widest text-cyan-300 mt-2 bg-[#0B0F1A]/90 px-3.5 py-1 rounded-full border border-cyan-400/30 shadow-xl whitespace-nowrap">
                  {isAscending ? 'Llegando a tu destino 🛬' : 'Despegando ✈️'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
