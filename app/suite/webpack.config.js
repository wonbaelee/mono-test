const { resolve } = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const rootResolve = (...paths) => resolve(__dirname, ...paths);

const isDev = process.env.NODE_ENV !== 'production';

process.env.NODE_ENV = isDev ? 'development' : 'production';
process.env.BABEL_ENV = isDev ? 'development' : 'production';

module.exports = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'cheap-module-source-map' : false,
  entry: rootResolve('src', 'index.tsx'),
  output: {
    path: rootResolve('build'),
    filename: isDev ? '[name].bundle.js' : '[name].[contenthash:8].js',
    chunkFilename: isDev ? '[name].bundle.chunk.js' : '[name].[contenthash:8].chunk.js',
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
          plugins: ['macros', isDev && 'react-refresh/babel'].filter(Boolean),
        },
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  devServer: {
    hot: true,
  },
  optimization: {
    minimize: !isDev,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
  performance: isDev
    ? false
    : {
        // 500KB
        maxAssetSize: 1000 * 500,
        maxEntrypointSize: 1000 * 500,
      },
  plugins: [
    new HTMLWebpackPlugin({
      template: rootResolve('public', 'index.html'),
      inject: 'body',
    }),
    isDev && new ReactRefreshWebpackPlugin({}),
    !isDev && new MiniCssExtractPlugin(),
  ].filter(Boolean),
};
