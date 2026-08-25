'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Mail, Lock, User, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useUser } from '@/lib/user-context';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login } = useUser();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setTimeout(() => {
      login(name || (email.split('@')[0]), email);
      setIsLoading(false);
      setEmail('');
      setPassword('');
      setName('');
    }, 600);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      login('Viajero Google', 'viajero@gmail.com');
      setIsLoading(false);
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-[#0C101D] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 my-auto text-white overflow-hidden"
        >
          {/* Top Decorative Glow */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-td-coral to-transparent opacity-80" />

          {/* Close Button */}
          <button
            type="button"
            onClick={closeAuthModal}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-td-muted hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-td-coral/20 to-td-violet/20 border border-white/10 flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Sparkles className="w-6 h-6 text-td-coral" />
            </div>
            <h2 className="text-2xl font-black text-white">
              {tab === 'login' ? 'Bienvenido a tu Panel' : 'Crea tu Cuenta de Viajero'}
            </h2>
            <p className="text-xs text-td-secondary mt-1">
              Guarda tus escapadas favoritas y recibe chollos directos a tu móvil
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 mb-6">
            <button
              type="button"
              onClick={() => setTab('login')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                tab === 'login'
                  ? 'bg-td-coral text-[#0B0F1A] shadow-md shadow-coral-950/40'
                  : 'text-td-muted hover:text-white'
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={() => setTab('register')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                tab === 'register'
                  ? 'bg-td-coral text-[#0B0F1A] shadow-md shadow-coral-950/40'
                  : 'text-td-muted hover:text-white'
              }`}
            >
              Registrarme
            </button>
          </div>

          {/* Google Fast Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-bold text-white flex items-center justify-center gap-3 transition-colors mb-4 shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Continuar con Google</span>
          </button>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[10px] text-td-muted uppercase font-bold tracking-wider">o con tu email</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {tab === 'register' && (
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-td-muted mb-1">
                  Nombre completo
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-td-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Carlos Santana"
                    required
                    className="w-full bg-white/[0.04] border border-white/10 focus:border-td-coral rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold text-white placeholder:text-td-muted outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-td-muted mb-1">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-td-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="w-full bg-white/[0.04] border border-white/10 focus:border-td-coral rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold text-white placeholder:text-td-muted outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-td-muted mb-1">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-td-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/[0.04] border border-white/10 focus:border-td-coral rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold text-white placeholder:text-td-muted outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full td-btn-primary py-3 text-xs font-black justify-center shadow-lg shadow-coral-950/50 mt-4 flex items-center gap-2"
            >
              {isLoading ? (
                <span>Conectando...</span>
              ) : (
                <>
                  <span>{tab === 'login' ? 'Entrar a Mi Panel' : 'Crear Cuenta Gratis'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Privacy Note */}
          <div className="mt-5 text-center text-[10px] text-td-muted flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tus datos están protegidos conforme al RGPD</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
