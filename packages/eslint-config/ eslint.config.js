import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
    js.configs.recommended,

    ...tseslint.configs.recommendedTypeChecked, // TS-правила

    {
        linterOptions: { reportUnusedDisableDirectives: true },

        files: ["**/*.{ts,tsx}"],
        ignores: ["dist/**", "build/**"],

        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            parser: tseslint.parser,
            parserOptions: {
                project: true,            // auto-detect tsconfig во воркспейсе
            },
        },

        plugins: {
            "@typescript-eslint": tseslint.plugin,
        },

        rules: {
            "no-console": "warn",
            "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
        },
    },
];
