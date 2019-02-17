const path = require("path");
const webpack = require("webpack");
const ReactLoadablePlugin = require("react-loadable/webpack")
  .ReactLoadablePlugin;
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const WebpackNotifierPlugin = require("webpack-notifier");
const { browserList, fileLoaderOptions } = require("./options");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const merge = require("webpack-merge");
const ManifestPlugin = require("webpack-manifest-plugin");


const common = {
  entry: {
    client: "client.js",
  },


  plugins: [
    // new BundleAnalyzerPlugin({ openAnalyzer: false }),
    new CleanWebpackPlugin(["public"], {
      root: path.resolve(`${__dirname}/..`),
      verbose: true,
    }),

    new ManifestPlugin({ basePath: "", publicPath: "" }),

    new ReactLoadablePlugin({
      filename: publicPath + "/react-loadable.json",
    }),

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
    new BundleAnalyzerPlugin({ openAnalyzer: false }),
    new WebpackNotifierPlugin(),
    new BrowserSyncPlugin(
      {
        port: 3000,
        open: false,
        // proxy: {
        // target: "https://audio.dev",
        // },
        // https: {
        //   key: path.resolve(`${__dirname}/../dockerfile/dev-env/audio.dev.key`),
        //   cert: path.resolve(
        //     `${__dirname}/../dockerfile/dev-env/audio.dev.crt`,
        //   ),
        // },
      },
      {
        reload: false,
      },
    ),
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
