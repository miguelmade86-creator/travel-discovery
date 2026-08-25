'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Send, Bell, ShieldCheck, Sparkles, Flame, Check } from 'lucide-react';
import { AFFILIATE_CONFIG } from '@/lib/affiliate';

export default function CommunityVipBanner() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[32px] p-8 sm:p-12 overflow-hidden border border-emerald-500/30 shadow-2xl bg-gradient-to-br from-[#0B1518] via-[#0B0F1A] to-[#120D1A]"
        >
          {/* Ambient Lighting */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-wider self-start">
                <Flame className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>Canal VIP de Chollos Exclusivos</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]">
                No te pierdas ningún error de tarifa <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                  directo a tu móvil
                </span>
              </h2>

              <p className="text-td-secondary text-sm sm:text-base max-w-xl leading-relaxed">
                Cuando una aerolínea baja una ruta a 29 € o Booking saca un 4★ a mitad de precio, avisamos primero por nuestro canal privado de WhatsApp y Telegram.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-td-muted">
                <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>100% Gratis y sin spam</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Máximo 1 chollo al día</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>14.500+ viajeros suscritos</span>
                </div>
              </div>
            </div>

            {/* Right CTA Action Buttons (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-3.5 bg-black/40 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl">
              <div className="text-center sm:text-left mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-td-muted block">Elige tu canal favorito:</span>
                <span className="text-base font-extrabold text-white">Únete en 1 clic gratis</span>
              </div>

              {/* WhatsApp Button */}
              <a
                href={AFFILIATE_CONFIG.whatsappChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-[#0B0F1A] font-black py-3.5 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-[#25D366]/20 hover:scale-[1.02] text-sm"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Unirme al Canal de WhatsApp</span>
              </a>

              {/* Telegram Button */}
              <a
                href={AFFILIATE_CONFIG.telegramChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#0088CC] hover:bg-[#0077b5] text-white font-black py-3.5 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-[#0088CC]/20 hover:scale-[1.02] text-sm"
              >
                <Send className="w-5 h-5" />
                <span>Unirme al Canal de Telegram</span>
              </a>

              <p className="text-[10px] text-td-muted text-center mt-1">
                Puedes silenciar o salirte en cualquier momento con un solo toque.
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
