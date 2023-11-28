const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const typescript = require("rollup-plugin-typescript");
const terser = require("@rollup/plugin-terser");
const pkg = require("./package.json");

module.exports = {
  input: "src/index.js", // 打包入口
  output: [
    {
      // 打包出口
      file: pkg.browser, // 最终打包出来的文件路径和文件名，这里是在package.json的browser: 'dist/index.js'字段中配置的
      format: "cjs",
      plugins: [terser()],
    },
  ],
  plugins: [
    // 打包插件
    resolve(), // 查找和打包node_modules中的第三方模块
    commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
    typescript(), // 解析TypeScript
  ],
};
