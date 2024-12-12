import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

module.exports = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '..', './build'),
    filename: '[name].[contenthash].js',
    publicPath: '/communication/', // The ending slash is only to be used in production
    globalObject: 'self',
    clean: true,
    module: {
      rules: [
        {
          test: /\.(css|scss|sass)$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
      ],
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('Notifyone Dashboard'),
    }),
  ],
};
