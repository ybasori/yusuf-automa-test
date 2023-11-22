/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    static: "./public",
  },
  output: {
    clean: true,
    publicPath: "/js",
  },
});
