import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#0A0A0A",
        foreground: "#FFFFFF",
        primary: {
          DEFAULT: "#3B82F6",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F97316",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#8B5CF6",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#1A1A1A",
          foreground: "#A1A1AA",
        },
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        heading: ["Montserrat", "sans-serif"],
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=80')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-wave': 'linear-gradient(90deg, #1E3A8A 0%, #3B82F6 50%, #1E3A8A 100%)',
        'gradient-premium': 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'wave': 'wave 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        wave: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;