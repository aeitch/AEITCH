"use client";

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'relative inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-void disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98]';

    const variants = {
      primary:
        'bg-accent text-black font-semibold shadow-glow-sm hover:bg-accent hover:brightness-110 hover:shadow-glow-md active:bg-accent',
      secondary:
        'bg-surface-2 text-white border border-white/20 hover:border-accent hover:bg-white/10 hover:text-white',
      outline:
        'border border-accent/60 text-accent bg-transparent hover:bg-accent hover:text-black hover:shadow-glow-sm',
      ghost:
        'text-white/80 bg-transparent hover:bg-white/10 hover:text-white',
      glow:
        'bg-accent text-black font-semibold shadow-glow-md hover:brightness-110 hover:shadow-glow-lg',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs rounded-md gap-1.5',
      md: 'h-10 px-5 text-sm rounded-lg gap-2',
      lg: 'h-12 px-7 text-base rounded-lg gap-2.5',
      icon: 'h-10 w-10 p-0 rounded-lg justify-center',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin shrink-0" />}
        {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
