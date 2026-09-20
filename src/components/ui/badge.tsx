import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'orange' | 'success' | 'warning' | 'danger' | 'destructive' | 'pending' | 'outline';
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-brand-graphite text-slate-300 border-brand-border',
    orange: 'bg-brand-orange/10 text-brand-orange border-brand-orange/30',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    danger: 'bg-red-500/10 text-red-400 border-red-500/30',
    destructive: 'bg-red-500/10 text-red-400 border-red-500/30',
    pending: 'bg-purple-500/10 text-purple-300 border-purple-500/30 font-mono tracking-wide',
    outline: 'bg-transparent text-slate-300 border-brand-border/80',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
