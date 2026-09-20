import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#00111F",
          "navy-soft": "#071A2B",
          "red-orange": "#FF4B3E",
          "red-deep": "#B20E16",
          white: "#FFFFFF",
          "off-white": "#F7F8FA",
          graphite: "#26313B",
          muted: "#94A0AA",

          // Cohesive semantic aliases
          black: "#00111F",
          charcoal: "#071A2B",
          surface: "#0A2035",
          surfaceHover: "#0F2C49",
          border: "#172E47",
          borderSubtle: "#0E1F33",
          orange: {
            DEFAULT: "#FF4B3E",
            hover: "#B20E16",
            soft: "rgba(255, 75, 62, 0.1)",
            glow: "rgba(255, 75, 62, 0.22)",
          },
        },
        slate: {
          950: "#00111F",
          900: "#071A2B",
          850: "#0C2339",
          800: "#142E49",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
