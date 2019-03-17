const path = require("path");

/*
 * @sucrase is like a better @babel
 * this will allow you to write ecmascript with experimental features like 'class variable'
 */
const loaders = {
  rules: [
    {
      test: /\.js$/,
      use: {
        loader: "@sucrase/webpack-loader",
        options: {
          transforms: ["jsx"]
        }
      }
    },
    {
      test: /\.s?css$/,
      use: [
        {
          loader: "style-loader"
        },
        {
          loader: "css-loader"
        },
        {
          loader: "sass-loader",
          options: {
            includePaths: ["node_modules/@syncfusion"]
          }
        }
      ]
    }
  ]
};

module.exports = {
  mode: process.env.NODE_ENV || 'production' ,
  target: 'web', // default
  entry: {
    renderer: './src/renderer/renderer.js',
  },
  // this will emit /src/renderer.built.js
  output: {
    path: path.resolve(__dirname, 'src/build'),
    filename: '[name].built.js'
  },
  module: loaders
}