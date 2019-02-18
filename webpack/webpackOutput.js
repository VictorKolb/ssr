const webpack = require("webpack");
const readline = require("readline");
const chalk = require("chalk");
global.Intl = require("intl");
const format = require("webpack-format-messages");
const timeFormat = new Intl.DateTimeFormat("ru-RU", {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  year: "numeric",
  month: "numeric",
  day: "numeric",
});

function printError(str, arr, sec) {
  arr && (str += "\n\n" + arr.join(""));
  console.log(str);
  console.log(`\nIt took ${sec}s`);
}

const onComplete = stats => {
  const messages = format(stats);
  const sec = (stats.endTime - stats.startTime) / 1e3;

  if (messages.errors.length) {
    return printError(chalk.red("Failed to compile!"), messages.errors, sec);
  }

  if (messages.warnings.length) {
    return printError(
      chalk.yellow("Compiled with warnings."),
      messages.warnings,
      sec,
    );
  }

  console.log(chalk.green(`\n\nCompleted in ${sec}s!`));
  console.log(timeFormat.format(new Date()));
};

module.exports = function webpackOutput(compiler) {
  new webpack.ProgressPlugin((progress, message) => {
    readline.clearLine(process.stdout);
    readline.cursorTo(process.stdout, 0);
    const percents = Math.round(progress * 100) + "%";
    console.log(`⏳ Compiling ${percents}... ${message}`);
  }).apply(compiler);

  compiler.hooks.done.tap("done", onComplete);
  compiler.hooks.failed.tap("error", error => console.log(error));
};
