const merge = require('webpack-merge');
const common = require('./webpack.base.js');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

function getFileRelativePath(dir) {
    return path.join(__dirname, '..', dir);
}
/*
查看整个bundle的大小
*/
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin;
module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: '../dist',
        hot: true,
        overlay: true,
      proxy: {
        '/api': 'http://localhost:3001'
      }
    },
    module: {
        rules: [
            // {R
            //   test: /\.js$/,
            //   exclude: /node_modules/,
            //   loader: 'eslint-loader'
            // },
            {
                test: /\.s?[ac]ss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            }
        ]
    },
    performance: {
        hints: 'warning'
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html'
                // favicon: 'favicon.ico'
        })
        // new BundleAnalyzerPlugin()
    ]
});