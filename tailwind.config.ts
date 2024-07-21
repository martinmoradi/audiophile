import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    fontSize: {
      xs: [
        "1.3rem",
        { lineHeight: "2.5rem", letterSpacing: "0.1rem", fontWeight: "700" },
      ],
      sm: [
        "1.4rem",
        { lineHeight: "1.9rem", letterSpacing: "1rem", fontWeight: "400" },
      ],
      base: ["1.5rem", { lineHeight: "2.5rem", fontWeight: "500" }],
      lg: [
        "1.8rem",
        { lineHeight: "2.4rem", letterSpacing: "0.13rem", fontWeight: "700" },
      ],
      xl: [
        "2.4rem",
        { lineHeight: "3.3rem", letterSpacing: "0.17rem", fontWeight: "700" },
      ],
      "2xl": [
        "2.8rem",
        { lineHeight: "3.8rem", letterSpacing: "0.2rem", fontWeight: "700" },
      ],
      "3xl": [
        "3.2rem",
        { lineHeight: "3.6rem", letterSpacing: "0.115rem", fontWeight: "700" },
      ],
      "4xl": [
        "4rem",
        { lineHeight: "4.4rem", letterSpacing: "0.15rem", fontWeight: "700" },
      ],
      "5xl": [
        "5.6rem",
        { lineHeight: "5.8rem", letterSpacing: "0.2rem", fontWeight: "700" },
      ],
      "mobile-xl": [
        "3.6rem",
        { lineHeight: "4rem", letterSpacing: "0.129rem", fontWeight: "700" },
      ],
    },
    colors: {
      primary: "hsl(22, 65%, 57%)",
      dark: "hsl(0, 0%, 6%)",
      light: "hsl(0, 0%, 95%)",
      lighter: "hsl(0, 0%, 98%)",
      secondary: "hsl(21, 94%, 75%)",
      white: "hsl(0, 0%, 100%)",
      black: "hsl(0, 0%, 0%)",
      transparent: "transparent",
      "border-color": "hsl(0, 0%, 20%)",
      red: "hsl(0, 65%, 49%)",
    },
    fontFamily: {
      sans: ["var(--font-sans)", ...fontFamily.sans],
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
