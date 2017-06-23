let helpers = require('./helpers');

module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: helpers.root('dist'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        rules: [{
                test: /\.jsx?$/,
                exclude: /(node_modules | bower_components)/,
                use: [{
                    loader: 'babel-loader'
                }],
            },
            {
                test: /\.s?css/,
                exclude: /(node_modules | bower_components)/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './dist'
    }
};