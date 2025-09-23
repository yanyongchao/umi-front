import { getThemeConfig, generateColorPaletteVars } from './config';

/** 获取当前主题配置 */
const themeConfig = getThemeConfig();

/** Create color palette vars */
function createColorPaletteVars() {
  const colors = ['primary', 'info', 'success', 'warning', 'error'];
  const colorPaletteNumbers = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

  const colorPaletteVar: Record<string, string> = {}

  colors.forEach(color => {
    colorPaletteVar[color] = `rgb(var(--${color}-color))`;
    colorPaletteNumbers.forEach(number => {
      colorPaletteVar[`${color}-${number}`] = `rgb(var(--${color}-${number}-color))`;
    });
  });

  return colorPaletteVar;
}

const colorPaletteVars = createColorPaletteVars();

/** Theme vars */
export const themeVars = {
  colors: {
    ...colorPaletteVars,
    // 其他主题颜色
    'base-text': 'rgb(var(--base-text-color))',
    container: 'rgb(var(--container-bg-color))',
    inverted: 'rgb(var(--inverted-bg-color))',
    layout: 'rgb(var(--layout-bg-color))',
    nprogress: 'rgb(var(--nprogress-color))',
    divider: 'rgb(var(--divider-color))'
  }
};

/** 生成CSS变量到根元素 */
export function injectThemeVars(): void {
  const root = document.documentElement;
  
  // 添加基础颜色变量，映射配置中的键名到CSS变量名
  const colorMapping: Record<string, string> = {
    'base-text': '--base-text-color',
    'container': '--container-bg-color',
    'inverted': '--inverted-bg-color',
    'layout': '--layout-bg-color',
    'nprogress': '--nprogress-color',
    'divider': '--divider-color',
  };
  
  Object.entries(themeConfig.colors).forEach(([key, value]) => {
    const cssVarName = colorMapping[key] || `--${key}-color`;
    root.style.setProperty(cssVarName, value);
  });
  
  // 生成调色板变量
  const cssVars = generateColorPaletteVars({
    primary: themeConfig.colors.primary,
    info: themeConfig.colors.info,
    success: themeConfig.colors.success,
    warning: themeConfig.colors.warning,
    error: themeConfig.colors.error
  });
  
  Object.entries(cssVars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

/** 获取Antd主题配置 */
export function getAntdThemeConfig() {
  return themeConfig.antd || {};
}
