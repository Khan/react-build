var path = require("path");

var webpack = require("webpack");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
    entry: {
        "react-with-addons": "./react-with-addons.js",
        "react-art": "./react-art.js"
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: "[name].js",
        jsonpFunction: "reactWebpackJsonp"
    },
    plugins: [
        new CommonsChunkPlugin("commons.js"),
        new webpack.DefinePlugin({
          'process.env': {NODE_ENV: JSON.stringify('production')}
        })
    ]
};
