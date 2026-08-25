'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Cookie, ArrowLeft, CheckCircle2, Sliders, Shield } from 'lucide-react';

export default function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-td-deep text-td-primary">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-td-muted hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al inicio</span>
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-td-amber/15 flex items-center justify-center text-td-amber">
            <Cookie className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-td-amber">Transparencia Digital</span>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              Política de Cookies
            </h1>
          </div>
        </div>

        <div className="text-xs text-td-muted mb-10 pb-4 border-b border-white/10 flex flex-wrap gap-4">
          <span>Directiva ePrivacy 2002/58/CE & RGPD</span>
          <span>·</span>
          <span>Última revisión: Agosto 2026</span>
        </div>

        {/* Legal Body */}
        <div className="space-y-8 text-sm text-td-secondary leading-relaxed font-normal">
          
          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-td-amber">1.</span> ¿Qué son las Cookies?
            </h2>
            <p>
              Una cookie es un pequeño archivo de texto que los sitios web guardan en tu navegador cuando los visitas. Permiten que la plataforma recuerde tus preferencias de viaje (como tu aeropuerto de salida en Canarias o tu presupuesto habitual) para que no tengas que reconfigurarlo cada vez que entras.
            </p>
          </section>

          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-td-amber">2.</span> Tipos de Cookies que Utilizamos
            </h2>
            
            <div className="space-y-4 mt-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center justify-between mb-1">
                  <strong className="text-white text-xs">1. Cookies Técnicas y Esenciales (Obligatorias)</strong>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">Siempre Activas</span>
                </div>
                <p className="text-xs text-td-muted">
                  Imprescindibles para que la web funcione: recordar tu sesión de usuario, mantener el estado del buscador, tus ciudades descartadas y tus favoritos en `localStorage`.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center justify-between mb-1">
                  <strong className="text-white text-xs">2. Cookies de Atribución de Enlace de Afiliado</strong>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-td-amber/20 text-td-amber">Transparencia</span>
                </div>
                <p className="text-xs text-td-muted">
                  Cuando haces clic en &quot;Ver Hotel en Booking&quot; o &quot;Ver Vuelo&quot;, se añade un identificador seguro de referencia para que el proveedor sepa que vienes de TravelDiscovery. Esto nos permite mantener la web 100% gratuita y sin anuncios molestos.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center justify-between mb-1">
                  <strong className="text-white text-xs">3. Cookies de Rendimiento y Analítica Anónima</strong>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-td-violet/20 text-td-violet">Opcionales</span>
                </div>
                <p className="text-xs text-td-muted">
                  Nos ayudan a entender qué rutas son las más populares y cómo mejorar la velocidad de carga de la página, siempre de forma 100% anonimizada sin identificar personas concretas.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-td-amber">3.</span> Cómo Gestionar o Desactivar tus Cookies
            </h2>
            <p>
              Puedes cambiar tus preferencias de cookies en cualquier momento desde nuestro banner flotante de configuración o directamente desde los ajustes de tu navegador (Chrome, Safari, Firefox, Edge).
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
