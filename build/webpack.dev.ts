import path from "path";
import { merge } from "webpack-merge";
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import baseConfig from "./webpack.base";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const host = "127.0.0.1";
const port = process.env.PORT || "8082";

// 合并公共配置,并添加开发环境配置
const devConfig: Configuration = merge(baseConfig, {
  mode: "development",
  /**
    开发环境主推：eval-cheap-module-source-map
    ● 本地开发首次打包慢点没关系,因为 eval 缓存的原因, 热更新会很快
    ● 开发中,我们每行代码不会写的太长,只需要定位到行就行,所以加上 cheap
    ● 我们希望能够找到源代码的错误,而不是打包后的,所以需要加上 module
   */
  devtool: "eval-cheap-module-source-map",
  devServer: {
    host,
    port,
    open: true, // 是否自动打开
    compress: false, // gzip压缩,开发环境不开启，提升热更新速度
    hot: true, // 开启热更新
    historyApiFallback: true, // 解决history路由404问题
    setupExitSignals: true, // 允许在 SIGINT 和 SIGTERM 信号时关闭开发服务器和退出进程。
    static: {
      directory: path.join(__dirname, "../public"), // 托管静态资源public文件夹
    },
    headers: { "Access-Control-Allow-Origin": "*" },
  },
});

export default devConfig;
