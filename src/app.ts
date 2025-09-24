import { injectThemeVars } from './plugins/theme/theme';

// 应用启动时执行
export function render(oldRender: () => void) {
  // 注入主题变量
  injectThemeVars();
  oldRender();
}

