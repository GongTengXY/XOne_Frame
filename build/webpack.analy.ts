import prodConfig from "./webpack.prod";
import { merge } from "webpack-merge";

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// 实例化分析插件
const smp = new SpeedMeasurePlugin();
// 使用smp.wrap方法,把生产环境配置传进去,由于后面可能会加分析配置,所以先留出合并空位
export default smp.wrap(merge(prodConfig, {}));
