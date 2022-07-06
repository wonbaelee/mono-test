/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  experimental: {
    // https://github.com/tailwindlabs/tailwindcss/discussions/7317#discussioncomment-2107898
    optimizeUniversalDefaults: true,
  },
};
