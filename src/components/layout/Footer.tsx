import Link from 'next/link';
import { Compass, Mail, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-auto bg-[#070A12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                   style={{ background: 'var(--td-gradient-primary)' }}>
                <Compass className="w-4.5 h-4.5 text-[#0B0F1A]" strokeWidth={2.5} />
              </div>
              <span className="text-base font-bold tracking-tight">
                Travel<span className="td-gradient-text">Discovery</span>
              </span>
            </Link>
            <p className="text-sm text-td-muted leading-relaxed max-w-xs mb-3">
              Tú pones el presupuesto. Nosotros encontramos la escapada perfecta. Vuelo + Hotel combinados sin comisiones añadidas.
            </p>
            <div className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Meta-motor 100% Independiente</span>
            </div>
          </div>

          {/* Escapadas */}
          <div>
            <h3 className="text-xs font-semibold text-td-secondary uppercase tracking-wider mb-4">
              Escapadas populares
            </h3>
            <ul className="space-y-2.5">
              {['Málaga', 'Oporto', 'Barcelona', 'Madrid', 'Roma', 'Marrakech'].map((city) => (
                <li key={city}>
                  <Link href={`/resultados?budget=150&resident=true`}
                    className="text-sm text-td-muted hover:text-td-coral transition-colors">
                    Canarias → {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Funcionalidades & Panel */}
          <div>
            <h3 className="text-xs font-semibold text-td-secondary uppercase tracking-wider mb-4">
              Herramientas
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/perfil" className="text-sm text-td-muted hover:text-td-coral transition-colors flex items-center gap-1.5">
                  <span>👤 Mi Panel de Viajero</span>
                </Link>
              </li>
              <li>
                <Link href="/resultados" className="text-sm text-td-muted hover:text-td-coral transition-colors">
                  🔥 Explorar Chollos
                </Link>
              </li>
              <li>
                <Link href="/perfil" className="text-sm text-td-muted hover:text-td-coral transition-colors">
                  🔔 Configurar Alertas
                </Link>
              </li>
              <li>
                <Link href="/legal/afiliados" className="text-sm text-td-muted hover:text-td-coral transition-colors flex items-center gap-1">
                  <HeartHandshake className="w-3.5 h-3.5 text-td-amber" />
                  <span>Transparencia de Precios</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Cumplimiento */}
          <div>
            <h3 className="text-xs font-semibold text-td-secondary uppercase tracking-wider mb-4">
              Legal & Privacidad
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/legal/terminos" className="text-sm text-td-muted hover:text-td-coral transition-colors">
                  Aviso Legal & Términos
                </Link>
              </li>
              <li>
                <Link href="/legal/privacidad" className="text-sm text-td-muted hover:text-td-coral transition-colors">
                  Política de Privacidad (RGPD)
                </Link>
              </li>
              <li>
                <Link href="/legal/cookies" className="text-sm text-td-muted hover:text-td-coral transition-colors">
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link href="/legal/afiliados" className="text-sm text-td-muted hover:text-td-coral transition-colors">
                  Divulgación de Afiliados
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-td-muted">
            © {new Date().getFullYear()} TravelDiscovery. Meta-motor independiente. Los precios finales y disponibilidad son confirmados en Booking y aerolíneas oficiales.
          </p>
          <div className="flex items-center gap-4">
            <a href="mailto:hola@traveldiscovery.app" className="text-td-muted hover:text-td-coral transition-colors text-xs flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              <span>hola@traveldiscovery.app</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
