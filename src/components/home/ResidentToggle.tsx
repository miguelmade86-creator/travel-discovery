'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Info } from 'lucide-react';

interface ResidentToggleProps {
  isResident: boolean;
  onToggle: () => void;
}

export default function ResidentToggle({ isResident, onToggle }: ResidentToggleProps) {
  return (
    <div
      onClick={onToggle}
      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 select-none ${
        isResident
          ? 'bg-gradient-to-r from-emerald-950/40 via-teal-950/20 to-transparent border-emerald-500/40 shadow-lg shadow-emerald-950/30'
          : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05]'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
            isResident ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/5 text-td-muted'
          }`}
        >
          <span className="text-base">🏝️</span>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-sm font-extrabold text-white">
              Soy residente canario
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-wider">
              -75% Dto.
            </span>
          </div>
          <span className="text-xs text-td-secondary mt-0.5">
            Aplica automáticamente la bonificación estatal en vuelos nacionales (Península y Baleares).
          </span>
        </div>
      </div>

      {/* Switch Toggle */}
      <div
        className={`w-12 h-6.5 rounded-full p-1 transition-colors relative shrink-0 ${
          isResident ? 'bg-emerald-500' : 'bg-white/15'
        }`}
      >
        <motion.div
          animate={{ x: isResident ? 22 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="w-4.5 h-4.5 rounded-full bg-white shadow-md"
        />
      </div>
    </div>
  );
}
