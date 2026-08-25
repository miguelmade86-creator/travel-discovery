'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  formatter?: (val: number) => string;
  className?: string;
}

export default function AnimatedCounter({
  from = 0,
  to,
  duration = 1.6,
  prefix = '',
  suffix = '',
  decimals = 0,
  formatter,
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const updateCounter = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      // Smooth ease-out curve (cubic)
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = from + (to - from) * easeOutProgress;

      setValue(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        setValue(to);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, from, to, duration]);

  const displayValue = formatter
    ? formatter(value)
    : decimals > 0
    ? value.toFixed(decimals)
    : Math.round(value).toLocaleString('es-ES');

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
