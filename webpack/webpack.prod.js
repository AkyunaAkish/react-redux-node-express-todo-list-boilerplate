const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const helpers = require('../helpers');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlPluginRemove = require('html-webpack-plugin-remove');

module.exports = webpackMerge(commonConfig, {
    output: {
        path: helpers.root('dist'),
        filename: '[name].[chunkhash].js',
        publicPath: '/'
    },
    module: {
        rules: [{
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            }),
            test: /\.(css|scss)$/
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: helpers.root(),
            verbose: true,
            watch: true
        }),
        new HtmlWebpackPlugin({
            template: './client/index.html',
            minify: {
                collapseWhitespace: true,
                preserveLineBreaks: false,
                html5: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeTagWhitespace: true
            }
        }),
        new HtmlPluginRemove(/<script.*?src="\/bundle.js".*?<\/script>/),
        new ExtractTextPlugin('[name].[chunkhash].css'),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                }
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            mangle: false,
            compressor: {
                drop_console: true,
                warnings: false
            }
        }),
        new CopyWebpackPlugin([{
            from: helpers.root('client/humans.txt'),
            to: helpers.root('dist')
        }]),
        new CopyWebpackPlugin([{
            from: helpers.root('client/robots.txt'),
            to: helpers.root('dist')
        }])
    ]
});