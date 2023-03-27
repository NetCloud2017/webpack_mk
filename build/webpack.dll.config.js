const webpack = require("webpack");
const { join, resolve } = require("path");
const dllPath = "../dll";
module.exports = {
  mode: "production",
  entry: {
    vue: ["vue", "vue-router", "vuex"],
  },
  output: {
    path: resolve(__dirname, dllPath),
    filename: "[name].dll.js",
    library: "[name]_[hash]",
  },
  plugins: [
    new webpack.DllPlugin({
      path: join(__dirname, dllPath, "[name]-manifest.json"),
      name: "[name]_[hash]", // library 的name  一致 ,在打包后的文件可以看到， 最后会成为 vindow 的一个全局属性供其他文调用。
      context: process.cwd(),
    }),
  ],
};
