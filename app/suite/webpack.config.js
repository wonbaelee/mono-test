const { resolve } = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const rootResolve = (...paths) => resolve(__dirname, ...paths);

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: rootResolve('build'),
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: '3.23',
              },
            ],
            [
              '@babel/preset-react',
              {
                runtime: 'automatic',
              },
            ],
            '@babel/preset-typescript',
          ],
        },
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: rootResolve('public', 'index.html'),
    }),
  ],
};
