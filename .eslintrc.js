module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "error",
    quotes: ["error", "double"],
    "no-use-before-define": 1,
    "no-empty-function": 1,
    "no-empty": "off",
    "prefer-const": 1,
    "no-unused-vars": 1,
    "no-var": "error",
    "no-console": 1,
    "no-debugger": 1,
    "@typescript-eslint/no-explicit-any": 1,
  },
};
// 1 means warning, 2 means error and 0 means off
