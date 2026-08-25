'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Shield, ArrowLeft, Lock, UserCheck, Bell, Database } from 'lucide-react';

export default function PrivacidadPage() {
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
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Protección de Datos & RGPD</span>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              Política de Privacidad
            </h1>
          </div>
        </div>

        <div className="text-xs text-td-muted mb-10 pb-4 border-b border-white/10 flex flex-wrap gap-4">
          <span>Reglamento (UE) 2016/679 (RGPD) & LOPDGDD 3/2018</span>
          <span>·</span>
          <span>Última revisión: Agosto 2026</span>
          <span>·</span>
          <span>Cifrado SSL/TLS 256-bit</span>
        </div>

        {/* Legal Body */}
        <div className="space-y-8 text-sm text-td-secondary leading-relaxed font-normal">
          
          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-emerald-400">1.</span> Responsable del Tratamiento de tus Datos
            </h2>
            <p>
              El responsable del tratamiento de los datos personales recabados a través de <strong>TravelDiscovery</strong> es el equipo gestor de la plataforma. Para cualquier ejercicio de derechos o aclaración sobre privacidad, puedes contactar con nuestro Delegado de Protección de Datos en: <strong className="text-white">privacidad@traveldiscovery.app</strong>.
            </p>
          </section>

          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-emerald-400">2.</span> Datos que Recopilamos y Finalidad
            </h2>
            <p>
              TravelDiscovery aplica el principio de <strong>minimización de datos</strong>. Solo recopilamos los datos estrictamente necesarios para proporcionarte la mejor experiencia de descubrimiento de viajes:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mt-4 text-xs">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <strong className="text-white block mb-1">🔔 Alertas de Chollos y Precio</strong>
                <p>Tu correo electrónico, número de WhatsApp o alias de Telegram para enviarte exclusivamente las ofertas que tú mismo hayas configurado.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <strong className="text-white block mb-1">⚙️ Preferencias de Búsqueda</strong>
                <p>Aeropuerto de salida en Canarias, estado de residente y ciudades guardadas en favoritos para agilizar tus búsquedas.</p>
              </div>
            </div>
          </section>

          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-emerald-400">3.</span> Base Jurídica del Tratamiento
            </h2>
            <p>
              El tratamiento de tus datos se fundamenta en:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
              <li><strong>Tu Consentimiento Expreso (Art. 6.1.a RGPD):</strong> Al solicitar la suscripción a alertas de precio, canales de Telegram/WhatsApp o crear tu perfil de usuario.</li>
              <li><strong>Interés Legítimo (Art. 6.1.f RGPD):</strong> Para prevenir abusos, proteger la seguridad del servidor y optimizar el rendimiento de la plataforma.</li>
            </ul>
          </section>

          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-emerald-400">4.</span> No Venta de Datos a Terceros
            </h2>
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs mb-3">
              🛡️ <strong>COMPROMISO DE PRIVACIDAD:</strong> TravelDiscovery <strong>NUNCA venderá, alquilará ni cederá tus datos personales o historial de búsqueda a anunciantes, bancos de datos ni agencias externas</strong>.
            </div>
            <p>
              Tus datos solo son tratados por proveedores tecnológicos esenciales (como servidores de base de datos encriptados y plataformas seguras de envío de notificaciones como Resend o Twilio).
            </p>
          </section>

          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-emerald-400">5.</span> Tus Derechos (Acceso, Supresión y Baja Instantánea)
            </h2>
            <p>
              Conforme al RGPD, tienes derecho a:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
              <li><strong>Acceder</strong> a los datos que tenemos sobre ti.</li>
              <li><strong>Rectificar</strong> cualquier dato erróneo o desactualizado.</li>
              <li><strong>Suprimir tus datos (&quot;Derecho al olvido&quot;):</strong> Puedes eliminar tu cuenta o darte de baja de cualquier alerta con 1 solo clic en el pie de cualquier notificación o escribiéndonos a privacidad@traveldiscovery.app.</li>
              <li><strong>Oponerte</strong> o limitar el tratamiento en cualquier momento.</li>
            </ul>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
