'use client';

import { useEffect, useState, useRef } from 'react';

export default function PlaneCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const planeRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const mouseRef = useRef({ x: -100, y: -100 });
  const angleRef = useRef(45);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on desktop devices with a precision mouse (pointer: fine)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;
    
    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      const dx = e.clientX - mouseRef.current.x;
      const dy = e.clientY - mouseRef.current.y;

      // Only compute angle if there is notable motion to avoid jitter
      if (Math.hypot(dx, dy) > 2) {
        // Calculate flight heading angle in degrees (adjusting +45deg for default plane orientation)
        const rad = Math.atan2(dy, dx);
        const deg = (rad * 180) / Math.PI + 45;
        angleRef.current = deg;
      }

      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Detect if cursor is hovering over an interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.closest('button, a, input, select, textarea, [role="button"], [tabindex="0"]')
        );
        setIsHoveringClickable(isClickable);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth physics loop with lerp interpolation
    const updatePosition = () => {
      // Lerp smooth follow
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.22;
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.22;

      if (planeRef.current) {
        planeRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%) rotate(${angleRef.current}deg)`;
      }

      rafRef.current = requestAnimationFrame(updatePosition);
    };

    rafRef.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={planeRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ willChange: 'transform' }}
    >
      {/* Jet Stream Trail / Afterglow */}
      <div 
        className={`absolute -bottom-1 -left-1 w-2 h-2 rounded-full blur-[2px] transition-all duration-200 ${
          isHoveringClickable 
            ? 'bg-td-coral shadow-[0_0_12px_var(--td-coral)] scale-150' 
            : 'bg-td-cyan/60 shadow-[0_0_8px_var(--td-cyan)]'
        }`} 
      />

      {/* Modern Neon Jet Plane Vector */}
      <div className={`transition-transform duration-200 ${isHoveringClickable ? 'scale-125' : 'scale-100'}`}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
        >
          {/* Airplane Fuselage */}
          <path
            d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z"
            fill={isHoveringClickable ? '#FF5E62' : '#F8FAFC'}
            stroke={isHoveringClickable ? '#FFA07A' : '#38BDF8'}
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
