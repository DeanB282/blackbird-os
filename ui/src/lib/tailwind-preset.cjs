// ui/src/lib/tailwind-preset.cjs
/** Blackbird OS Tailwind design tokens (Phase A Tycoon) */
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e"
        }
      },
      fontFamily: {
        sans: ["Inter var", "system-ui", "sans-serif"]
      },
      borderRadius: {
        card: "12px"
      }
    }
  }
};
