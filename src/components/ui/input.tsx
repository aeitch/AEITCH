"use client";

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, hint, leftIcon, rightIcon, disabled, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="pointer-events-none absolute left-3.5 flex items-center text-neutral-500">
              {leftIcon}
            </span>
          )}
          <input
            id={inputId}
            type={type}
            ref={ref}
            disabled={disabled}
            className={cn(
              'h-11 w-full rounded-lg border border-surface-border bg-surface-2 px-3.5 text-sm text-neutral-100 placeholder:text-neutral-500',
              'transition-all duration-200',
              'hover:border-neutral-700',
              'focus:border-accent focus:bg-surface-1 focus:outline-none focus:ring-1 focus:ring-accent focus:shadow-glow-xs',
              'disabled:cursor-not-allowed disabled:opacity-50',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/30',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3.5 flex items-center text-neutral-500">
              {rightIcon}
            </span>
          )}
        </div>
        {error && <p className="text-xs text-red-400 font-sans">{error}</p>}
        {!error && hint && <p className="text-xs text-neutral-500 font-sans">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
