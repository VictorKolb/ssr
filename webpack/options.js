const path = require("path");

const browserList = [
  "last 2 Chrome versions",
  "not Chrome < 60",
  "last 2 Safari versions",
  "not Safari < 10.1",
  "last 2 iOS versions",
  "not iOS < 10.3",
  "last 2 Firefox versions",
  "not Firefox < 54",
  "last 2 Edge versions",
  "not Edge < 15",
];

const fileLoaderOptions = {
  loader: "file-loader",
  options: {
    name: "[name]_[hash:8].[ext]",
    outputPath: "../assets/",
    publicPath: "/static/assets/",
  },
};

const publicPath = path.resolve(`${__dirname}/../public`);

const isProdMode = process.env.NODE_ENV === "production";

module.exports = {
  browserList,
  fileLoaderOptions,
  publicPath,
  isProdMode
};
