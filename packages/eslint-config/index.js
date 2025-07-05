/** @type {import("eslint").Linter.BaseConfig} */
module.exports = {
    root: false,
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "react"],
    env: { es2022: true, browser: true, node: true },
    settings: { react: { version: "detect" } }
};
