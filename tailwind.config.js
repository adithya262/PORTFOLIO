/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-base': '#0A0B13',
        'dark-accent': '#121629',
        'neon-blue': 'rgba(52, 176, 217, 0.85)',
        'neon-blue-accent': 'rgba(0, 140, 255, 0.85)',
        'neon-cyan': 'rgba(0, 229, 255, 0.85)',
        'neon-turquoise': 'rgba(0, 217, 255, 0.85)',
        'neon-pink': 'rgba(224, 61, 204, 0.85)',
        'neon-purple': 'rgba(123, 36, 197, 0.85)',
        'hero-center-glow': 'rgba(0, 68, 68, 0.4)',
        'dark-deep': '#010508',
        'light': '#D0D0D0',
        'gray-200': '#A0A0A0',
        'btn-dark': '#091522',
        'btn-hover': '#14263B',
        'bg-primary-dark': '#04080D',
        'gradient-teal-start': '#08171A',
        'gradient-teal-end': '#051011',
        'dark-accent-border': '#1A242F',
        'dark-overlay': 'rgba(0, 0, 0, 0.4)',
      },
      fontFamily: {
        sora: ["Sora", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        lexend: ["Lexend", "sans-serif"],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'circuit-pattern': `url('/src/assets/circuit-pattern.svg')`,
      },
      backgroundSize: {
        '200%': '200%',
        '300%': '300%',
        'cover-auto': 'cover auto',
      },
      backgroundPosition: {
        'center-top': 'center top',
      },
      boxShadow: {
        'neon-glow-sm': '0 0 5px rgba(0, 229, 255, 0.3), 0 0 10px rgba(0, 229, 255, 0.2)',
        'neon-glow-md': '0 0 15px rgba(0, 229, 255, 0.4), 0 0 25px rgba(0, 229, 255, 0.3)',
        'neon-glow-lg': '0 0 25px rgba(0, 229, 255, 0.5), 0 0 40px rgba(0, 229, 255, 0.4)',
        'neon-glow-xl': '0 0 35px rgba(0, 229, 255, 0.6), 0 0 60px rgba(0, 229, 255, 0.5)',
        'neon-glow-2xl': '0 0 50px rgba(0, 229, 255, 0.7), 0 0 80px rgba(0, 229, 255, 0.6)',
        'inset-glow': 'inset 0 0 10px rgba(0, 229, 255, 0.15)',
      },
      textShadow: {
        'default': '0 0 5px rgba(0, 229, 255, 0.7)',
        'glow': '0 0 8px rgba(0, 229, 255, 0.8), 0 0 15px rgba(0, 229, 255, 0.6)',
      },
      keyframes: {
        'pulse-light': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 229, 255, 0.4), 0 0 10px rgba(0, 229, 255, 0.4), 0 0 15px rgba(0, 229, 255, 0.4)' },
          '50%': { boxShadow: '0 0 10px rgba(0, 229, 255, 0.7), 0 0 20px rgba(0, 229, 255, 0.7), 0 0 30px rgba(0, 229, 255, 0.7)' },
        },
        'border-pulse': {
          '0%, 100%': { borderColor: 'rgba(0, 229, 255, 0.3)' },
          '50%': { borderColor: 'rgba(0, 229, 255, 0.8)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'subtle-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.005)', opacity: '0.95' },
        },
        'marquee-slow': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'pulse-light': 'pulse-light 2s ease-in-out infinite',
        'border-pulse': 'border-pulse 2s ease-in-out infinite',
        'shimmer': 'shimmer 4s infinite linear',
        'subtle-pulse': 'subtle-pulse 3s ease-in-out infinite',
        'marquee-slow': 'marquee-slow 20s linear infinite',
      },
    },
  },
  plugins: [function ({ addUtilities }) {
    const newUtilities = {
      '.text-shadow-glow': {
        textShadow: '0 0 8px rgba(0, 229, 255, 0.8), 0 0 15px rgba(0, 229, 255, 0.6)',
      },
    }
    addUtilities(newUtilities)
  }],
}