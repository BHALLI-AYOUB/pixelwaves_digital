/** Tailwind supplies the reset and a few layout utilities; the LYT design system itself lives in src/styles/main.css. */
module.exports = {
  content: ["./src/site/**/*.{js,jsx,mjs}", "./src/client/**/*.js"],
  theme: {
    extend: {
      colors: {
        ink: { 950: "#07060b", 900: "#0c0a13", 800: "#1a1627" },
        purple: { 300: "#c4b5fd", 400: "#a78bfa", 500: "#7c3aed", 600: "#6d28d9", 700: "#5b21b6" },
        paper: { DEFAULT: "#f7f6fb", 2: "#eeebf5" },
      },
      fontFamily: {
        display: ["Bricolage Grotesque", "Geist", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Geist", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["Geist Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};
