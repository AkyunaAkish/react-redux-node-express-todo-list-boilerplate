const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const WebpackNotifierPlugin = require('webpack-notifier');
const commonConfig = require('./webpack.common.js');
const helpers = require('../helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
    devtool: 'eval-source-map',
    output: {
        path: helpers.root('dist'),
        filename: 'bundle.js'
    },
    rules: [{
        test: /\.s?css/,
        use: [{
                loader: 'style-loader'
            },
            {
                loader: 'css-loader'
            },
            {
                loader: 'sass-loader'
            }
        ]
    }],
    plugins: [
        new WebpackNotifierPlugin({
            alwaysNotify: true
        }),
        new HtmlWebpackPlugin({
            template: './client/index.html'
        }),
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: './dist',
        proxy: {
            '*': {
                target: 'http://localhost:3000',
                secure: false
            }
        }
    }
});