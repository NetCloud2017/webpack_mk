const { resolve } = require("path");
const path = require("path");
const speedMeasurePlugin = require("speed-measure-webpack-plugin");
const webpack = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const AddAssetWebpackHtmlPlugin = require("add-asset-html-webpack-plugin");

console.log(process.env.MEASURE, "measure");
const smp = new speedMeasurePlugin({
  outputFormat: "humanVerbose",
  disable: !(process.env.MEASURE === "true"),
});

module.exports = {
  parallel: true,
  configureWebpack: smp.wrap({
    resolve: {
      alias: {
        src: path.resolve(__dirname, "./src"),
        assets: path.resolve(__dirname, "./src/assets"),
        components: path.resolve(__dirname, "./src/components"),
      },
    },
    module: {
      // rules: [
      //   {
      //     test: /\.js$/,
      //     loader: "thread-loader",
      //     options: {
      //       worker: 5,
      //     },
      //   },
      // ],
    },
    plugins: [
      new AddAssetWebpackHtmlPlugin({
        filepath: resolve(__dirname, "./dll/vue.dll.js"), // 注意引入时机， 生成后再引入。
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: process.env.MEASURE === "true" ? "server" : "disabled",
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: resolve(__dirname, "./dll/vue.dll.js"),
            to: resolve(__dirname, "./dist/js/vue.dll.js"),
          },
        ],
      }),
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: resolve(__dirname, "./dll/vue-manifest.json"),
      }),
    ],
  }),
};
