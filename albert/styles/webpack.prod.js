const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    core: './src/static/core.js',
    components: './src/static/components.js',
    'third-components': './src/static/third-components.js',
    pages: './src/static/pages.js',
    all: './src/static/all.js',
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new HtmlWebpackPlugin({
      template: 'src/app/index.html'
    }),
    new CopyPlugin([
      {
        from: 'src/styles',
        to: 'scss',
      },
      { from: 'package.json' },
    ]),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano')
    })
  ],
  module: {
    rules: [
      {
        test: /.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/fonts/[name].[ext]',
            },
          },
        ],
      },
    ]
  },
};
