/* eslint-env node */

/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const webpack = require("webpack"); // does this have a purpose? or can it just get deleted?
const packageData = require("./package.json");
/* eslint-enable @typescript-eslint/no-var-requires */

module.exports = {
  entry: {
    // Point "entry" to scripts you want to be CLI-eligible.
    "main-script-name": "./src/main.ts",
  },
  mode: "development",
  devtool: false,
  output: {
    path: path.resolve(__dirname, "KoLmafia", "scripts", packageData.name),
    filename: "[name].js",
    libraryTarget: "commonjs",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        // exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [],
  externals: {
    // Add any ASH scripts you would like to use here.
    kolmafia: "commonjs kolmafia",
  },
};
