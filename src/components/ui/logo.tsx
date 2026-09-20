import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface LogoProps {
  variant?: 'full' | 'header' | 'footer' | 'icon' | 'portal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  href?: string | null;
  className?: string;
  portalBadge?: string;
}

export function Logo({
  variant = 'header',
  size = 'md',
  showTagline = false,
  href = '/',
  className,
  portalBadge,
}: LogoProps) {
  const sizeMap = {
    sm: { img: 32, text: 'text-base', subtext: 'text-[9px]' },
    md: { img: 40, text: 'text-lg', subtext: 'text-[10px]' },
    lg: { img: 48, text: 'text-xl', subtext: 'text-xs' },
    xl: { img: 64, text: 'text-2xl', subtext: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  const content = (
    <div
      className={cn(
        'inline-flex items-center gap-3 select-none group transition-opacity hover:opacity-95',
        className
      )}
    >
      {/* Official High-Resolution Transparent Logo Mark */}
      <div className="relative flex-shrink-0 p-0.5 rounded-full overflow-hidden flex items-center justify-center bg-transparent">
        <Image
          src="/images/dizibrand-logo.png"
          alt="DiziBrand Media - Your Growth Partner"
          width={currentSize.img}
          height={currentSize.img}
          priority
          className="object-contain w-auto h-auto max-h-full"
          style={{ height: `${currentSize.img}px`, width: 'auto' }}
        />
      </div>

      {/* Lockup typography preserving exact brand proportions */}
      {variant !== 'icon' && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'font-mono font-bold tracking-tight text-white transition-colors group-hover:text-slate-100',
                currentSize.text
              )}
            >
              DIZI<span className="text-brand-red-orange">BRAND</span>
              {variant === 'footer' || variant === 'full' || variant === 'header' ? ' MEDIA' : ''}
            </span>

            {portalBadge && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold uppercase bg-brand-red-orange/15 text-brand-red-orange border border-brand-red-orange/30">
                {portalBadge}
              </span>
            )}
          </div>

          {(showTagline || variant === 'full' || variant === 'footer') && (
            <span
              className={cn(
                'font-mono uppercase tracking-widest text-brand-muted font-medium mt-1',
                currentSize.subtext
              )}
            >
              Your Growth Partner
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red-orange rounded-md">
        {content}
      </Link>
    );
  }

  return content;
}
