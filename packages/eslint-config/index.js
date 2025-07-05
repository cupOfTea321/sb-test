module.exports = {
    root: false,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    env: { browser: true, node: true, es2022: true },
    parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    rules: {
        "no-console": "warn"
    }
};
