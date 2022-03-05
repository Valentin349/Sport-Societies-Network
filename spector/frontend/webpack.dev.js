const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",

    //path: path.resolve(__dirname, "dist"),
    //filename: "[name].bundle.js",
  },
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "static/frontend"),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /\.module\.css$/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // template: "./src/template.html",
      inject: "body",
    }),
  ],
});

//TODO - CSS Modules
