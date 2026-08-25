'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, FileText, Scale, ExternalLink } from 'lucide-react';

export default function TerminosPage() {
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
          <div className="w-10 h-10 rounded-xl bg-td-coral/15 flex items-center justify-center text-td-coral">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-td-coral">Marco Jurídico & LSSI-CE</span>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              Aviso Legal y Términos de Servicio
            </h1>
          </div>
        </div>

        <div className="text-xs text-td-muted mb-10 pb-4 border-b border-white/10 flex flex-wrap gap-4">
          <span>Última actualización: Agosto 2026</span>
          <span>·</span>
          <span>Jurisdicción: Reino de España y Unión Europea</span>
          <span>·</span>
          <span>Versión: 2.4-ES</span>
        </div>

        {/* Legal Body */}
        <div className="space-y-8 text-sm text-td-secondary leading-relaxed font-normal">
          
          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-td-coral">1.</span> Información General y Titularidad del Sitio Web
            </h2>
            <p>
              En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa a los usuarios que el presente sitio web, <strong>escapya</strong> (en adelante, &quot;la Plataforma&quot;), es un motor de búsqueda, agregación y recomendación inteligente de viajes.
            </p>
            <p className="mt-2">
              Para cualquier consulta, sugerencia o comunicación legal, el usuario puede dirigirse a través de nuestro canal de soporte en: <strong className="text-white">legal@escapya.com</strong>.
            </p>
          </section>

          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-td-coral">2.</span> Naturaleza del Servicio: Meta-Motor Independiente (No Agencia de Viajes)
            </h2>
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs mb-3">
              <strong>⚠️ AVISO IMPORTANTE:</strong> escapya <strong>NO es una agencia de viajes</strong> minorista ni mayorista, ni actúa como operador turístico conforme a lo dispuesto en el Real Decreto Legislativo 1/2007.
            </div>
            <p>
              escapya opera exclusivamente como un servicio tecnológico y metabuscador automatizado que rastrea, combina algorítmicamente y muestra sugerencias de viaje (&quot;Vuelo + Hotel&quot;) a partir de tarifas públicas disponibles en internet.
            </p>
            <p className="mt-2">
              escapya <strong>no vende billetes de avión, no gestiona reservas hoteleras, no custodia fondos ni procesa pagos de reservas</strong>. Todas las transacciones de compraventa se perfeccionan de forma directa e independiente entre el usuario y los proveedores finales (aerolíneas como Ryanair, Vueling, Binter, Iberia, etc., o plataformas de alojamiento como Booking.com).
            </p>
          </section>

          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-td-coral">3.</span> Exactitud de Precios, Tarifas Dinámicas y Disponibilidad
            </h2>
            <p>
              Los precios de vuelos mostrados en escapya se obtienen a través de la API oficial de Travelpayouts / Aviasales en tiempo real. Los importes de alojamiento mostrados en la plataforma son recomendaciones y estimaciones orientativas basadas en medias hoteleras céntricas, enlazando directamente a proveedores oficiales (como Booking.com) para la consulta de disponibilidad y tarifas finales exactas en el momento de la reserva.
            </p>
            <p className="mt-2">
              Aunque escapya realiza esfuerzos constantes para mantener la máxima fidelidad y frescura en los datos, <strong>el precio final vinculante es exclusivamente el confirmado por el proveedor final</strong> (aerolínea o Booking.com) en el momento exacto en que el usuario formaliza la reserva en su respectivo sitio web.
            </p>
          </section>

          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-td-coral">4.</span> Bonificación de Residente Canario (-75%)
            </h2>
            <p>
              Las tarifas mostradas con la opción &quot;Residente Canario&quot; activada incorporan la bonificación pública del 75% en los trayectos nacionales entre las Islas Canarias y la Península / Baleares o vuelos interinsulares, regulada por el Real Decreto 1316/2001 y disposiciones concordantes.
            </p>
            <p className="mt-2">
              La verificación del derecho a dicha subvención estatal (mediante sistema SARA o certificado de empadronamiento) corresponde exclusivamente a la aerolínea emisora en el proceso de check-in o facturación.
            </p>
          </section>

          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-td-coral">5.</span> Exención de Responsabilidad por Servicios de Terceros
            </h2>
            <p>
              escapya queda plenamente exonerada de cualquier responsabilidad derivada de:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
              <li>Cancelaciones, retrasos, huelgas, sobreventa (*overbooking*) o modificaciones horarias operadas por las compañías aéreas.</li>
              <li>Incidencias, reclamaciones, desperfectos o discrepancias sobre los servicios prestados por los establecimientos hoteleros o actividades de Civitatis.</li>
              <li>Pérdida de equipaje o denegación de embarque por falta de documentación de viaje en regla (DNI, pasaporte, visados o certificados sanitarios).</li>
            </ul>
          </section>

          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-td-coral">6.</span> Propiedad Intelectual e Industrial
            </h2>
            <p>
              El código fuente, diseño gráfico, algoritmos de cálculo de TripScore, arquitectura de navegación, logotipos, marcas comerciales y contenidos de escapya están protegidos por las leyes de propiedad intelectual e industrial. Queda prohibida su reproducción, ingeniería inversa o explotación comercial sin autorización expresa y por escrito.
            </p>
          </section>

          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-td-coral">7.</span> Ley Aplicable y Jurisdicción
            </h2>
            <p>
              Las presentes Condiciones se rigen por la legislación española. Para la resolución de cualquier controversia, las partes se someten a los Juzgados y Tribunales competentes conforme a la normativa de consumidores y usuarios aplicable.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
