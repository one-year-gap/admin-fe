import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  globalIgnores([".next/**", "out/**", "build/**", "dist/**", "coverage/**", "next-env.d.ts"]),

  {
    plugins: {
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
      "react-hooks": reactHooks,
    },
    rules: {
      /** Import 관련 */
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^\\u0000"],
            ["^react"],
            ["^next"],
            ["^@/"],
            ["^@"],
            ["^[a-z]"],
            ["^\\./", "^\\.\\./"],
          ],
        },
      ],
      "simple-import-sort/exports": "warn",
      "unused-imports/no-unused-imports": "error",

      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      /** TS 관련 */
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "separate-type-imports" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",

      /** React Hooks 관련 */
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      /** console 정책 */
      "no-console": "warn",

      /** best practices */
      eqeqeq: "error",
      "no-debugger": "error",
      "no-var": "error",
      "prefer-const": "warn",
      "no-duplicate-imports": "warn",
    },
  },

  /** ESLint 포맷 룰 충돌 제거 (Prettier가 포맷 담당) */
  eslintConfigPrettier,
]);

export default eslintConfig;
