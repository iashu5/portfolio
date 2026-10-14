/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        violet: { brand: '#7c3aed' },
        dotnet: '#512BD4',
        sky: { brand: '#0ea5e9' },
        ink: { 950: '#070912', 900: '#0b1020', 800: '#111833', 700: '#1a2242' },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        brand: 'linear-gradient(120deg, #7c3aed 0%, #512BD4 45%, #0ea5e9 100%)',
      },
      keyframes: {
        blob: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(40px,-30px) scale(1.1)' },
          '66%': { transform: 'translate(-30px,20px) scale(0.95)' },
        },
        spinSlow: { to: { transform: 'rotate(360deg)' } },
        blink: { '50%': { opacity: '0' } },
      },
      animation: {
        blob: 'blob 14s ease-in-out infinite',
        'spin-slow': 'spinSlow 18s linear infinite',
        blink: 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
};
