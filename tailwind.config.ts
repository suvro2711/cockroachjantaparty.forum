import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Bengal-inspired palette: red-bordered sari white, terracotta, alta red, gold
        bone: "#f6efe4",
        alta: "#b22222",
        sindoor: "#d72631",
        terracotta: "#c1502e",
        gold: "#d4a017",
        ink: "#1b1814",
        moss: "#3c5a3b",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        bengali: ["var(--font-bengali)", "serif"],
      },
      backgroundImage: {
        "alpana":
          "radial-gradient(circle at 20% 10%, rgba(215,38,49,0.08), transparent 40%), radial-gradient(circle at 80% 70%, rgba(212,160,23,0.08), transparent 45%)",
      },
    },
  },
  plugins: [],
};

export default config;
