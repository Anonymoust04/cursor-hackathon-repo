import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0052FF",
          content: "#FFFFFF",
          dark: "#003ECC",
          light: "#E5EFFF",
        },
        secondary: {
          DEFAULT: "#F0F5FF",
          dark: "#E5EFFF",
        },
        background: {
          DEFAULT: "#FFFFFF",
          dark: "#0F172A",
          light: "#F8FAFC",
        },
        foreground: {
          DEFAULT: "#0F172A",
          dark: "#F8FAFC",
        },
        border: {
          DEFAULT: "#E2E8F0",
          dark: "#1E293B",
        },
        muted: {
          DEFAULT: "#64748B",
          dark: "#94A3B8",
        },
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};

export default config;

