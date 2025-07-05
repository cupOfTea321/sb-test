import path from "path";
import {fileURLToPath} from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import Dotenv from "dotenv-webpack";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    context: __dirname,

    entry: "./src/app/index.tsx",

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].js",
        publicPath: "/",
        clean: true
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    },

    module: {
        rules: [
            {test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/},
            {test: /\.css$/, use: ["style-loader", "css-loader"]}
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html")
        }),
        new Dotenv({ systemvars: true })
    ]
};
