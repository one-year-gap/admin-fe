import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      /* Fonts */
      fontFamily: {
        sans: ["var(--font-pretendard)"],
      },

      /* Font sizes (UNIVERSE spec)
       * - size + line-height까지 함께 고정 (가독성/일관성 목적)
       * - text 크기 속성은 xs, sm, md, lg, xl, 2xl로 통일
       */
      fontSize: {
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "20px" }],
        md: ["16px", { lineHeight: "24px" }],
        lg: ["20px", { lineHeight: "28px" }],
        xl: ["24px", { lineHeight: "32px" }],
        "2xl": ["32px", { lineHeight: "40px" }],
      },

      /**
       * Optional: If you want a consistent letter-spacing set,
       * you can add it later. (kept empty for now)
       */
    },
  },
  plugins: [],
} satisfies Config;

export default config;
