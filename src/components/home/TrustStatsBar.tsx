'use client';

import { motion } from 'framer-motion';
import { Flame, Zap, Award, Plane, ShieldCheck, HeartHandshake, Sparkles, Percent } from 'lucide-react';
import AnimatedCounter from '@/components/common/AnimatedCounter';

export default function TrustStatsBar() {
  const stats = [
    {
      icon: <Flame className="w-5 h-5 text-td-coral" />,
      counter: <AnimatedCounter to={1450} suffix="+" duration={2} />,
      label: 'Escapadas Encontradas',
      sub: 'disponibles este mes',
    },
    {
      icon: <Zap className="w-5 h-5 text-td-amber" />,
      counter: <AnimatedCounter to={98} suffix=" €" duration={1.8} />,
      label: 'Precio Más Bajo',
      sub: 'Vuelo directo + Hotel 3★',
    },
    {
      icon: <Award className="w-5 h-5 text-emerald-400" />,
      counter: <AnimatedCounter to={9.8} decimals={1} suffix=" / 10" duration={1.5} />,
      label: 'TripScore Máximo',
      sub: 'Calidad & confort auditado',
    },
    {
      icon: <Plane className="w-5 h-5 text-td-violet" />,
      counter: <AnimatedCounter to={12} suffix=" Ciudades" duration={1.2} />,
      label: 'Destinos Directos',
      sub: 'Península, Europa & Marruecos',
    },
  ];

  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8 border-y border-white/5 bg-[#090D18]/80 relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white/[0.02] border border-white/[0.08] p-5 sm:p-6 rounded-3xl flex flex-col items-center text-center gap-1.5 hover:border-td-coral/30 hover:bg-white/[0.04] transition-all shadow-xl group"
            >
              <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-2xl sm:text-3xl font-black td-gradient-text tracking-tight">
                {stat.counter}
              </div>
              <div className="text-xs sm:text-sm font-bold text-white mt-0.5">{stat.label}</div>
              <div className="text-[11px] text-td-muted">{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
