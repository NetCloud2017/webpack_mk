const path = require("path");
const speedMeasurePlugin = require("speed-measure-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
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
      new BundleAnalyzerPlugin({
        analyzerMode: process.env.MEASURE === "true" ? "server" : "disabled",
      }),
    ],
  }),
};
