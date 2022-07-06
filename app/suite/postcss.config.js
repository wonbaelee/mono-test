const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  plugins: [require('tailwindcss'), require('autoprefixer'), !isDev && require('cssnano')].filter(Boolean),
};
