/* eslint-disable import/no-extraneous-dependencies */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  js: {
    test: /\.js$/,
    use: 'babel-loader',
  },
  css: {
    test: /\.css$/,
    use: [
      process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        },
      },
    ],
  },
  sass: {
    test: /\.(sass|scss)$/,
    use: [
      process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'resolve-url-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      },
    ],
  },
  images: {
    test: /\.(png|svg|jpg|gif)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          name: 'assets/images/[name].[ext]?[hash]',
          limit: 8192,
        },
      },
    ],
  },
  fonts: {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          name: 'assets/fonts/[name].[ext]?[hash]',
          limit: 8192,
        },
      },
    ],
  },
  pug: {
    test: /\.(pug|jade)$/,
    use: {
      loader: 'pug-loader',
      query: {
        pretty: true,
      },
    },
  },
};
