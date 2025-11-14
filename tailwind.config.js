/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FEF3E8',
          100: '#FDE6D1',
          200: '#FBC999',
          300: '#F9AD62',
          400: '#F7902A',
          500: '#F57E20', // Color principal
          600: '#C4651A',
          700: '#934C13',
          800: '#62320D',
          900: '#311906',
          DEFAULT: '#F57E20'
        },
        success: {
          DEFAULT: '#10B981',
          light: '#6EE7B7',
          dark: '#047857'
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FCD34D',
          dark: '#D97706'
        },
        error: {
          DEFAULT: '#EF4444',
          light: '#FCA5A5',
          dark: '#DC2626'
        },
        info: {
          DEFAULT: '#3B82F6',
          light: '#93C5FD',
          dark: '#1D4ED8'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
