'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useUser, CustomCholloAlert } from '@/lib/user-context';
import { ALL_AIRPORTS, MONTHS } from '@/lib/types';
import TripCard from '@/components/results/TripCard';
import { 
  User, 
  Bell, 
  Heart, 
  Sliders, 
  Plus, 
  Trash2, 
  MessageCircle, 
  Mail, 
  Send, 
  Check, 
  Sparkles, 
  Compass, 
  ArrowRight, 
  ShieldCheck, 
  LogOut,
  Plane,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export default function PerfilPage() {
  const { 
    user, 
    login, 
    logout, 
    updateProfile, 
    openAuthModal, 
    favoriteTrips, 
    customAlerts, 
    addCustomAlert, 
    toggleCustomAlert, 
    deleteCustomAlert 
  } = useUser();

  const [activeTab, setActiveTab] = useState<'alerts' | 'favorites' | 'settings'>('alerts');

  // New Custom Alert Form State
  const [newOrigin, setNewOrigin] = useState('TFS');
  const [newDestination, setNewDestination] = useState('Cualquier destino (Europa & Península)');
  const [newBudget, setNewBudget] = useState(130);
  const [newChannel, setNewChannel] = useState<'whatsapp' | 'telegram' | 'email'>('whatsapp');
  const [newPhone, setNewPhone] = useState('+34 600 000 000');

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    addCustomAlert({
      origin: newOrigin,
      destinationCity: newDestination,
      maxBudget: newBudget,
      channel: newChannel,
      active: true,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-td-deep text-td-primary">
      <Header />

      {/* Main Container with pt-24 sm:pt-28 to cleanly clear the fixed header navbar */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-14 sm:pb-20 w-full">
        
        {/* User Hero Banner */}
        <div className="td-card p-6 sm:p-8 border border-white/10 rounded-3xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-td-coral/10 blur-[100px] rounded-full pointer-events-none" />

          {user ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-td-coral to-td-violet p-0.5 shadow-xl">
                  <div className="w-full h-full bg-[#0B0F1A] rounded-[22px] flex items-center justify-center text-2xl font-black text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-xl sm:text-2xl font-black text-white">{user.name}</h1>
                    {user.isResident && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold">
                        🏝️ Residente Canario (-75%)
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-td-muted font-mono">{user.email}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-td-secondary font-medium">
                    <span>Aeropuerto base: <strong className="text-white">{user.preferredOrigin}</strong></span>
                    <span>·</span>
                    <span>Presupuesto máx: <strong className="text-td-coral">{user.maxBudgetPreference} €</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-stretch sm:self-auto">
                <button
                  type="button"
                  onClick={logout}
                  className="td-glass hover:bg-red-500/20 hover:text-red-400 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 w-full sm:w-auto justify-center"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Cerrar sesión</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10 text-center sm:text-left">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-td-coral/15 border border-td-coral/30 text-xs font-bold text-td-coral uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Panel del Viajero
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  Gestiona tus Chollos y Alertas
                </h1>
                <p className="text-xs sm:text-sm text-td-secondary mt-1 max-w-lg">
                  Inicia sesión para recibir alertas en tiempo real por WhatsApp o Telegram cuando salga un vuelo + hotel por debajo de tu presupuesto.
                </p>
              </div>

              <button
                type="button"
                onClick={openAuthModal}
                className="td-btn-primary px-6 py-3.5 text-xs sm:text-sm font-black shadow-xl shrink-0"
              >
                <span>Acceder a Mi Cuenta</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-8 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('alerts')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'alerts'
                ? 'bg-td-coral text-[#0B0F1A] shadow-lg shadow-coral-950/40'
                : 'bg-white/5 text-td-secondary hover:bg-white/10 hover:text-white'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Mis Alertas de Chollos ({customAlerts.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('favorites')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'favorites'
                ? 'bg-td-coral text-[#0B0F1A] shadow-lg shadow-coral-950/40'
                : 'bg-white/5 text-td-secondary hover:bg-white/10 hover:text-white'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Mis Favoritos ({favoriteTrips.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'settings'
                ? 'bg-td-coral text-[#0B0F1A] shadow-lg shadow-coral-950/40'
                : 'bg-white/5 text-td-secondary hover:bg-white/10 hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Preferencias de Viaje</span>
          </button>
        </div>

        {/* TAB 1: MIS ALERTAS DE CHOLLOS */}
        {activeTab === 'alerts' && (
          <div className="space-y-8">
            
            {/* Create New Alert Form */}
            <div className="td-card p-6 sm:p-7 border border-white/10 rounded-3xl">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-xl bg-td-amber/15 flex items-center justify-center text-td-amber">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">
                    Crear Nueva Alerta de Chollo
                  </h3>
                  <p className="text-xs text-td-muted">
                    Te avisaremos en cuanto detectemos un viaje que cumpla tus condiciones
                  </p>
                </div>
              </div>

              <form onSubmit={handleCreateAlert} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-td-muted mb-1.5">
                    Salida desde
                  </label>
                  <select
                    value={newOrigin}
                    onChange={(e) => setNewOrigin(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/10 focus:border-td-coral rounded-xl p-2.5 text-xs font-bold text-white outline-none"
                  >
                    {ALL_AIRPORTS.map((a) => (
                      <option key={a.code} value={a.code} className="bg-[#0B0F1A] text-white">
                        {a.flag} {a.name} ({a.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-td-muted mb-1.5">
                    Destino deseado
                  </label>
                  <input
                    type="text"
                    value={newDestination}
                    onChange={(e) => setNewDestination(e.target.value)}
                    placeholder="Ej. Oporto o Cualquier destino"
                    required
                    className="w-full bg-white/[0.04] border border-white/10 focus:border-td-coral rounded-xl p-2.5 text-xs font-bold text-white placeholder:text-td-muted outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-td-muted mb-1.5">
                    Presupuesto máximo: <span className="text-td-coral font-black">{newBudget} €</span>
                  </label>
                  <input
                    type="range"
                    min="80"
                    max="250"
                    step="5"
                    value={newBudget}
                    onChange={(e) => setNewBudget(Number(e.target.value))}
                    className="td-slider w-full cursor-pointer mt-2"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-td-muted mb-1.5">
                    Canal de aviso
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={newChannel}
                      onChange={(e) => setNewChannel(e.target.value as 'whatsapp' | 'telegram' | 'email')}
                      className="w-full bg-white/[0.04] border border-white/10 focus:border-td-coral rounded-xl p-2.5 text-xs font-bold text-white outline-none"
                    >
                      <option value="whatsapp" className="bg-[#0B0F1A] text-white">📲 WhatsApp</option>
                      <option value="telegram" className="bg-[#0B0F1A] text-white">✈️ Telegram</option>
                      <option value="email" className="bg-[#0B0F1A] text-white">✉️ Correo Email</option>
                    </select>

                    <button
                      type="submit"
                      className="td-btn-primary px-4 py-2.5 text-xs font-black shrink-0"
                    >
                      Activar
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Active Alerts List */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Alertas activas en seguimiento</span>
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs text-td-muted">
                  {customAlerts.length}
                </span>
              </h3>

              {customAlerts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {customAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 flex items-center justify-between gap-4 shadow-lg hover:border-white/20 transition-all"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          alert.channel === 'whatsapp' ? 'bg-emerald-500/20 text-emerald-400' :
                          alert.channel === 'telegram' ? 'bg-sky-500/20 text-sky-400' : 'bg-td-coral/20 text-td-coral'
                        }`}>
                          {alert.channel === 'whatsapp' ? <MessageCircle className="w-5 h-5" /> :
                           alert.channel === 'telegram' ? <Send className="w-5 h-5" /> : <Mail className="w-5 h-5" />}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm text-white truncate">{alert.destinationCity}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-td-coral font-bold">
                              {alert.origin}
                            </span>
                          </div>
                          <p className="text-xs text-td-muted mt-0.5">
                            Menos de <strong className="text-emerald-400">{alert.maxBudget} €</strong> · Por {alert.channel}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          type="button"
                          onClick={() => toggleCustomAlert(alert.id)}
                          className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                            alert.active ? 'bg-emerald-500' : 'bg-white/20'
                          }`}
                          title={alert.active ? 'Alerta activa' : 'Alerta pausada'}
                        >
                          <div className={`w-4 h-4 rounded-full bg-[#0B0F1A] shadow-md transition-transform ${
                            alert.active ? 'translate-x-4' : 'translate-x-0'
                          }`} />
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteCustomAlert(alert.id)}
                          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 text-td-muted hover:text-red-400 flex items-center justify-center transition-colors"
                          title="Eliminar alerta"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white/[0.02] border border-white/5 rounded-3xl p-6">
                  <p className="text-sm text-td-muted">No tienes ninguna alerta configurada aún.</p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: MIS FAVORITOS */}
        {activeTab === 'favorites' && (
          <div>
            {favoriteTrips.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteTrips.map((trip, idx) => (
                  <TripCard key={trip.id} trip={trip} index={idx} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 td-card p-8 rounded-3xl max-w-md mx-auto border border-white/10">
                <Heart className="w-12 h-12 text-td-coral mx-auto mb-3 opacity-60" />
                <h3 className="text-lg font-bold text-white mb-1">Aún no tienes favoritos guardados</h3>
                <p className="text-xs text-td-secondary mb-6">
                  Guarda las escapadas que más te gusten pulsando en el corazón de cada tarjeta.
                </p>
                <Link href="/resultados" className="td-btn-primary py-2.5 px-5 text-xs font-bold">
                  Explorar escapadas disponibles
                </Link>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PREFERENCIAS & AJUSTES */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="td-card p-6 sm:p-7 border border-white/10 rounded-3xl space-y-6">
              <h3 className="text-base font-bold text-white border-b border-white/10 pb-3">
                Preferencias Globales de Búsqueda
              </h3>

              {/* Residente Canario */}
              <div className="flex items-center justify-between">
                <div>
                  <strong className="text-sm text-white block">Soy Residente Canario</strong>
                  <span className="text-xs text-td-muted">Aplica automáticamente el 75% de descuento en vuelos nacionales</span>
                </div>
                <button
                  type="button"
                  onClick={() => updateProfile({ isResident: !(user?.isResident ?? true) })}
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${
                    (user?.isResident ?? true) ? 'bg-emerald-500' : 'bg-white/20'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-[#0B0F1A] shadow-md transition-transform ${
                    (user?.isResident ?? true) ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Aeropuerto Habitual */}
              <div>
                <label className="block text-xs font-bold text-white mb-2">
                  Aeropuerto de Salida Predeterminado
                </label>
                <select
                  value={user?.preferredOrigin || 'TFS'}
                  onChange={(e) => updateProfile({ preferredOrigin: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/10 focus:border-td-coral rounded-xl p-3 text-xs font-bold text-white outline-none"
                >
                  {ALL_AIRPORTS.map((a) => (
                    <option key={a.code} value={a.code} className="bg-[#0B0F1A] text-white">
                      {a.flag} {a.name} ({a.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Canales de notificación */}
              <div className="pt-2 border-t border-white/10 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-td-muted block">
                  Canales de Alertas Autorizados
                </span>
                
                <label className="flex items-center gap-3 text-xs text-td-secondary cursor-pointer">
                  <input
                    type="checkbox"
                    checked={user?.channels?.whatsapp ?? true}
                    onChange={(e) => updateProfile({
                      channels: { ...(user?.channels || { whatsapp: true, telegram: false, email: true }), whatsapp: e.target.checked }
                    })}
                    className="rounded bg-white/10 border-white/20 text-td-coral"
                  />
                  <span>Recibir avisos por WhatsApp (+34 600 000 000)</span>
                </label>

                <label className="flex items-center gap-3 text-xs text-td-secondary cursor-pointer">
                  <input
                    type="checkbox"
                    checked={user?.channels?.email ?? true}
                    onChange={(e) => updateProfile({
                      channels: { ...(user?.channels || { whatsapp: true, telegram: false, email: true }), email: e.target.checked }
                    })}
                    className="rounded bg-white/10 border-white/20 text-td-coral"
                  />
                  <span>Recibir resumen semanal de gangas por correo</span>
                </label>
              </div>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
