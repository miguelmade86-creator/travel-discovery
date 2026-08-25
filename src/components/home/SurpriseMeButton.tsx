'use client';

import { motion } from 'framer-motion';
import { Sparkles, Dice5 } from 'lucide-react';

interface SurpriseMeButtonProps {
  onClick: () => void;
}

export default function SurpriseMeButton({ onClick }: SurpriseMeButtonProps) {
  return (
    <div className="flex flex-col items-center gap-1.5 w-full">
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="td-btn-surprise w-full justify-center py-4 text-base sm:text-lg font-bold shadow-xl shadow-fuchsia-950/40 relative overflow-hidden group"
      >
        <span className="text-xl group-hover:rotate-45 transition-transform duration-300">
          🎲
        </span>
        <span>Ruleta Sorpréndeme</span>
        <Sparkles className="w-4 h-4 text-white/80 animate-pulse" />
      </motion.button>
      <span className="text-[11px] text-td-muted font-medium text-center">
        ¿No sabes dónde ir? Te buscamos el mejor viaje
      </span>
    </div>
  );
}
