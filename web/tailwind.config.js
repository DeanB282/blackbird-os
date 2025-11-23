// web/tailwind.config.js
const { join } = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Next app routes & components
    join(__dirname, "./app/**/*.{js,ts,jsx,tsx,mdx}"),
    join(__dirname, "./components/**/*.{js,ts,jsx,tsx,mdx}"),

    // Any shared UI components we import from libs/ui
    join(__dirname, "../libs/ui/src/**/*.{js,ts,jsx,tsx,mdx}"),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
