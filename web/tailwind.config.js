// web/tailwind.config.js
const { join } = require("path");
const uiPreset = require("@blackbird-os/ui/tailwind-preset");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Share design tokens from the UI library
  presets: [uiPreset],

  content: [
    // Next app routes & components
    join(__dirname, "./app/**/*.{js,ts,jsx,tsx,mdx}"),
    join(__dirname, "./components/**/*.{js,ts,jsx,tsx,mdx}"),

    // Shared UI components from the actual `ui` workspace (not libs/ui)
    join(__dirname, "../ui/src/**/*.{js,ts,jsx,tsx,mdx}"),
  ],

  theme: {
    extend: {},
  },

  plugins: [],
};

