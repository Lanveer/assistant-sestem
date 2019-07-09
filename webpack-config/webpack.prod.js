const merge = require('webpack-merge');
const common = require('./webpack.base.js');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');

const ZipPlugin = require('zip-webpack-plugin');

let AppEnv = process.env.APP_ENV || process.env.AppEnv;

const ENV_SUFFIX_DIC = {
  dev: '-dev',
  demo: '-demo',
  prod: '',
  demo1: '-demo1'
};

let devMode = ENV_SUFFIX_DIC[AppEnv];

let FILE_PATH = 'rc-frontend';

if (devMode === '-dev') {
  FILE_PATH = 'rc-frontend-dev';
  devMode = '-demo';
}

module.exports = merge(common, {
  output: {
    // publicPath: `//s${devMode}.hello.com/static/${FILE_PATH}/`
  },
  entry: {
    vendor: ['react', 'react-dom']
  },
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  performance: {
    hints: false
  },
  mode: 'production',
  devtool: 'hidden-source-map',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js($|\?)/i,
        exclude: /\/node_modules/,
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps,
        extractComments: true,
        warningsFilter: src => true
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    minimize: true,
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      name: false,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist', 'build'], {
      root: process.cwd(),
      verbose: true,
      dry: false
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      favicon: 'favicon.ico',
      chunks: ['app', 'vendor', 'manifest'],
      chunksSortMode: function(chunk1, chunk2) {
        return chunk1.id - chunk2.id;
      },
      minify: {
        collapseWhitespace: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css'
    }),
    // new webpack.HashedMouleIdsPlugin(),
    new ZipPlugin({
      path: path.join(__dirname, '..', 'build'),
      filename: 'risk-app.zip'
    })
  ]
});
