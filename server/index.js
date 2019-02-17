require("@babel/register")({
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "dynamic-import-node",
    "@babel/plugin-proposal-class-properties",
  ],
});
require("./app");
