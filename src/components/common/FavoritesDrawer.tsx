'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/lib/user-context';
import { Heart, X, Trash2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function FavoritesDrawer() {
  const { isFavoritesDrawerOpen, closeFavoritesDrawer, favoriteTrips, toggleFavorite } = useUser();

  return (
    <AnimatePresence>
      {isFavoritesDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeFavoritesDrawer}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-[#0F1424] border-l border-white/10 p-6 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-td-coral/15 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-td-coral" fill="var(--td-coral)" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Tus Favoritos</h3>
                    <span className="text-xs text-td-muted">{favoriteTrips.length} escapadas guardadas</span>
                  </div>
                </div>
                <button
                  onClick={closeFavoritesDrawer}
                  className="p-2 rounded-full hover:bg-white/10 text-td-muted hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto py-4 space-y-3 no-scrollbar">
                {favoriteTrips.length > 0 ? (
                  favoriteTrips.map((trip) => (
                    <div
                      key={trip.id}
                      className="td-card p-3.5 flex gap-3.5 items-center justify-between border border-white/5 hover:border-white/15"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden relative shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={trip.destination.image}
                          alt={trip.destination.city}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1 right-1 text-sm">{trip.destination.flag}</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white text-sm truncate">{trip.destination.city}</h4>
                        <p className="text-xs text-td-muted truncate">
                          {trip.nights}n • {trip.outboundFlight.airline}
                        </p>
                        <div className="text-sm font-extrabold td-gradient-text mt-0.5">
                          {trip.totalPrice} €
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 items-end shrink-0">
                        <button
                          onClick={() => toggleFavorite(trip.id)}
                          className="p-1.5 rounded-lg hover:bg-white/10 text-td-muted hover:text-red-400 transition-colors"
                          title="Eliminar de favoritos"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <Link
                          href={`/viaje/${trip.id}`}
                          onClick={closeFavoritesDrawer}
                          className="text-[11px] font-bold text-td-coral hover:text-td-orange flex items-center gap-0.5"
                        >
                          Ver <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <Heart className="w-12 h-12 text-white/10 mb-3" />
                    <p className="text-sm font-semibold text-white">No tienes viajes guardados</p>
                    <p className="text-xs text-td-muted max-w-xs mt-1">
                      Pulsa el corazón en cualquier escapada para guardarla aquí y comparar precios.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              {favoriteTrips.length > 0 && (
                <div className="pt-4 border-t border-white/10">
                  <Link
                    href="/resultados"
                    onClick={closeFavoritesDrawer}
                    className="td-btn-primary w-full justify-center py-3 text-sm font-bold"
                  >
                    Seguir explorando escapadas
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
