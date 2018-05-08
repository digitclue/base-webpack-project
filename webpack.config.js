const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rules = require('./config/rules');

module.exports = {
  mode: process.env.NODE_ENV || 'development',

  entry: {
    polyfills: './src/polyfills.js',
    main: [
      './src/main/main.js',
      './src/main/main.scss',
    ],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts/[name].[hash].js',
  },

  module: {
    rules: [
      rules.js,
      rules.css,
      rules.sass,
      rules.images,
      rules.fonts,
      rules.pug,
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: process.env.NODE_ENV !== 'production' ? 'styles/[name].css' : 'styles/[name].[chunkhash].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'main.html',
      template: 'src/main/main.pug',
      chunks: ['runtime', 'polyfills', 'main'],
    }),
  ],

  devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : 'source-map',

  optimization: {
    runtimeChunk: 'single',
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    index: 'main.html',
  },
};
