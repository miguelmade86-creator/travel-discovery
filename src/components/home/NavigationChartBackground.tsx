'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function NavigationChartBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Bind scroll to the hero container for kinetic parallax
  const { scrollYProgress } = useScroll({
    offset: ['start start', '500px start'],
  });

  // Parallax & Disassembly Transformations
  const chartOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const chartScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  // Astrolabe & Compass Rose: Rotates, expands and floats away
  const compassRotate = useTransform(scrollYProgress, [0, 1], [0, 75]);
  const compassScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const compassX = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const compassY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const compassOpacity = useTransform(scrollYProgress, [0, 0.8], [0.85, 0]);

  // Coastlines & Map Landmasses: Disassembles outward
  const mapLandScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const mapLandOpacity = useTransform(scrollYProgress, [0, 0.75], [0.65, 0]);

  // Radar Canary: Expands in soft wave
  const radarScale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);
  const radarOpacity = useTransform(scrollYProgress, [0, 0.7], [0.75, 0]);

  // Flight Arcs: Unravels
  const flightArcsY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const flightArcsOpacity = useTransform(scrollYProgress, [0, 0.7], [0.85, 0]);

  // Rhumb Lines & Compass grid
  const rhumbLinesScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const rhumbLinesOpacity = useTransform(scrollYProgress, [0, 0.65], [0.48, 0]);

  // Ambient Aurora
  const auroraY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const auroraOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
    >
      {/* 1. Luminous Ambient Warm Aurora Glows */}
      <motion.div
        style={{ y: auroraY, opacity: auroraOpacity }}
        className="absolute inset-0"
      >
        <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-gradient-to-b from-td-coral/18 via-td-amber/10 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-1/4 -left-36 w-[500px] h-[500px] bg-td-violet/15 blur-[150px] rounded-full" />
        <div className="absolute top-1/3 -right-36 w-[500px] h-[500px] bg-td-amber/15 blur-[150px] rounded-full" />
      </motion.div>

      {/* 2. Authentic Antique Portolan & Celestial Navigation Chart (Perfect Calibrated Opacity) */}
      <motion.svg
        style={{ scale: chartScale, opacity: chartOpacity }}
        className="absolute inset-0 w-full h-full z-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          {/* Subtle Golden/Coral Gradients */}
          <linearGradient id="flight-glow-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#FFBD44" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0.5" />
          </linearGradient>

          <linearGradient id="flight-glow-2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#34D399" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FF6B6B" stopOpacity="0.45" />
          </linearGradient>

          <linearGradient id="compass-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE066" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#FFBD44" stopOpacity="0.68" />
            <stop offset="100%" stopColor="#FF6B6B" stopOpacity="0.45" />
          </linearGradient>

          <linearGradient id="land-hatch" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,189,68,0.10)" />
            <stop offset="100%" stopColor="rgba(255,107,107,0.03)" />
          </linearGradient>
        </defs>

        {/* -------------------------------------------------------------
            A. PORTOLAN RHUMB LINES & RADIAL RAYS (Líneas Claras de Rumbo)
           ------------------------------------------------------------- */}
        <motion.g
          style={{ scale: rhumbLinesScale, opacity: rhumbLinesOpacity }}
          stroke="rgba(255, 189, 68, 0.24)"
          strokeWidth="0.8"
          strokeDasharray="4 8"
          className="origin-[340px_660px]"
        >
          {/* Main rays from Canary Archipelago */}
          <line x1="340" y1="660" x2="780" y2="140" stroke="rgba(255, 189, 68, 0.28)" />
          <line x1="340" y1="660" x2="1240" y2="200" stroke="rgba(255, 107, 107, 0.3)" />
          <line x1="340" y1="660" x2="1460" y2="440" />
          <line x1="340" y1="660" x2="1540" y2="160" />
          <line x1="340" y1="660" x2="80" y2="200" />
          <line x1="340" y1="660" x2="560" y2="880" />
          <line x1="340" y1="660" x2="1500" y2="800" stroke="rgba(52, 211, 153, 0.22)" />

          {/* Secondary Ray Center (Lisboa / Península Hub: X: 840, Y: 360) */}
          <line x1="840" y1="360" x2="340" y2="660" />
          <line x1="840" y1="360" x2="1240" y2="200" stroke="rgba(168, 85, 247, 0.28)" />
          <line x1="840" y1="360" x2="1400" y2="420" />
          <line x1="840" y1="360" x2="150" y2="180" />
          <line x1="840" y1="360" x2="720" y2="880" />

          {/* Mediterranean Ray Center (X: 1240, Y: 200) */}
          <line x1="1240" y1="200" x2="150" y2="380" />
          <line x1="1240" y1="200" x2="820" y2="860" />
          <line x1="1240" y1="200" x2="1520" y2="620" />
        </motion.g>

        {/* -------------------------------------------------------------
            B. DETAILED ANTIQUE PORTOLAN COASTLINES (Iberia, África, Europa, Canarias)
           ------------------------------------------------------------- */}
        <motion.g
          style={{ scale: mapLandScale, opacity: mapLandOpacity }}
          className="origin-[800px_450px]"
        >
          {/* 1. IBERIAN PENINSULA (España & Portugal con Rías y Bahías) */}
          <path
            d="M 780,285 C 800,280 840,282 890,290 C 930,295 960,285 990,295 C 1025,315 1055,330 1068,345 C 1078,375 1045,420 1015,465 C 992,490 955,508 922,514 C 890,518 860,508 840,488 C 820,468 790,468 770,438 C 750,398 755,348 775,305 Z"
            fill="url(#land-hatch)"
            stroke="rgba(255, 189, 68, 0.35)"
            strokeWidth="1.1"
          />
          {/* Coastal Echo / Shoreline Ripple */}
          <path
            d="M 775,280 C 798,275 840,277 895,285 C 935,290 965,280 995,290 C 1030,310 1062,325 1075,342 C 1085,378 1050,425 1020,470 C 995,495 958,514 920,520 C 885,524 855,513 835,492 C 814,470 782,470 762,439 C 742,395 748,344 770,300 Z"
            stroke="rgba(255, 189, 68, 0.16)"
            strokeWidth="0.75"
            strokeDasharray="2 4"
          />

          {/* 2. NORTH AFRICA / MOROCCO & STRAIT OF GIBRALTAR */}
          <path
            d="M 830,545 C 870,540 920,535 980,550 C 1040,565 1100,560 1160,570 C 1220,580 1280,610 1340,640 L 1380,720 L 720,780 C 700,730 730,670 760,620 C 790,570 810,550 830,545 Z"
            fill="rgba(255, 107, 107, 0.025)"
            stroke="rgba(255, 107, 107, 0.28)"
            strokeWidth="1.1"
          />
          {/* Atlas Mountain Ridge Indications */}
          <path
            d="M 850,600 Q 880,590 920,610 Q 960,595 1010,620 Q 1060,605 1120,630"
            stroke="rgba(255, 107, 107, 0.18)"
            strokeWidth="0.85"
            strokeDasharray="3 3"
          />

          {/* 3. FRANCE & BRITISH ISLES */}
          <path
            d="M 985,290 C 1000,260 1020,230 1000,190 C 980,160 1010,130 1060,120 C 1120,110 1180,140 1190,190 C 1200,230 1150,270 1120,300 C 1080,335 1020,310 985,290 Z"
            fill="rgba(168, 85, 247, 0.02)"
            stroke="rgba(168, 85, 247, 0.26)"
            strokeWidth="0.9"
          />
          {/* British Isles Outline */}
          <path
            d="M 930,140 C 950,110 980,90 1000,105 C 1020,120 1010,150 990,170 C 970,185 940,175 930,140 Z"
            stroke="rgba(168, 85, 247, 0.2)"
            strokeWidth="0.8"
            strokeDasharray="2 3"
          />

          {/* 4. ITALIAN PENINSULA & MEDITERRANEAN */}
          <path
            d="M 1200,240 C 1220,260 1260,300 1290,340 C 1310,370 1340,410 1370,440 C 1385,460 1375,475 1355,470 C 1335,460 1315,420 1285,380 C 1265,350 1240,320 1215,290 Z"
            fill="rgba(34, 211, 238, 0.025)"
            stroke="rgba(34, 211, 238, 0.28)"
            strokeWidth="0.9"
          />
          {/* Sicilia, Cerdeña, Baleares */}
          <circle cx="1340" cy="485" r="13" stroke="rgba(34, 211, 238, 0.25)" strokeWidth="0.75" />
          <ellipse cx="1230" cy="360" rx="8" ry="16" stroke="rgba(34, 211, 238, 0.25)" strokeWidth="0.75" />
          <ellipse cx="1140" cy="410" rx="11" ry="6" stroke="rgba(255, 189, 68, 0.25)" strokeWidth="0.75" />

          {/* 5. CANARY ARCHIPELAGO ISLANDS (Las 7 Islas Canarias con Borde Nítido) */}
          <g stroke="rgba(255, 107, 107, 0.55)" strokeWidth="1.1" fill="rgba(255, 107, 107, 0.14)">
            {/* Tenerife */}
            <polygon points="340,650 360,638 375,652 355,666 335,660" />
            {/* Gran Canaria */}
            <circle cx="395" cy="668" r="10" />
            {/* Fuerteventura */}
            <path d="M 445,630 Q 460,655 455,685 Q 440,680 435,650 Z" />
            {/* Lanzarote */}
            <polygon points="465,605 480,600 488,618 472,625" />
            {/* La Palma */}
            <ellipse cx="295" cy="635" rx="6" ry="11" />
            {/* La Gomera & El Hierro */}
            <circle cx="318" cy="668" r="5" />
            <polygon points="280,675 292,670 290,685 278,685" />
          </g>

          {/* 6. HISTORICAL CARTOGRAPHIC LABELS */}
          <g fill="rgba(255, 255, 255, 0.32)" fontSize="8.5" fontFamily="serif" letterSpacing="3" fontStyle="italic">
            <text x="430" y="460">MARE OCEANUM ATLANTICUM</text>
            <text x="1100" y="470">MARE MEDITERRANEUM</text>
            <text x="840" y="380" fill="rgba(255,189,68,0.45)">HISPANIA</text>
            <text x="765" y="390" fill="rgba(255,189,68,0.4)">LUSITANIA</text>
            <text x="940" y="660" fill="rgba(255,107,107,0.38)">BARBARIA / MAURETANIA</text>
            <text x="270" y="725" fill="#FF6B6B" fontSize="9.5" fontWeight="bold" fontStyle="normal" opacity="0.75">
              INSULAE FORTUNATAE (CANARIA)
            </text>
          </g>

          {/* 7. VINTAGE SAILING CARAVEL */}
          <g transform="translate(520, 520) scale(0.62)" stroke="rgba(255, 189, 68, 0.42)" strokeWidth="0.95" fill="none">
            <path d="M 10,40 C 30,55 90,55 110,40 L 105,30 L 15,30 Z" fill="rgba(255,189,68,0.06)" />
            <line x1="40" y1="30" x2="40" y2="5" />
            <line x1="75" y1="30" x2="75" y2="0" />
            <path d="M 40,8 Q 58,15 40,25 Q 25,18 40,8" fill="rgba(255,189,68,0.12)" />
            <path d="M 75,3 Q 98,12 75,25 Q 58,15 75,3" fill="rgba(255,189,68,0.14)" />
            <path d="M 75,0 L 90,3 L 75,6 Z" fill="#FF6B6B" opacity="0.7" />
            <path d="M 5,46 Q -15,50 -25,48" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />
          </g>
        </motion.g>

        {/* -------------------------------------------------------------
            C. CELESTIAL ASTROLABE & COMPASS ROSE (Rosa de los Vientos Dorada)
           ------------------------------------------------------------- */}
        <motion.g
          style={{
            rotate: compassRotate,
            scale: compassScale,
            x: compassX,
            y: compassY,
            opacity: compassOpacity,
          }}
          className="origin-[1300px_200px]"
          transform="translate(1300, 200)"
        >
          {/* Outer Graduated Rings */}
          <circle cx="0" cy="0" r="145" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="0.85" strokeDasharray="3 6" />
          <circle cx="0" cy="0" r="120" stroke="url(#compass-gold)" strokeWidth="1.2" opacity="0.8" />
          <circle cx="0" cy="0" r="85" stroke="rgba(255, 189, 68, 0.32)" strokeWidth="0.75" strokeDasharray="4 4" />
          <circle cx="0" cy="0" r="45" stroke="rgba(255, 107, 107, 0.25)" strokeWidth="0.75" />
          <circle cx="0" cy="0" r="4" fill="#FFE066" opacity="0.9" />

          {/* Compass Crosshairs */}
          <line x1="-155" y1="0" x2="155" y2="0" stroke="rgba(255, 189, 68, 0.3)" strokeWidth="0.85" strokeDasharray="4 4" />
          <line x1="0" y1="-155" x2="0" y2="155" stroke="rgba(255, 189, 68, 0.3)" strokeWidth="0.85" strokeDasharray="4 4" />
          <line x1="-100" y1="-100" x2="100" y2="100" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.7" strokeDasharray="2 6" />
          <line x1="-100" y1="100" x2="100" y2="-100" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.7" strokeDasharray="2 6" />

          {/* Diamond Compass Star */}
          <polygon
            points="0,-42 10,-13 42,0 10,10 0,42 -10,10 -42,0 -10,-13"
            stroke="#FFE066"
            strokeWidth="1.2"
            fill="rgba(255, 189, 68, 0.08)"
            filter="drop-shadow(0 0 5px rgba(255,189,68,0.35))"
          />

          {/* Cardinal Directions */}
          <text x="-4" y="-126" fill="#FFE066" fontSize="9" fontFamily="monospace" fontWeight="bold" opacity="0.9">N</text>
          <text x="126" y="3" fill="#FFF" fontSize="9" fontFamily="monospace" opacity="0.75">E</text>
          <text x="-4" y="134" fill="#FFF" fontSize="9" fontFamily="monospace" opacity="0.75">S</text>
          <text x="-134" y="3" fill="#FFF" fontSize="9" fontFamily="monospace" opacity="0.75">W</text>
        </motion.g>

        {/* -------------------------------------------------------------
            D. GREAT-CIRCLE FLIGHT ARCS (Trayectorias Geodésicas Claras)
           ------------------------------------------------------------- */}
        <motion.g style={{ y: flightArcsY, opacity: flightArcsOpacity }}>
          {/* TFS -> Barcelona / Europa */}
          <path
            d="M 360,650 Q 760,220 1200,310"
            stroke="url(#flight-glow-1)"
            strokeWidth="2"
            strokeDasharray="6 5"
            filter="drop-shadow(0 0 5px rgba(255,189,68,0.3))"
          />

          {/* LPA -> Roma / Mediterráneo */}
          <path
            d="M 395,668 Q 960,260 1420,410"
            stroke="url(#flight-glow-2)"
            strokeWidth="1.7"
            strokeDasharray="5 7"
            filter="drop-shadow(0 0 5px rgba(34,211,238,0.3))"
          />

          {/* TFS -> Londres */}
          <path
            d="M 360,650 Q 640,60 990,160"
            stroke="url(#flight-glow-1)"
            strokeWidth="1.3"
            strokeDasharray="4 7"
            opacity="0.7"
          />
        </motion.g>

        {/* -------------------------------------------------------------
            E. CANARY ISLANDS RADAR RANGE RINGS */}
        <motion.g
          style={{ scale: radarScale, opacity: radarOpacity }}
          className="origin-[360px_650px]"
          transform="translate(360, 650)"
        >
          <circle cx="0" cy="0" r="45" stroke="#FF6B6B" strokeWidth="1.1" strokeDasharray="3 3" opacity="0.6" />
          <circle cx="0" cy="0" r="110" stroke="#FFBD44" strokeWidth="0.85" strokeDasharray="4 6" opacity="0.45" />
          <circle cx="0" cy="0" r="240" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="0.55" strokeDasharray="2 8" />
        </motion.g>

        {/* -------------------------------------------------------------
            F. MARGINAL NAUTICAL SCALE BAR & CARTOGRAPHIC RIBBONS
           ------------------------------------------------------------- */}
        <g stroke="rgba(255, 255, 255, 0.09)" strokeWidth="0.65" strokeDasharray="3 8">
          <line x1="0" y1="130" x2="1600" y2="130" />
          <line x1="0" y1="800" x2="1600" y2="800" />
          <line x1="160" y1="0" x2="1600" y2="900" opacity="0.25" />
          <line x1="1480" y1="0" x2="1480" y2="900" />
        </g>

        {/* Portolan Nautical Scale Bar */}
        <g transform="translate(680, 835)" fill="none" stroke="rgba(255, 189, 68, 0.35)" strokeWidth="0.7">
          <rect x="0" y="0" width="240" height="5" fill="rgba(255,189,68,0.05)" />
          <line x1="60" y1="0" x2="60" y2="5" stroke="#FFBD44" />
          <line x1="120" y1="0" x2="120" y2="5" stroke="#FFBD44" />
          <line x1="180" y1="0" x2="180" y2="5" stroke="#FFBD44" />
          <text x="0" y="-4" fill="rgba(255, 189, 68, 0.55)" fontSize="7" fontFamily="monospace">0</text>
          <text x="52" y="-4" fill="rgba(255, 189, 68, 0.55)" fontSize="7" fontFamily="monospace">250</text>
          <text x="110" y="-4" fill="rgba(255, 189, 68, 0.55)" fontSize="7" fontFamily="monospace">500</text>
          <text x="215" y="-4" fill="rgba(255, 189, 68, 0.55)" fontSize="7" fontFamily="monospace">1000 LEAGUES</text>
        </g>

        {/* Marginal Coordinates */}
        <g fill="rgba(255, 255, 255, 0.28)" fontSize="8" fontFamily="monospace" letterSpacing="1.5">
          <text x="24" y="124">PARALLEL 45°N [GALLIA & CENTRAL CORRIDOR]</text>
          <text x="24" y="794">PARALLEL 28°N [CANARIAN MERIDIAN]</text>
          <text x="180" y="880">MERIDIAN 16°W</text>
          <text x="1486" y="880">MERIDIAN 12°E</text>
        </g>
      </motion.svg>
    </div>
  );
}
