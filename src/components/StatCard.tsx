import React from 'react';
import { cn } from '../lib/utils';

interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  subText?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, label, value, subText, className }) => {
  return (
    <div className={cn("bg-white rounded-2xl border border-forest/10 p-6", className)}>
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-[11px] font-bold tracking-widest text-sage uppercase mb-2">{label}</div>
      <div className="font-display text-4xl font-black text-forest leading-none">{value}</div>
      {subText && <div className="text-xs text-sage/60 mt-2">{subText}</div>}
    </div>
  );
};
