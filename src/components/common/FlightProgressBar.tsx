'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane } from 'lucide-react';

export default function FlightProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);

  // Trigger flight animation on route or searchParam change
  useEffect(() => {
    setIsNavigating(true);
    setProgress(0);

    const step1 = setTimeout(() => setProgress(35), 60);
    const step2 = setTimeout(() => setProgress(75), 180);
    const step3 = setTimeout(() => setProgress(100), 380);
    const stepEnd = setTimeout(() => {
      setIsNavigating(false);
      setProgress(0);
    }, 650);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
      clearTimeout(stepEnd);
    };
  }, [pathname, searchParams]);

  // Listen to standard link clicks to initiate immediate flight takeoff
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (href && href.startsWith('/') && !href.startsWith('#') && href !== pathname) {
        setIsNavigating(true);
        setProgress(25);
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [pathname]);

  return (
    <AnimatePresence>
      {isNavigating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed top-0 left-0 right-0 z-[9999] h-[3px] pointer-events-none overflow-visible"
        >
          {/* Glowing Track Background */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-xs" />

          {/* Animated Neon Jet Contrail */}
          <motion.div
            className="h-full relative"
            style={{
              background: 'linear-gradient(90deg, #F43F5E 0%, #FB7185 30%, #38BDF8 70%, #34D399 100%)',
              boxShadow: '0 0 12px rgba(244, 63, 94, 0.8), 0 0 20px rgba(56, 189, 248, 0.6)',
            }}
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {/* The Supersonic Flying Jet Icon on the Leading Edge */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 flex items-center justify-center">
              <motion.div
                animate={{
                  y: [-1, 1, -1],
                  rotate: [0, 3, -3, 0],
                }}
                transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
                className="w-6 h-6 rounded-full bg-[#0B0F1A] border border-cyan-400/80 shadow-[0_0_12px_rgba(56,189,248,0.9)] flex items-center justify-center -mt-0.5"
              >
                <Plane className="w-3.5 h-3.5 text-cyan-300 transform rotate-45" strokeWidth={2.5} />
              </motion.div>

              {/* Engine Afterburner Sparkle */}
              <div className="absolute -left-1.5 w-2 h-2 rounded-full bg-rose-500 blur-[2px] animate-pulse" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
