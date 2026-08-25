'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Star } from 'lucide-react';

export interface DestinationCardItem {
  city: string;
  flag: string;
  image: string;
  from: number;
  airline: string;
  tripId?: string;
}

interface PopularDestinationsClientProps {
  items: DestinationCardItem[];
  origin: string;
  isResident: boolean;
  nights: number;
  month: string;
}

export default function PopularDestinationsClient({
  items,
  origin,
  isResident,
  nights,
  month,
}: PopularDestinationsClientProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((dest, i) => (
        <motion.div
          key={dest.city}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05, duration: 0.5 }}
        >
          <Link
            href={
              dest.tripId
                ? `/viaje/${dest.tripId}`
                : `/resultados?budget=${dest.from + 40}&origin=${origin}&resident=${isResident}&nights=${nights}&month=${encodeURIComponent(month)}`
            }
            className="relative h-80 rounded-[28px] overflow-hidden group block border border-white/10 shadow-xl td-glass-card-hover"
          >
            {/* Background Image with Zoom on Hover */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={dest.image}
              alt={dest.city}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-[0.8]"
            />
            
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-[#0B0F1A]/40 to-black/20 group-hover:from-[#0B0F1A]/95 transition-all duration-300" />

            {/* Top Badge: Flag + City */}
            <div className="absolute top-4 left-4 td-glass px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold text-white shadow-lg">
              <span className="text-base">{dest.flag}</span>
              <span>{dest.city}</span>
            </div>

            {/* Top Right: Action Arrow Button */}
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-80 group-hover:opacity-100 group-hover:bg-td-coral group-hover:text-[#0B0F1A] group-hover:scale-110 transition-all duration-300 shadow-lg">
              <ArrowUpRight className="w-4 h-4" />
            </div>

            {/* Bottom Card Content */}
            <div className="absolute bottom-4 left-4 right-4 p-4 td-glass-strong rounded-2xl border border-white/15 transition-transform duration-300 group-hover:-translate-y-1">
              
              {/* Star Rating Display */}
              <div className="flex items-center gap-1 text-amber-400 mb-1.5">
                {[...Array(4)].map((_, idx) => (
                  <Star key={idx} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
                <Star className="w-3 h-3 text-amber-400/50" />
                <span className="text-[10px] text-td-muted ml-1 font-semibold">4.8 (1.2k+ viajeros)</span>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-lg font-extrabold text-white group-hover:text-td-coral transition-colors">
                    {dest.city}
                  </h3>
                  <p className="text-[11px] text-td-muted">
                    {dest.airline} + {nights} noches hotel
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[10px] text-td-muted uppercase font-bold tracking-wider">desde</p>
                  <p className="text-2xl font-black td-gradient-text leading-none">
                    {dest.from} €
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
