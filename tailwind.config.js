/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'w560': '560px',
      'sm': '640px',
      'md': '768px',
      'tablet': '810px',
      'w900': '900px',
      'desktop': '1024px',
      'w1200': '1200px',
      'max': '1600px',
    },
    extend: {
      colors: {
        background: '#000000',
        contactBg: '#050505',
        contactCard: '#0b0b0c',
        contactBorder: 'rgba(255, 255, 255, 0.09)',
        contactText: '#fafafa',
        contactMuted: '#a1a1aa',
        contactSubtle: '#85858c',
        amberAccent: '#FFC247',
        tealAccent: '#5EEAD4',
        coralAccent: '#FF8F9B',
        blueAccent: '#62B6FF',
        pink: {
          accent: 'rgb(255, 156, 170)',
          glow: 'rgba(252, 106, 128, 0.2)',
          glowLight: 'rgba(252, 106, 128, 0.1)',
          glowButton: 'rgba(252, 106, 128, 0.15)',
          border: 'rgb(79, 19, 53)',
        },
        gold: {
          accent: 'rgb(242, 196, 97)',
        },
        darkCard: 'rgb(18, 18, 18)',
      },
      fontFamily: {
        sans: ['"Inter Tight"', '"Inter Display"', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        display: ['"Inter Tight"', '"Inter Display"', 'Inter', 'sans-serif'],
        poppins: ['"Poppins"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
