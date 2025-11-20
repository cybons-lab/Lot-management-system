import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // ▼▼▼ 追加: Park UI用プリセット ▼▼▼
  presets: ["@pandacss/dev/presets", "@park-ui/panda-preset"],

  // ▼▼▼ 追加: Reactフレームワーク指定 ▼▼▼
  jsxFramework: "react",

  include: ["./src/**/*.{ts,tsx}"],

  outdir: "styled-system",

  globalCss: {
    "*, *::before, *::after": {
      boxSizing: "border-box",
    },
    body: {
      margin: 0,
      fontFamily: "system-ui, sans-serif",
    },
  },

  theme: {
    // ▼▼▼ 追加: ここにカスタムアニメーション定義（extend）を挿入 ▼▼▼
    extend: {
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-2px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(2px)" },
        },
      },
    },
    // ▲▲▲ 追加ここまで ▲▲▲

    // ▼▼▼ 元の定義はそのまま維持 ▼▼▼
    tokens: {
      colors: {
        gray: {
          50: { value: "#f9fafb" },
          100: { value: "#f3f4f6" },
          200: { value: "#e5e7eb" },
          300: { value: "#d1d5db" },
          400: { value: "#9ca3af" },
          500: { value: "#6b7280" },
          600: { value: "#4b5563" },
          700: { value: "#374151" },
          800: { value: "#1f2937" },
          900: { value: "#111827" },
        },
        blue: {
          50: { value: "#eff6ff" },
          600: { value: "#2563eb" },
        },
        red: { 600: { value: "#dc2626" } },
        green: { 500: { value: "#22c55e" } },
        orange: { 600: { value: "#ea580c" } },
      },
      spacing: {
        0: { value: "0px" },
        1: { value: "4px" },
        2: { value: "8px" },
        3: { value: "12px" },
        4: { value: "16px" },
        6: { value: "24px" },
        8: { value: "32px" },
      },
      radii: {
        sm: { value: "4px" },
        md: { value: "6px" },
        lg: { value: "8px" },
      },
    },
  },

  utilities: {
    extend: {},
  },
});
