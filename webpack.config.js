const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',

  entry: {
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
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
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
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[name].[ext]?[hash]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/fonts/[name].[ext]?[hash]',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: process.env.NODE_ENV !== 'production' ? 'styles/[name].css' : 'styles/[name].[hash].css',
      chunkFilename: process.env.NODE_ENV !== 'production' ? 'styles/[id].css' : 'styles/[id].[hash].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/main/index.html',
      chunks: ['runtime', 'main'],
    }),
  ],

  devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : 'source-map',

  optimization: {
    runtimeChunk: 'single',
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },
};
