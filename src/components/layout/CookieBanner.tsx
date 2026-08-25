'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import Link from 'next/link';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('td_cookies_consent');
    if (!consent) {
      // Delay slightly so page loads gracefully
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('td_cookies_consent', 'all');
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem('td_cookies_consent', 'essential');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className="fixed bottom-5 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-[#0C101D]/95 border border-white/20 p-5 rounded-3xl shadow-2xl backdrop-blur-2xl text-white"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-td-amber/15 flex items-center justify-center text-td-amber shrink-0 border border-td-amber/30">
              <Cookie className="w-5 h-5" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h4 className="text-sm font-black text-white">Privacidad y Cookies</h4>
                <button
                  type="button"
                  onClick={handleEssentialOnly}
                  className="text-td-muted hover:text-white transition-colors"
                  aria-label="Cerrar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-td-secondary leading-relaxed mb-3">
                Utilizamos cookies esenciales y de atribución de afiliados para ofrecerte escapadas personalizadas y mantener la web 100% gratuita.{' '}
                <Link href="/legal/cookies" className="text-td-coral hover:underline font-semibold">
                  Leer política
                </Link>
                .
              </p>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="td-btn-primary flex-1 py-2 px-3 text-xs font-bold justify-center shadow-md"
                >
                  Aceptar todas
                </button>
                <button
                  type="button"
                  onClick={handleEssentialOnly}
                  className="td-glass hover:bg-white/10 flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-colors text-td-secondary hover:text-white"
                >
                  Solo esenciales
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
