import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#FF6A00",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
