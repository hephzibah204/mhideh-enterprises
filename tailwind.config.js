/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FDFBF7",
          100: "#FAF5EB",
          200: "#F3E9D2",
          300: "#E8D7B4",
        },
        gold: {
          300: "#E5C158",
          400: "#D4AF37",
          500: "#C59B27",
          600: "#A67C1E",
          700: "#856015",
        },
        burgundy: {
          500: "#80182A",
          600: "#6B1323",
          700: "#540E1B",
          800: "#3E0A14",
          900: "#29060D",
        },
        charcoal: {
          800: "#1F1D1B",
          900: "#141311",
          950: "#0C0B0A",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 20px 45px -15px rgba(20, 19, 17, 0.08)",
        "gold-glow": "0 10px 30px -5px rgba(212, 175, 55, 0.25)",
      },
    },
  },
  plugins: [],
};
