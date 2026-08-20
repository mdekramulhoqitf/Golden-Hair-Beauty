import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0b0a0d",
        charcoal: "#161219",
        "charcoal-light": "#1f1a23",
        plum: {
          DEFAULT: "#2a1327",
          dark: "#180b17",
          light: "#3d1c39",
        },
        gold: {
          50: "#faf6ea",
          100: "#f2e6c4",
          200: "#e7d29c",
          300: "#dabb72",
          400: "#cca554",
          500: "#bd9241",
          600: "#9c7534",
          700: "#7a5b2a",
        },
        cream: "#f7f1e5",
        "warm-white": "#fdfbf7",
      },
      fontFamily: {
        serif: ["var(--font-barlow)", "var(--font-hind-siliguri)", "system-ui", "sans-serif"],
        sans: ["var(--font-barlow)", "var(--font-hind-siliguri)", "system-ui", "sans-serif"],
        display: ["var(--font-barlow)", "var(--font-hind-siliguri)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.25em",
      },
      boxShadow: {
        gold: "0 0 0 1px rgba(189,146,65,0.35)",
        "gold-glow": "0 8px 40px -8px rgba(189,146,65,0.35)",
        premium: "0 20px 60px -15px rgba(0,0,0,0.45)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #e7d29c 0%, #bd9241 45%, #f2e6c4 100%)",
        "plum-gradient": "linear-gradient(160deg, #2a1327 0%, #180b17 60%, #0b0a0d 100%)",
        noise: "url('/images/noise.png')",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) forwards",
        shimmer: "shimmer 2.5s linear infinite",
        marquee: "marquee 32s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      maxWidth: {
        "8xl": "90rem",
      },
    },
  },
  plugins: [],
};
export default config;
