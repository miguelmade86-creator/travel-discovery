'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Star, Sparkles, CheckCircle } from 'lucide-react';
import { TRUST_STATS } from '@/lib/content-data';

export default function TrustStatsBar() {
  const icons = [
    <Sparkles key="1" className="w-5 h-5 text-td-coral" />,
    <Star key="2" className="w-5 h-5 text-td-amber" />,
    <CheckCircle key="3" className="w-5 h-5 text-td-emerald" />,
    <ShieldCheck key="4" className="w-5 h-5 text-td-cyan" />,
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="td-glass-strong rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
          {TRUST_STATS.map((stat, i) => (
            <div key={i} className={`flex flex-col items-center text-center ${i > 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''}`}>
              <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center mb-3 border border-white/10 shadow-inner">
                {icons[i]}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-td-primary mt-1">
                {stat.label}
              </div>
              <div className="text-xs text-td-muted mt-0.5">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
