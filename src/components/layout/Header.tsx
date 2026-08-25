'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Menu, X, Heart, Bell, Search, User } from 'lucide-react';
import { useUser } from '@/lib/user-context';

import EscapyaLogo from '@/components/brand/EscapyaLogo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { favorites, openFavoritesDrawer, openAlertModal, user, openAuthModal } = useUser();
  const menuRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (isMenuOpen) {
      firstLinkRef.current?.focus();

      const handleGlobalKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMenuOpen(false);
        }
      };

      window.addEventListener('keydown', handleGlobalKeyDown);
      return () => {
        window.removeEventListener('keydown', handleGlobalKeyDown);
      };
    }
  }, [isMenuOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsMenuOpen(false);
      return;
    }

    if (e.key === 'Tab' && menuRef.current) {
      const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-[#0B0F1A]/98 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-[72px]">
            
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <EscapyaLogo size="md" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1.5">
              <Link href="/"
                className="px-3.5 py-1.5 text-xs font-bold text-td-secondary hover:text-white transition-colors rounded-full hover:bg-white/5">
                Buscar
              </Link>
              <Link href="/resultados"
                className="px-3.5 py-1.5 text-xs font-bold text-td-secondary hover:text-white transition-colors rounded-full hover:bg-white/5">
                Explorar Chollos
              </Link>
              
              <div className="w-px h-5 bg-white/10 mx-1.5" />
              
              {/* Favorites Button with Badge */}
              <button 
                onClick={openFavoritesDrawer}
                className="p-2 text-td-secondary hover:text-white transition-colors rounded-full hover:bg-white/5 relative"
                aria-label="Favoritos"
                title="Mis escapadas guardadas"
              >
                <Heart className="w-4 h-4" />
                {favorites.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-td-coral text-[#0B0F1A] text-[10px] font-black flex items-center justify-center animate-pulse">
                    {favorites.length}
                  </span>
                )}
              </button>

              {/* Alerts Button */}
              <button 
                onClick={() => openAlertModal()}
                className="p-2 text-td-secondary hover:text-white transition-colors rounded-full hover:bg-white/5"
                aria-label="Alertas"
                title="Crear alerta de precio"
              >
                <Bell className="w-4 h-4" />
              </button>

              <div className="w-px h-5 bg-white/10 mx-1.5" />

              {/* User Account / Login Button */}
              {user ? (
                <Link
                  href="/perfil"
                  className="td-glass hover:bg-white/10 py-1.5 px-3 rounded-full flex items-center gap-2 transition-all border border-emerald-500/30"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[10px] font-black">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-bold text-white max-w-[100px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={openAuthModal}
                  className="td-glass hover:bg-white/10 py-1.5 px-3.5 rounded-full text-xs font-bold text-white flex items-center gap-1.5 transition-colors border border-white/15"
                >
                  <User className="w-3.5 h-3.5 text-td-coral" />
                  <span>Mi Panel</span>
                </button>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-td-secondary hover:text-white transition-colors rounded-lg hover:bg-white/5"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
            onKeyDown={handleKeyDown}
          >
            <div ref={menuRef} className="td-glass-strong border-t border-white/5">
              <div className="px-4 py-4 space-y-1">
                <Link
                  ref={firstLinkRef}
                  href="/"
                  className="flex items-center gap-3 px-4 py-3 text-sm text-td-secondary hover:text-white transition-colors rounded-xl hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}>
                  <Search className="w-4 h-4 text-td-coral" />
                  <span>Buscar escapada</span>
                </Link>

                <Link href="/resultados"
                  className="flex items-center gap-3 px-4 py-3 text-sm text-td-secondary hover:text-white transition-colors rounded-xl hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}>
                  <Compass className="w-4 h-4 text-td-amber" />
                  <span>Explorar destinos</span>
                </Link>

                <Link href="/perfil"
                  className="flex items-center gap-3 px-4 py-3 text-sm text-td-secondary hover:text-white transition-colors rounded-xl hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}>
                  <User className="w-4 h-4 text-emerald-400" />
                  <span>Mi Panel de Viajero</span>
                </Link>

                <button 
                  onClick={() => { setIsMenuOpen(false); openFavoritesDrawer(); }}
                  className="flex items-center justify-between px-4 py-3 text-sm text-td-secondary hover:text-white transition-colors rounded-xl hover:bg-white/5 w-full text-left"
                >
                  <div className="flex items-center gap-3">
                    <Heart className="w-4 h-4 text-td-coral" />
                    <span>Favoritos</span>
                  </div>
                  {favorites.length > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-td-coral text-[#0B0F1A] text-xs font-bold">
                      {favorites.length}
                    </span>
                  )}
                </button>

                <button 
                  onClick={() => { setIsMenuOpen(false); openAlertModal(); }}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-td-secondary hover:text-white transition-colors rounded-xl hover:bg-white/5 w-full text-left"
                >
                  <Bell className="w-4 h-4 text-td-amber" />
                  <span>Crear alerta de precio</span>
                </button>

                {!user && (
                  <div className="pt-2">
                    <button
                      onClick={() => { setIsMenuOpen(false); openAuthModal(); }}
                      className="w-full td-btn-primary py-2.5 text-xs font-bold justify-center"
                    >
                      Iniciar Sesión / Registro
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
