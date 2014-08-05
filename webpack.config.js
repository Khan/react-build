var assert = require("assert");
var fs = require("fs");
var path = require("path");

var webpack = require("webpack");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

function regexpEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

assert.ok(process.env.NODE_ENV, "Need to set NODE_ENV when bundling");

// We'll replace the default warning.js with one of our own...
var warningPath = path.join(__dirname, "node_modules/react/lib/warning.js");
var newWarningPath = path.join(__dirname, "warning-alert.js");
assert.ok(fs.existsSync(warningPath), "Where'd warning go?");

var outputFilename;

if (process.env.NODE_ENV === "production") {
    outputFilename = "[name].prod.js";
} else if (process.env.NODE_ENV === "development") {
    outputFilename = "[name].dev.js";
} else {
    assert.ok(false, "Unrecognized NODE_ENV: " + process.env.NODE_ENV);
}

var plugins = [
    new webpack.NormalModuleReplacementPlugin(
        new RegExp("^" + regexpEscape(warningPath) + "$"),
        newWarningPath
    ),
    new CommonsChunkPlugin("react", outputFilename.replace("[name]", "react")),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV)}
    }),
    new webpack.optimize.OccurenceOrderPlugin(true),
];

if (process.env.NODE_ENV === "production") {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
    );
}

module.exports = {
    entry: {
        "react": "./react-with-addons.js",
        "react-art": "./react-art.js"
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: outputFilename,
        jsonpFunction: "reactWebpackJsonp"
    },
    plugins: plugins
};
