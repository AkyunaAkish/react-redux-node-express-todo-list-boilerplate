const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const helpers = require('../helpers');
const dev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: [
        './client/index.js'
    ],
    module: {
        rules: [{
                test: /\.jsx?$/,
                use: [{
                    loader: 'babel-loader'
                }],
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?.*$|$)/,
                loader: `file-loader?name=assets/[name]${dev ? '' : '.[hash]'}.[ext]`
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
    ],
    resolve: {
        extensions: ['.js', '.json']
    }
};