const webpack = require("webpack");
const webpackOutput = require("./webpackOutput.js");
const config = require("./webpack.config.js");

module.exports = function createCompiler() {
  const compiler = webpack(config);
  webpackOutput(compiler);
  return compiler;
};
