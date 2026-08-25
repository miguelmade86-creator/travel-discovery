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

  // Trigger curtain transition on route or searchParam change
  useEffect(() => {
    if (initialMount) {
      setInitialMount(false);
      return;
    }

    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  // Listen to in-app link clicks for immediate responsive trigger
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
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, [pathname]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <div className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden">
          {/* Full Screen Wipe Curtain with Leading Airplane Laser Line */}
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: ['-100%', '0%', '0%', '100%'] }}
            exit={{ y: '100%' }}
            transition={{
              duration: 0.75,
              times: [0, 0.42, 0.58, 1],
              ease: [0.77, 0, 0.175, 1],
            }}
            className="absolute inset-0 bg-[#070A12]/95 backdrop-blur-2xl flex flex-col justify-end border-b border-cyan-400/40"
          >
            {/* Ambient Aurora inside the Curtain */}
            <div className="absolute inset-0 bg-gradient-to-b from-td-coral/10 via-td-violet/15 to-cyan-500/10 pointer-events-none" />

            {/* FULL WIDTH HORIZONTAL LASER LINE */}
            <div className="relative w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_24px_rgba(56,189,248,1),0_0_8px_rgba(244,63,94,0.8)]">
              
              {/* Airplane in the exact center of the horizontal line */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                
                {/* Radar Sonic Wave Pulse */}
                <div className="absolute w-16 h-16 rounded-full border border-cyan-400/40 animate-ping pointer-events-none" />
                
                {/* Center Jet Emblem */}
                <div className="w-11 h-11 rounded-full bg-[#0B0F1A] border-2 border-cyan-400 shadow-[0_0_24px_rgba(56,189,248,1)] flex items-center justify-center relative">
                  <Plane className="w-5 h-5 text-cyan-300 transform rotate-180 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]" strokeWidth={2.5} />
                  
                  {/* Jet Afterburner Sparkle */}
                  <div className="absolute -top-1 w-2 h-2 rounded-full bg-td-coral blur-[2px] animate-pulse" />
                </div>

                {/* Subtitle Badge */}
                <span className="text-[10px] font-black uppercase tracking-widest text-cyan-300 mt-1.5 bg-[#0B0F1A]/90 px-3 py-0.5 rounded-full border border-cyan-400/30 shadow-xl whitespace-nowrap">
                  Despegando ✈️
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
