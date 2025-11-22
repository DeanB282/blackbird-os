const { join } = require('path');
const preset = require('../libs/ui/src/lib/tailwind-preset');

module.exports = {
  presets: [preset],
  content: [
    join(__dirname, 'app/**/*.{js,ts,jsx,tsx,mdx}'),
    join(__dirname, '../libs/ui/src/**/*.{js,ts,jsx,tsx,mdx}'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};



