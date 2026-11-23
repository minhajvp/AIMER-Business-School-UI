import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/contents/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        aimer: {
          50: "#F2F9F9",
          100: "#E2F3F3",
          200: "#C3E6E6",
          300: "#96D3D5",
          400: "#5DB7BC",
          500: "#168C9B", // Official AIMER Teal
          600: "#0F7684",
          700: "#086C78", // Deep Teal
          800: "#09535D",
          900: "#0B454D",
          950: "#052B31",
        },
        charcoal: {
          50: "#F6F7F7",
          100: "#EDEFF0",
          200: "#D8DCDE",
          300: "#B8C0C4",
          400: "#8D9A9F",
          500: "#69767B",
          600: "#4F595E",
          700: "#3E464A",
          800: "#272C2F",
          900: "#171B1D", // Dark Charcoal
          950: "#0D0F10",
        },
        aqua: {
          subtle: "#EAF7F6",
          tint: "#F4FAFA",
          surface: "#F9FCFC",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "system-ui", "-apple-system", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        normal: "0em",
        wide: "0.02em",
        wider: "0.05em",
        widest: "0.1em",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.02)",
        card: "0 4px 20px -2px rgba(22, 140, 155, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.04)",
        float: "0 20px 40px -15px rgba(8, 108, 120, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
