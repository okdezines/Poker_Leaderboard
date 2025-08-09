import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
<<<<<<< HEAD
import tseslint from "typescript-eslint";
=======
>>>>>>> refs/remotes/origin/feature/poker-leaderboard-app

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Next.js rules from FlatCompat
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Your custom TypeScript rule
  ...tseslint.config({
    rules: {
      "@typescript-eslint/no-require-imports": "error",
    },
  }),
];
