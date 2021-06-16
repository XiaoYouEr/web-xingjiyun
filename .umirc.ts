import { defineConfig } from "umi";

const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV || "");
export default defineConfig({
  chunks: ["vendors", "antd", "umi"],
  chainWebpack(config) {
    config.optimization.splitChunks({
      chunks: "all",
      automaticNameDelimiter: "～",
      name: true,
      minSize: 30000,
      minChunks: 1,
      cacheGroups: {
        antd: {
          name: "antd",
          test: /[\\/]node_modules[\\/](@ant-design|antd|antd-mobile)[\\/]/,
          priority: -10,
          enforce: true,
        },
        vendors: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          priority: -11,
          enforce: true,
        },
      },
    });
  },
  nodeModulesTransform: {
    type: "none",
    exclude: [],
  },
  hash: true,
  // routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  proxy: {
    "/web": {
      target: "http://183.232.116.206:8888/",
      changeOrigin: true,
      secure: false, // 不进行证书验证
    },
  },
  // base: "/page/",
  // publicPath: "/page/",
  locale: {
    // default: "en-US",
    // antd: false,
    // title: false,
    // baseNavigator: false,
    // baseSeparator: "-",
  },
  extraBabelPlugins: [IS_PROD ? "transform-remove-console" : ""],
  theme: {
    "@vw": "100/375vw",
    "@primaryColor": "#3682FF",
  },
  // paths: {
  //   "@/*": ["./src/*"],
  //   "@@/*": ["./src/.umi/*"]
  // }
});
