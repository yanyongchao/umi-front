import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
  ],

  npmClient: "pnpm",
  unocss: {
    watch: ['src/**/*.tsx', 'src/**/*.less'],
  },
  plugins: ["@umijs/plugins/dist/unocss"],
});
