import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'default';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-lg active:scale-[0.98] select-none';

    const variants = {
      primary:
        'bg-[#FF4B3E] text-white hover:bg-[#B20E16] shadow-[0_0_20px_rgba(255,75,62,0.25)] hover:shadow-[0_0_25px_rgba(255,75,62,0.4)] focus-visible:ring-[#FF4B3E] focus-visible:ring-offset-[#00111F]',
      default:
        'bg-[#FF4B3E] text-white hover:bg-[#B20E16] shadow-[0_0_20px_rgba(255,75,62,0.25)] hover:shadow-[0_0_25px_rgba(255,75,62,0.4)] focus-visible:ring-[#FF4B3E] focus-visible:ring-offset-[#00111F]',
      secondary:
        'bg-brand-navy-soft text-slate-100 hover:bg-brand-surface border border-slate-700/90 hover:border-slate-500 focus-visible:ring-slate-400 focus-visible:ring-offset-[#00111F]',
      outline:
        'border border-brand-border text-slate-200 hover:border-[#FF4B3E] hover:text-white bg-transparent focus-visible:ring-[#FF4B3E] focus-visible:ring-offset-[#00111F]',
      ghost:
        'text-slate-300 hover:text-white hover:bg-brand-navy-soft/60 focus-visible:ring-slate-400 focus-visible:ring-offset-[#00111F]',
      danger:
        'bg-[#B20E16] text-white hover:bg-red-800 focus-visible:ring-[#B20E16] focus-visible:ring-offset-[#00111F]',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5',
      md: 'text-sm px-4 py-2.5 gap-2',
      lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
