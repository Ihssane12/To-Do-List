import { Linter } from "eslint";

const config = {
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    globals: {
      browser: true,
      es2021: true,
      node: true,
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    // Add your custom rules here
  },
};

export default config;
