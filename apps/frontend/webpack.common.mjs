import path from "path";
import {fileURLToPath} from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";

/* ───── получаем __dirname в ES-модуле ───── */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ───── конфиг ───── */
export default {
    /* ← ключевая строка: все относительные пути читаются от apps/frontend */
    context: __dirname,

    entry: "./src/app/index.tsx",

    output: {
        /* делаем абсолютный путь, чтобы не зависеть от cwd */
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].js",
        publicPath: "/",
        clean: true
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            "@": path.resolve(__dirname, "src")   // теперь Webpack понимает @/
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
        })
    ]
};
