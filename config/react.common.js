const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const withTs = path.extname(require("../package.json")["main"]) === ".tsx"

module.exports = {
  entry: path.resolve(__dirname, `../src/index.${withTs ? "t" : "j"}sx`),
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
  module: {
      rules: [
        {
            test: withTs ? /\.(js|jsx|ts|tsx)$/ : /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'].concat(withTs ? '@babel/preset-typescript' : [])
              }
            }
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
    })
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
    extensions: ['.tsx', '.ts', '.jsx', '.js']
  }
};
