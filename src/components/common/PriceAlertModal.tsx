'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/lib/user-context';
import { Bell, X, Check, Mail, ShieldAlert } from 'lucide-react';

export default function PriceAlertModal() {
  const { isAlertModalOpen, closeAlertModal, selectedTripForAlert, addAlert } = useUser();
  const [email, setEmail] = useState('');
  const [targetPrice, setTargetPrice] = useState(
    selectedTripForAlert ? Math.round(selectedTripForAlert.totalPrice * 0.85) : 120
  );

  if (!isAlertModalOpen || !selectedTripForAlert) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    addAlert(selectedTripForAlert, targetPrice, email);
    setEmail('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAlertModal}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-md td-card p-6 sm:p-8 z-10 border border-white/20 shadow-2xl"
        >
          <button
            onClick={closeAlertModal}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/15 text-td-muted hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-td-coral/15 flex items-center justify-center mx-auto mb-3 border border-td-coral/30">
              <Bell className="w-6 h-6 text-td-coral" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Alerta de Precio
            </h3>
            <p className="text-xs sm:text-sm text-td-secondary mt-1">
              {selectedTripForAlert.destination.flag} {selectedTripForAlert.destination.city} ({selectedTripForAlert.nights} noches)
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-td-muted mb-2">
                Avísame si baja de este precio:
              </label>
              <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-4">
                <span className="text-2xl font-black td-gradient-text">{targetPrice} €</span>
                <span className="text-xs text-td-muted">
                  Precio actual: <span className="text-white font-bold">{selectedTripForAlert.totalPrice} €</span>
                </span>
              </div>
              <input
                type="range"
                min={Math.max(50, Math.round(selectedTripForAlert.totalPrice * 0.5))}
                max={selectedTripForAlert.totalPrice}
                step="5"
                value={targetPrice}
                onChange={(e) => setTargetPrice(Number(e.target.value))}
                className="td-slider mt-4"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-td-muted mb-2">
                Tu correo electrónico:
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-td-muted absolute left-4 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-td-coral rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-td-muted outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex items-start gap-2 text-[11px] text-td-muted">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>Cero spam. Solo te escribiremos si encontramos esta escapada por debajo de {targetPrice} €.</span>
            </div>

            <button
              type="submit"
              className="td-btn-primary w-full justify-center py-3.5 text-sm font-bold"
            >
              <Check className="w-4 h-4" />
              Activar Alerta Gratis
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
