'use client';

import { TripCombination } from '@/lib/types';
import { Copy, Check, MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';
import { useUser } from '@/lib/user-context';

interface ShareCardProps {
  trip: TripCombination;
}

export default function ShareCard({ trip }: ShareCardProps) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useUser();

  const shareText = `✈️ ¡Mira qué viajazo he encontrado con TravelDiscovery! Escapada a ${trip.destination.city} (${trip.nights} noches, Vuelo + Hotel) por solo ${trip.totalPrice} €:`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${shareText} ${window.location.href}`).catch(() => {});
    setCopied(true);
    showToast('¡Enlace copiado al portapapeles!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${shareText} ${window.location.href}`
    )}`;
    window.open(url, '_blank');
  };

  const handleTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(
      window.location.href
    )}&text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="mt-12 mb-8 flex flex-col items-center">
      {/* Visual Shareable Card */}
      <div className="p-[2px] rounded-[34px] bg-gradient-to-br from-td-coral via-td-violet to-td-amber w-full max-w-sm shadow-2xl">
        <div className="bg-[#131828] rounded-[32px] p-6 text-center relative overflow-hidden">
          {/* Watermark flag */}
          <div className="absolute -top-10 -right-10 text-9xl opacity-5 select-none pointer-events-none">
            {trip.destination.flag}
          </div>

          <div className="relative z-10">
            <div className="text-5xl mb-3">{trip.destination.flag}</div>
            <h3 className="text-2xl font-extrabold text-white mb-1">
              ¡Me escapo a {trip.destination.city}!
            </h3>
            <p className="text-td-secondary text-xs sm:text-sm mb-6">
              {trip.nights} noches • Vuelo + Hotel céntrico
            </p>

            <div className="flex items-center justify-center gap-4 mb-6 bg-white/[0.03] py-3 rounded-2xl border border-white/5">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-black td-gradient-text">
                  {trip.totalPrice} €
                </div>
                <div className="text-[10px] text-td-muted uppercase tracking-wider font-semibold">
                  por persona
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-3.5 mb-6 text-xs text-td-secondary text-left space-y-2 border border-white/5">
              <div className="flex items-center gap-2">
                <span>✈️</span>
                <span className="truncate">
                  {trip.outboundFlight.airline} • {trip.outboundFlight.duration} (Directo)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>🏨</span>
                <span className="truncate">
                  {trip.hotel.name} • ⭐ {trip.hotel.rating}/10
                </span>
              </div>
            </div>

            <div className="text-[11px] font-semibold text-td-muted flex items-center justify-center gap-1.5">
              <span>Descubierto en</span>
              <span className="text-white font-bold">Travel</span>
              <span className="td-gradient-text font-black">Discovery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Share Action Buttons */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 max-w-sm w-full">
        <button
          onClick={handleCopy}
          className="td-glass hover:bg-white/10 transition-all rounded-full px-5 py-3 text-xs sm:text-sm font-semibold flex items-center gap-2 text-white"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-td-emerald" />
              <span>¡Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-td-muted" />
              <span>Copiar enlace</span>
            </>
          )}
        </button>

        <button
          onClick={handleWhatsApp}
          className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 rounded-full px-4 py-3 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </button>

        <button
          onClick={handleTelegram}
          className="bg-sky-600/20 hover:bg-sky-600/30 text-sky-400 border border-sky-500/30 rounded-full px-4 py-3 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Send className="w-4 h-4" />
          <span>Telegram</span>
        </button>
      </div>
    </div>
  );
}
