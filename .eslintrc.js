const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  env: { node: true, es2022: true, browser: true },
  plugins: ["prettier"],
  extends: [
    "eslint:recommended",
    "plugin:astro/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {
        // "no-multiple-empty-lines": "error",
      },
    },
  ],
});
