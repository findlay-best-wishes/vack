const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const withTs = path.extname(require("../package.json")["main"]) === ".ts";
const {VueLoaderPlugin} = require('vue-loader/dist/index')

module.exports = {
  entry: path.resolve(__dirname, `../src/index.${withTs ? "t" : "j"}s`),
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
  module: {
      rules: [
        {
            test: withTs ? /\.(js | ts)$/ : /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'].concat( withTs ? '@babel/preset-typescript' : [])
              }
            }
        },
        {
            test: /\.vue$/i,
            use: [
                'vue-loader'
            ]
        },
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        },
        {
            test: /\.(jpg|jpeg|svg|gif|png)/i,
            type: "asset/resource",
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
        }
      ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new VueLoaderPlugin()
  ],
  optimization: {
      splitChunks: {
          chunks: "all",
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
      },
      runtimeChunk: "single",
      moduleIds: "deterministic",
  },
  resolve: {
      extensions: ['.vue', '.ts', '.js']
  }
};
