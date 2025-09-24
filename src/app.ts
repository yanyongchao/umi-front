import { injectThemeVars } from './plugins/theme/theme';

// 应用启动时执行
export function render(oldRender: () => void) {
  oldRender();
}

