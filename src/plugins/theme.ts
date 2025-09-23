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
  // 基础颜色变量映射：配置键 -> CSS变量名
  const colorMapping: Record<string, string> = {
    'base-text': '--base-text-color',
    'container': '--container-bg-color',
    'inverted': '--inverted-bg-color',
    'layout': '--layout-bg-color',
    'nprogress': '--nprogress-color',
    'divider': '--divider-color',
  };

  // 收集所有需要写入 :root 的 CSS 变量
  const allVars: Record<string, string> = {};
  const normalizeRGB = (val: string) => val.includes(',') ? val.replace(/\s*,\s*/g, ' ') : val;

  // 写入基础颜色变量（保持变量值为 "r, g, b"，方便下游使用 rgb(var(--...)))
  Object.entries(themeConfig.colors).forEach(([key, value]) => {
  const cssVarName = colorMapping[key] || `--${key}-color`;
    // 使用空格分隔的 RGB，便于 rgb(var(--x) / alpha) 语法
    allVars[cssVarName] = normalizeRGB(value);
  });

  // 生成并合并调色板变量
  const paletteVars = generateColorPaletteVars({
    primary: themeConfig.colors.primary,
    info: themeConfig.colors.info,
    success: themeConfig.colors.success,
    warning: themeConfig.colors.warning,
    error: themeConfig.colors.error,
  });
  // palette 变量同样规范为以空格分隔
  Object.entries(paletteVars).forEach(([k, v]) => {
    allVars[k] = normalizeRGB(v);
  });

  // 以 :root 规则的形式注入样式，避免使用 root.style
  const cssText = `:root{\n${Object.entries(allVars)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n')}\n}`;

  let styleEl = document.getElementById('theme-vars') as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'theme-vars';
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = cssText;
}

/** 获取Antd主题配置 */
export function getAntdThemeConfig() {
  return themeConfig.antd || {};
}
