import { merge } from "webpack-merge";
import common from "./webpack.common.mjs";

export default merge(common, {
    mode: "development",
    devtool: "eval-source-map",
    devServer: { port: 3000, hot: true, historyApiFallback: true, client: { overlay: true } }
});
