const env = process.env.NODE_ENV;
const helpers = require('./helpers');
const webpack = require('webpack');

module.exports = {
    entry: [
        './client/index.js'
    ],
    output: {
        path: helpers.root('dist'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        rules: [{
                test: /\.jsx?$/,
                use: [{
                    loader: 'babel-loader'
                }],
            },
            {
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
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?.*$|$)/,
                loader: `file-loader?name=assets/[name]${env === 'development' ? '' : '.[hash]'}.[ext]`
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(env)
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
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
};