import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'glow' | 'accent' | 'secondary' | 'pulse';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  dot = false,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center font-mono font-medium uppercase tracking-wider rounded-full transition-colors';

  const variants = {
    default:
      'border border-surface-border bg-surface-1 text-neutral-300',
    outline:
      'border border-accent/40 bg-accent/5 text-accent',
    glow:
      'border border-accent/50 bg-accent/10 text-accent-flare shadow-glow-xs',
    accent:
      'bg-accent text-black font-semibold',
    secondary:
      'border border-surface-border bg-surface-2 text-neutral-400',
    pulse:
      'border border-accent/30 bg-surface-1 text-accent shadow-glow-xs',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-2',
    lg: 'text-sm px-3.5 py-1.5 gap-2.5',
  };

  return (
    <div className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {dot && (
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
      )}
      {children}
    </div>
  );
};
