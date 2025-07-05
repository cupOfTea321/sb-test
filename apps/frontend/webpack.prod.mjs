import { merge } from "webpack-merge";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import common from "./webpack.common.mjs";

export default merge(common, {
    mode: "production",
    devtool: "source-map",
    module: { rules: [{ test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] }] },
    plugins: [new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" })]
});
