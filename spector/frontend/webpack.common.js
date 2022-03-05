const path = require("path");

module.exports = {
  entry: "./src/index.js",
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components"),
      css: path.resolve(__dirname, "src/css"),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
