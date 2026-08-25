'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Sparkles, ArrowLeft, HeartHandshake, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';

export default function AfiliadosPage() {
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
          <div className="w-10 h-10 rounded-xl bg-td-cyan/15 flex items-center justify-center text-td-cyan">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-td-cyan">Transparencia & Ética</span>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              Transparencia y Divulgación de Afiliación
            </h1>
          </div>
        </div>

        <div className="text-xs text-td-muted mb-10 pb-4 border-b border-white/10 flex flex-wrap gap-4">
          <span>Compromiso de Honestidad con el Viajero</span>
          <span>·</span>
          <span>Cumplimiento con Directrices FTC y Consumo UE</span>
        </div>

        {/* Legal Body */}
        <div className="space-y-8 text-sm text-td-secondary leading-relaxed font-normal">
          
          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-td-cyan">1.</span> ¿Cómo se financia TravelDiscovery? (100% Gratis para ti)
            </h2>
            <p>
              Creemos en la máxima transparencia: <strong>TravelDiscovery es un servicio 100% gratuito para el usuario</strong>. No cobramos comisiones de gestión, no aplicamos cargos ocultos ni inflamos los precios de los billetes de avión ni de los hoteles.
            </p>
            <p className="mt-3">
              Cuando encuentras una escapada que te apasiona y decides reservar a través de nuestros enlaces directos a las páginas oficiales de los proveedores (como <strong>Booking.com, aerolíneas o Civitatis</strong>), nosotros podemos recibir una pequeña comisión de afiliado por parte de dicha empresa sin que a ti te cueste ni un solo céntimo extra.
            </p>
          </section>

          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-td-cyan">2.</span> Garantía de Independencia del Algoritmo TripScore
            </h2>
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs mb-3">
              ⭐ <strong>COMPROMISO DE OBJETIVIDAD:</strong> Ninguna aerolínea ni ningún hotel puede pagar dinero a TravelDiscovery para alterar su TripScore ni para aparecer más arriba en los resultados.
            </div>
            <p>
              El algoritmo de <strong>TripScore (0 a 100)</strong> es 100% matemático y objetivo. Evalúa exclusivamente:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
              <li>El precio total real en relación al presupuesto del usuario.</li>
              <li>La comodidad del vuelo (horarios diurnos, vuelos directos vs escalas).</li>
              <li>La puntuación real de los huéspedes en Booking (&gt;8.0/10) y la cercanía al centro histórico.</li>
            </ul>
          </section>

          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-td-cyan">3.</span> Relación con Terceros Proveedores
            </h2>
            <p>
              TravelDiscovery mantiene relaciones de afiliación técnica con redes globales de viajes autorizadas, incluyendo Travelpayouts, Booking.com Partner Program, Awin y Civitatis. Todas las marcas registradas y logotipos mostrados pertenecen a sus respectivos propietarios y se utilizan únicamente a efectos informativos y de identificación del servicio para el viajero.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
