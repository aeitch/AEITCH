import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Foundation Semantic Tokens
        bg: {
          DEFAULT: 'var(--bg)',
          elevated: 'var(--bg-elevated)',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          1: 'var(--surface)',
          2: 'var(--surface-2)',
          border: 'var(--border)',
          'border-strong': 'var(--border-strong)',
        },
        border: {
          DEFAULT: 'var(--border)',
          strong: 'var(--border-strong)',
        },
        fg: {
          DEFAULT: 'var(--fg)',
          muted: 'var(--fg-muted)',
          subtle: 'var(--fg-subtle)',
        },
        // Single Brand Accent: #e9800a (Orange)
        accent: {
          DEFAULT: '#e9800a',
          hover: '#ff9420',
          press: '#c96d05',
          soft: 'rgba(233, 128, 10, 0.12)',
          glow: 'rgba(233, 128, 10, 0.35)',
          on: '#000000',
        },
        // Monochromatic / Accent Aliases ensuring 0% green, teal, gold, or purple remains
        void: '#000000',
        emerald: {
          DEFAULT: '#e9800a',
          300: '#ffb366',
          400: '#ff9420',
          500: '#e9800a',
          600: '#c96d05',
          700: '#a55603',
          800: '#7a3f02',
          900: '#4d2700',
          950: '#1a0d00',
          glow: 'rgba(233, 128, 10, 0.3)',
        },
        teal: {
          DEFAULT: 'rgba(255, 255, 255, 0.15)',
          300: 'rgba(255, 255, 255, 0.70)',
          400: 'rgba(255, 255, 255, 0.60)',
          500: 'rgba(255, 255, 255, 0.40)',
          600: 'rgba(255, 255, 255, 0.25)',
          700: 'rgba(255, 255, 255, 0.18)',
          800: 'rgba(255, 255, 255, 0.12)',
          900: 'rgba(255, 255, 255, 0.08)',
          950: '#0a0a0a',
        },
        sand: {
          DEFAULT: '#e9800a',
          gold: '#e9800a',
          light: '#ffffff',
          warm: 'rgba(255, 255, 255, 0.64)',
          glow: 'rgba(233, 128, 10, 0.25)',
        },
        cyan: {
          DEFAULT: 'rgba(255, 255, 255, 0.7)',
          400: '#ffffff',
          500: 'rgba(255, 255, 255, 0.8)',
        },
      },
      boxShadow: {
        'glow-sm': '0 0 15px -2px rgba(233, 128, 10, 0.3)',
        'glow-md': '0 0 25px -4px rgba(233, 128, 10, 0.45)',
        'glow-lg': '0 0 40px -6px rgba(233, 128, 10, 0.6)',
        'glow-gold': '0 0 25px -4px rgba(233, 128, 10, 0.35)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-arabic)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'conic-spin': 'conicSpin 6s linear infinite',
        marquee: 'marquee 30s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        conicSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
