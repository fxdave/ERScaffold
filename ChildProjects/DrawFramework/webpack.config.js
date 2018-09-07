const path = require("path");

module.exports = {
    entry: require.resolve("./App/main.ts"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.js"
    },
    devtool: "source-map",
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        minimize: true
                    }
                },
                'sass-loader?sourceMap'
            ]
        }, {
            test: /\.(t|j)sx?$/,
            loader: ['awesome-typescript-loader?module=es6'],
            exclude: [/node_modules/]
        }, {
            test: /\.js$/,
            loader: 'source-map-loader',
            enforce: 'pre'
        }]
    },
    resolve: { extensions: ['.ts', '.tsx', '.js', '.jsx'] },
    mode: "development",
    externals: {
        "createjs": "createjs"
    },
};