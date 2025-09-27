import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { 
      path: "/", 
      redirect: "/home" 
    },
    { 
      path: "/home", 
      component: "home" 
    },
    { 
      path: "/login", 
      component: "login" 
    },
    {
      path: "/403",
      component: "error/403",
    },
    {
      path: "/404",
      component: "error/404",
    },
    {
      path: "/500",
      component: "error/500",
    },
    {
      path: "*",
      redirect: "/404",
    }
  ],

  npmClient: "pnpm",
  unocss: {
    watch: ['src/**/*.tsx', 'src/**/*.less'],
  },
  plugins: ["@umijs/plugins/dist/unocss"],
});
