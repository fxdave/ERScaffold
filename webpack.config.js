const path = require('path')
module.exports = {
    devtool: 'eval-source-map',
    mode: process.env.MODE ? process.env.MODE : "production",
    entry: __dirname + "/src/renderer/index.js",
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.s?css$/,
                exclude: /node_modules/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 3000
    }
}