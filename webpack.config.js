var path = require('path')
var webpack = require('webpack')
module.exports = {
    mode: 'development',
    entry: ['@babel/polyfill', './src/main.js'],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    'css-loader', // translates CSS into CommonJS
                    'sass-loader' // compiles Sass to CSS, using Node Sass by default
                ]
            },
            {
                test: /\.html$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    context: ''
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
}