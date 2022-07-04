const { resolve } = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const root = __dirname;

const rootResolve = (...paths) => resolve(root, ...paths);

/** @type {import("webpack").Configuration} */
module.exports = {
  mode: 'development',
  entry: rootResolve('src', 'index.ts'),
  output: {
    path: 'build',
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['ts', 'tsx', 'js', 'jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'babel-loader',
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
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    port: 8080,
  },
};
