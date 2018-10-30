const path = require("path");
const webpack = require("webpack");
module.exports = {
  target: "node",
  entry: "./app/app.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".js", ".json", ".node"]
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: "ts-loader" },
      { test: /\.node$/, loader: "node-loader" }
    ]
  },
  plugins: [new webpack.IgnorePlugin(/^electron$/)]
};
