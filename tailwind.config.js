/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Surface system
        surface: {
          DEFAULT: "var(--bg-surface)",
          hover: "var(--bg-surface-hover)",
        },
        // Semantic data colors
        positive: "var(--positive)",
        "positive-soft": "var(--positive-soft)",
        negative: "var(--negative)",
        "negative-soft": "var(--negative-soft)",
        // Neutrals
        ink: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
        },
      },

      fontFamily: {
        mono: ['"DM Mono"', '"Courier New"', 'monospace'],
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        ui: ['Inter', 'system-ui', 'sans-serif'],
      },

      spacing: {
        '4.5': '1.125rem',
        '13': '3.25rem',
        '15': '3.75rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '100': '25rem',
      },

      borderRadius: {
        'card': '12px',
        'card-lg': '16px',
        'pill': '9999px',
      },

      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
        'card-dark': '0 1px 4px rgba(0,0,0,0.3)',
        'card-dark-hover': '0 6px 20px rgba(0,0,0,0.4)',
        'header': '0 1px 0 var(--border-subtle)',
      },

      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-bottom': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-out-bottom': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
      },

      animation: {
        'shimmer': 'shimmer 1.8s ease-in-out infinite',
        'fade-up': 'fade-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.3s ease forwards',
        'slide-in-bottom': 'slide-in-bottom 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-out-bottom': 'slide-out-bottom 0.3s ease forwards',
      },

      screens: {
        'xs': '480px',
        'xsm': '480px',
        '2md': '880px',
      },
    },
  },
  plugins: [],
};
