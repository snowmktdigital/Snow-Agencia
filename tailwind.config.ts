import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        snow: {
          bg: "#09001F",
          surface: "#120030",
          deep: "#1B0045",
          purple: "#7B3FF2",
          lilac: "#B88CFF",
          white: "#FFFFFF",
          muted: "#CFC3FF",
          border: "rgba(184, 140, 255, 0.25)"
        }
      },
      boxShadow: {
        glow: "0 0 36px rgba(184, 140, 255, 0.34)",
        soft: "0 18px 60px rgba(14, 0, 43, 0.45)"
      },
      backgroundImage: {
        "snow-gradient": "linear-gradient(135deg, #7B3FF2 0%, #B88CFF 100%)",
        "panel-gradient":
          "linear-gradient(145deg, rgba(255,255,255,0.11), rgba(184,140,255,0.05))"
      }
    }
  },
  plugins: []
};

export default config;
