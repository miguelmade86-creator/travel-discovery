'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TripScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function TripScoreBadge({ score, size = 'md' }: TripScoreBadgeProps) {
  const dimensions = {
    sm: { size: 36, strokeWidth: 3, fontSize: 'text-xs' },
    md: { size: 48, strokeWidth: 4, fontSize: 'text-sm' },
    lg: { size: 64, strokeWidth: 5, fontSize: 'text-lg' }
  }[size];

  const getColor = (s: number) => {
    if (s >= 90) return 'var(--td-emerald)';
    if (s >= 80) return 'var(--td-amber)';
    if (s >= 70) return 'var(--td-orange)';
    return 'var(--td-coral)';
  };

  const color = getColor(score);
  const radius = (dimensions.size - dimensions.strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div 
      className="relative flex items-center justify-center bg-td-surface rounded-full shadow-lg"
      style={{ width: dimensions.size, height: dimensions.size }}
      title={`TripScore: ${score}/100`}
    >
      <svg className="absolute inset-0 transform -rotate-90" width={dimensions.size} height={dimensions.size}>
        <circle
          cx={dimensions.size / 2}
          cy={dimensions.size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={dimensions.strokeWidth}
          fill="none"
        />
        <motion.circle
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          cx={dimensions.size / 2}
          cy={dimensions.size / 2}
          r={radius}
          stroke={color}
          strokeWidth={dimensions.strokeWidth}
          strokeDasharray={circumference}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <span className={`${dimensions.fontSize} font-bold`} style={{ color }}>
        {score}
      </span>
    </div>
  );
}
