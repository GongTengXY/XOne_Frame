import path from "path";
import { Configuration, DefinePlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import * as dotenv from "dotenv";

const jsonRegex = /\.json$/;
const cssRegex = /\.css$/;
const sassRegex = /\.(scss|sass)$/;
const lessRegex = /\.less$/;
const imageRegex = /\.(png|jpe?g|gif|svg)$/i;
const fontRegex = /.(woff2?|eot|ttf|otf)$/;
const mediaRegex = /.(mp4|webm|ogg|mp3|wav|flac|aac)$/;

// 加载配置文件
const envConfig = dotenv.config({
  path: path.resolve(__dirname, "../env/.env." + process.env.BASE_ENV),
});

const styleLoadersArray = [
  "style-loader",
  {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: "[name]_[local]_[hash:5]",
      },
    },
  },
  "postcss-loader",
];

const baseConfig: Configuration = {
  entry: path.join(__dirname, "../src/index.tsx"), // 入口文件
  // 打包的出口文件
  output: {
    filename: "static/js/[name].js", // 每个输出js的名称
    path: path.join(__dirname, "../dist"), // 打包结果输出路径
    clean: true, // webpack5内置了clean-webpack-plugin来删除dist文件
    publicPath: "/", // 打包后文件的公共前缀路径
    assetModuleFilename: "images/[name].[hash:8][ext]",
  },
  // loader 配置
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/,
        use: "babel-loader",
      },
      {
        test: cssRegex,
        use: styleLoadersArray,
      },
      {
        test: lessRegex,
        use: [
          ...styleLoadersArray,
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                // 如果要在less中写类型js的语法，需要加这一个配置
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: sassRegex,
        use: [...styleLoadersArray, "sass-loader"],
      },
      {
        test: imageRegex, // 匹配图片文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于多少kb转base64
          },
        },
        generator: {
          filename: "static/images/[name].[hash:8][ext]", // 文件输出目录和命名
        },
      },
      // webpack本身就对会本地json文件的处理（默认type: "json"），自动打进bundle
      {
        test: fontRegex, // 匹配字体图标文件
        type: "asset/resource", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64
          },
        },
        generator: {
          filename: "static/fonts/[hash:6][ext][query]", // 文件输出目录和命名
        },
      },
      {
        test: mediaRegex, // 匹配媒体文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64
          },
        },
        generator: {
          filename: "static/media/[hash:6][ext][query]", // 文件输出目录和命名
        },
      },
    ],
  },
  resolve: {
    extensions: [
      ".tsx",
      ".ts",
      ".jsx",
      ".js",
      ".less",
      ".css",
      ".scss",
      ".json",
    ],
    // 别名需要配置两个地方，这里和 tsconfig.json
    alias: {
      "@": path.join(__dirname, "../src"),
    },
  },
  // plugins 的配置
  plugins: [
    new HtmlWebpackPlugin({
      title: "webpack5-react-ts",
      filename: "index.html",
      // 复制 'index.html' 文件，并自动引入打包输出的所有资源（js/css）
      template: path.join(__dirname, "../public/index.html"),
      inject: true, // 自动注入静态资源
      hash: true,
      cache: false,
      // 压缩html资源
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true, //去空格
        removeComments: true, // 去注释
        minifyJS: true, // 在脚本元素和事件属性中缩小JavaScript(使用UglifyJS)
        minifyCSS: true, // 缩小CSS样式元素和样式属性
      },
      nodeModules: path.resolve(__dirname, "../node_modules"),
    }),
    new DefinePlugin({
      "process.env": JSON.stringify(envConfig.parsed),
      "process.env.BASE_ENV": JSON.stringify(process.env.BASE_ENV),
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};

export default baseConfig;
