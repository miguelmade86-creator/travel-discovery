import React from 'react';

interface EscapyaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  isLink?: boolean;
}

export default function EscapyaLogo({
  size = 'md',
  showTagline = true,
  className = '',
}: EscapyaLogoProps) {
  const sizeConfig = {
    sm: {
      icon: 'w-7 h-7',
      svg: 16,
      text: 'text-lg',
      tagline: 'text-[9px]',
      dot: 'w-1 h-1',
    },
    md: {
      icon: 'w-9 h-9',
      svg: 20,
      text: 'text-xl',
      tagline: 'text-[10px]',
      dot: 'w-1.5 h-1.5',
    },
    lg: {
      icon: 'w-12 h-12',
      svg: 26,
      text: 'text-2xl sm:text-3xl',
      tagline: 'text-xs',
      dot: 'w-2 h-2',
    },
    xl: {
      icon: 'w-16 h-16',
      svg: 36,
      text: 'text-3xl sm:text-4xl',
      tagline: 'text-sm',
      dot: 'w-2.5 h-2.5',
    },
  };

  const cfg = sizeConfig[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Dynamic Emblem / Icon */}
      <div className="relative group/logo flex-shrink-0">
        {/* Ambient Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 via-amber-500 to-orange-500 rounded-2xl blur-sm opacity-60 group-hover/logo:opacity-100 transition duration-500" />
        
        {/* Icon Container */}
        <div
          className={`relative ${cfg.icon} rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#1E2538] via-[#131828] to-[#0A0D16] border border-white/20 p-0.5 flex items-center justify-center shadow-2xl overflow-hidden`}
        >
          {/* Internal Accent Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 via-orange-500/10 to-transparent opacity-80" />

          {/* Precision Vector Symbol: Supersonic Paper Plane + Lightning Energy "YA" */}
          <svg
            width={cfg.svg}
            height={cfg.svg}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 transform group-hover/logo:scale-110 group-hover/logo:-translate-y-0.5 group-hover/logo:translate-x-0.5 transition-transform duration-300 ease-out"
          >
            <defs>
              <linearGradient id="escapya-wing-grad" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FF385C" />
                <stop offset="50%" stopColor="#FF7A00" />
                <stop offset="100%" stopColor="#FFAA00" />
              </linearGradient>
              <linearGradient id="escapya-bolt-grad" x1="16" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFE600" />
                <stop offset="100%" stopColor="#FF385C" />
              </linearGradient>
            </defs>

            {/* Jet Wing Shadow/Base */}
            <path
              d="M4 16.5L28 4L19 28L15 18L4 16.5Z"
              fill="url(#escapya-wing-grad)"
            />

            {/* Inner Fast Aerodynamic Fold */}
            <path
              d="M28 4L15 18L13 23L17 19.5L28 4Z"
              fill="#FFFFFF"
              fillOpacity="0.4"
            />

            {/* Spark of Speed ("YA" Energy Trail) */}
            <circle cx="28" cy="4" r="2.5" fill="#FFE600" />
          </svg>
        </div>
      </div>

      {/* Typography Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-baseline leading-none">
          <span className={`${cfg.text} font-black tracking-tight text-white font-sans`}>
            escap
          </span>
          <span
            className={`${cfg.text} font-black tracking-tight bg-gradient-to-r from-rose-400 via-orange-400 to-amber-300 bg-clip-text text-transparent font-sans ml-[1px]`}
          >
            ya
          </span>
          <span className={`inline-block ${cfg.dot} rounded-full bg-gradient-to-r from-rose-500 to-amber-400 ml-1 shadow-[0_0_8px_rgba(255,78,80,0.8)] animate-pulse`} />
        </div>

        {showTagline && (
          <span className={`${cfg.tagline} text-td-muted font-bold tracking-wider uppercase mt-0.5 hidden sm:block leading-none`}>
            Escapadas Inteligentes
          </span>
        )}
      </div>
    </div>
  );
}
