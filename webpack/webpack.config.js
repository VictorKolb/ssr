const path = require("path");
const webpack = require("webpack");
const ReactLoadablePlugin = require("react-loadable/webpack")
  .ReactLoadablePlugin;
const ManifestPlugin = require("webpack-manifest-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const WebpackNotifierPlugin = require("webpack-notifier");
const {
  browserList,
  fileLoaderOptions,
  publicPath,
  isProdMode,
} = require("./options");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const merge = require("webpack-merge");

const srcPath = path.resolve(`${__dirname}/../src`);
// const isProdMode = settings.STAGE !== "dev";

const common = {
  entry: {
    client: "./index.js",
  },

  context: srcPath,

  output: {
    path: publicPath,
    publicPath: "../",
    chunkFilename: isProdMode ? "[name].[hash].js" : "[name].js",
    filename: isProdMode ? "[name].[hash].js" : "[name].js",
  },

  resolve: {
    modules: [path.resolve(srcPath), "node_modules"],
    extensions: [".js", ".jsx"],
  },

  plugins: [
    // new BundleAnalyzerPlugin({ openAnalyzer: false }),
    new CleanWebpackPlugin(["public", "build"], {
      root: path.resolve(`${__dirname}/..`),
      verbose: true,
    }),

    new ReactLoadablePlugin({
      filename: publicPath + "/react-loadable.json",
    }),

    new ManifestPlugin({ basePath: "", publicPath: "" }),
    new BundleAnalyzerPlugin({ openAnalyzer: false }),

    new webpack.DefinePlugin({
      // RAVEN_SENTRY_DSN: JSON.stringify(settings.RAVEN_SENTRY_DSN),
      // RAVEN_CONFIG: JSON.stringify(settings.RAVEN_CONFIG),
      // CSRF_COOKIE_NAME: JSON.stringify(settings.CSRF_COOKIE_NAME),

      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development",
      ),
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-flow",
            [
              "@babel/preset-env",
              {
                modules: false,
                useBuiltIns: false,
                targets: {
                  browsers: browserList,
                },
              },
            ],
            "@babel/react",
          ],
        },
      },
      {
        test: /\.svg$/,
        use: [
          fileLoaderOptions,
          {
            loader: "svgo-loader",
            options: {
              plugins: [{ removeTitle: true }],
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [fileLoaderOptions],
      },
      {
        test: /\.(png|jpg|jpeg|gif|mp4|webm|webp)$/,
        use: [fileLoaderOptions],
      },
    ],
  },

  optimization: {
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        default: false,
        vendor: {
          // name of the chunk
          name: "vendor",
          chunks: "initial",
          // import file path containing node_modules
          test: /node_modules/,
          // priority
          priority: 20,
        },
      },
    },
  },
};

const development = {
  mode: "development",
  devtool: "source-map",
  plugins: [
    new WebpackNotifierPlugin(),
    // new BrowserSyncPlugin(
    //   {
    //     port: 3000,
    //     open: false,
    //     // proxy: {
    //     // target: "https://audio.dev",
    //     // },
    //     // https: {
    //     //   key: path.resolve(`${__dirname}/../dockerfile/dev-env/audio.dev.key`),
    //     //   cert: path.resolve(
    //     //     `${__dirname}/../dockerfile/dev-env/audio.dev.crt`,
    //     //   ),
    //     // },
    //   },
    //   {
    //     reload: false,
    //   },
    // ),
  ],
};

const prodOrTest = {
  mode: "production",
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
};

module.exports = merge([common, isProdMode ? prodOrTest : development]);
