/** @type {import('eslint').Linter.Config} */
const config = {
  extends: ["next/core-web-vitals"],
  rules: {
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
    "@typescript-eslint/no-explicit-any": "off",
    "no-console": "off",
  },
};

export default config;
