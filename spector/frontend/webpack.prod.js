const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",

    // path: path.resolve(__dirname, "dist"), // absolute path to dist
    // filename: "[name].[contentHash].bundle.js", //hash used to cache bust
    // clean: true, //Removes old hashed files
  },
  optimization: {
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, //2. Extracts imported CSS into a single CSS file
          "css-loader", // 1. Enables importing CSS files by turning it into JavaScript
        ],
      },
    ],
  },
  // plugins: [new MiniCssExtractPlugin({ filename: "[name].[contentHash].css" })],
  plugins: [new MiniCssExtractPlugin()],
});
