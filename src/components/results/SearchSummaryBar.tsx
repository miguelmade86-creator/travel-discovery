'use client';

import Link from 'next/link';
import { Edit2, MapPin, Calendar, Moon, Wallet, UserCheck, UserX } from 'lucide-react';
import { ALL_AIRPORTS } from '@/lib/types';

interface SearchSummaryBarProps {
  originCode?: string;
  month?: string;
  nights?: number;
  budget?: number;
  isResident?: boolean;
}

export default function SearchSummaryBar({
  originCode = 'TFS',
  month = 'Octubre',
  nights = 3,
  budget = 150,
  isResident = true,
}: SearchSummaryBarProps) {
  const airport = ALL_AIRPORTS.find((a) => a.code === originCode);
  const originName = airport ? `${airport.name} (${airport.code})` : originCode;

  return (
    <div className="w-full py-2.5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        
        {/* Search Parameter Badges */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1 text-white font-bold">
            <MapPin className="w-3.5 h-3.5 text-td-coral" />
            <span>
              {originName} <span className="text-td-muted mx-0.5">→</span> Cualquier destino
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-2.5 py-1 text-td-secondary font-medium">
            <Calendar className="w-3.5 h-3.5 text-td-amber" />
            <span>{month}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-2.5 py-1 text-td-secondary font-medium">
            <Moon className="w-3.5 h-3.5 text-td-violet" />
            <span>{nights} noches</span>
          </div>

          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-2.5 py-1 text-td-secondary font-medium">
            <Wallet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tope: <strong className="text-white">{budget} €</strong></span>
          </div>

          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-2.5 py-1 text-td-secondary font-medium">
            {airport?.region === 'canarias' || airport?.region === 'baleares' ? (
              isResident ? (
                <>
                  <UserCheck className="w-3.5 h-3.5 text-td-cyan" />
                  <span className="text-emerald-400 font-bold">Residente (-75%)</span>
                </>
              ) : (
                <>
                  <UserX className="w-3.5 h-3.5 text-td-muted" />
                  <span>No residente</span>
                </>
              )
            ) : (
              <>
                <span className="text-xs">🇪🇸</span>
                <span className="text-white font-medium">Tarifa Peninsular</span>
              </>
            )}
          </div>
        </div>

        {/* Modify Search CTA */}
        <Link
          href="/"
          className="text-xs font-bold text-td-coral flex items-center gap-1 hover:text-td-orange transition-colors bg-td-coral/10 hover:bg-td-coral/20 px-3 py-1 rounded-full border border-td-coral/30 ml-auto sm:ml-0 shrink-0"
        >
          <Edit2 className="w-3 h-3" />
          <span>Modificar búsqueda</span>
        </Link>
      </div>
    </div>
  );
}
