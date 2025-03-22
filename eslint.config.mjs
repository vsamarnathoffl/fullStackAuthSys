import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // Disable the @typescript-eslint/no-explicit-any rule
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Turns off the rule that flags `any` type
    },
  },
];

export default eslintConfig;
