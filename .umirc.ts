import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
  ],

  npmClient: "pnpm",
  unocss: {},
  plugins: ["@umijs/plugins/dist/unocss"],
});
