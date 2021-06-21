const webpack = require("webpack");
const {merge} = require("webpack-merge");
const path = require("path");

module.exports = merge(require("./webpack.common.js"), {
    mode: "development",
    devtool: "eval-cheap-module-source-map",
    devServer: {
        contentBase: path.resolve(__dirname, "../dist"),
        port: 3000,
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin({}),
    ],
})
