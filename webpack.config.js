const path = require('path')
module.exports = {
    devtool: 'eval-source-map',
    mode: process.env.MODE ? process.env.MODE : "production",
    entry: __dirname + "/src/renderer/index.js",
    target: "electron-renderer",
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
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader",
                    options: {
                        includePaths: ["./node_modules","./node_modules/@syncfusion"]
                    }
                }]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 3000
    }
}