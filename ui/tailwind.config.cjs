// ui/tailwind.config.cjs
const { join } = require("path");

/** @type {import("tailwindcss").Config} */
module.exports = {
  // Re-use the shared preset tokens from the UI library
  presets: [require("./src/lib/tailwind-preset.cjs")],

  content: [
    join(__dirname, "./src/**/*.{js,ts,jsx,tsx,mdx}"),
    join(__dirname, "./.storybook/**/*.{js,ts,jsx,tsx,mdx}"),
  ],

  theme: {
    extend: {},
  },
  plugins: [],
};

