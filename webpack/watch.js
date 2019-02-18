const createCompiler = require("./createCompiler");
const config = require("./webpack.config.js");

const compiler = createCompiler(config);

let type = "watch";

process.argv.map(val => {
  if (val.includes("--type")) {
    type = val.replace("--type", "");
  }
});

console.log("Start dev mode \n");
compiler.watch(
  {
    // Example watchOptions
    aggregateTimeout: 300,
    poll: undefined,
  },
  (err, stats) => {
    // Print watch/build result here...
    // console.log(stats);
  },
);
