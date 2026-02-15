import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier";
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
    },
    rules: {
      /** Import 관련 */
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // 1. Side effect imports (예: import "./style.css")
            ["^\\u0000"],
            // 2. React 및 Next.js 관련 핵심 라이브러리
            ["^react", "^next"],
            // 3. 외부 스코프 패키지 (예: @tanstack, @radix-ui)
            ["^@(?!/)"],
            // 4. 일반 외부 패키지 (예: axios, lucide-react)
            ["^[a-z]"],
            // 5. 프로젝트 내부 경로 (alias @/)
            ["^@/"],
            // 6. 상대 경로 (예: ../, ./)
            ["^\\.\\./", "^\\./"],
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

      /** React Hooks 관련 (플러그인은 eslint-config-next가 제공) */
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      /** console 정책 */
      "no-console": "warn",

      /** best practices */
      eqeqeq: "error",
      "no-debugger": "error",
      "no-var": "error",
      "prefer-const": "warn",
      "no-duplicate-imports": "off",
    },
  },

  /** ESLint 포맷 룰 충돌 제거 (Prettier가 포맷 담당) */
  eslintConfigPrettier,
]);

export default eslintConfig;
