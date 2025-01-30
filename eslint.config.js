import { Linter } from "eslint";
import eslintRecommended from "eslint/conf/eslint-recommended";
import typescriptEslintRecommended from "@typescript-eslint/eslint-plugin/dist/configs/recommended";
import prettierRecommended from "eslint-config-prettier";

const config = [
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        browser: true,
        es2021: true,
        node: true,
      },
    },
    rules: {
      // Add your custom rules here
    },
  },
  eslintRecommended,
  typescriptEslintRecommended,
  prettierRecommended,
];

export default config;
