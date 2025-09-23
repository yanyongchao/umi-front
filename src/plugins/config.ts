/** 主题配置接口 */
export interface ThemeConfig {
  /** 主色配置 */
  colors: {
    /** 主色 */
    primary: string;
    /** 信息色 */
    info: string;
    /** 成功色 */
    success: string;
    /** 警告色 */
    warning: string;
    /** 错误色 */
    error: string;
    /** 基础文字色 */
    'base-text': string;
    /** 容器背景色 */
    container: string;
    /** 反色背景 */
    inverted: string;
    /** 布局背景色 */
    layout: string;
    /** 进度条颜色 */
    nprogress: string;
    /** 分割线颜色 */
    divider: string;
  };
  /** Antd主题配置 */
  antd?: {
    colorPrimary?: string;
    colorSuccess?: string;
    colorWarning?: string;
    colorError?: string;
    colorInfo?: string;
    borderRadius?: number;
    colorBgContainer?: string;
    colorText?: string;
  };
}

/** 默认主题配置 */
export const defaultThemeConfig: ThemeConfig = {
  colors: {
    primary: '59, 130, 246', // blue-500
    info: '14, 165, 233', // sky-500
    success: '34, 197, 94', // green-500
    warning: '251, 191, 36', // amber-500
    error: '239, 68, 68', // red-500
    'base-text': '55, 65, 81', // gray-700
    container: '255, 255, 255', // white
    inverted: '17, 24, 39', // gray-900
    layout: '249, 250, 251', // gray-50
    nprogress: '59, 130, 246', // blue-500
    divider: '229, 231, 235', // gray-200
  },
  antd: {
    colorPrimary: 'rgb(59, 130, 246)',
    colorSuccess: 'rgb(34, 197, 94)',
    colorWarning: 'rgb(251, 191, 36)',
    colorError: 'rgb(239, 68, 68)',
    colorInfo: 'rgb(14, 165, 233)',
    borderRadius: 6,
    colorBgContainer: 'rgb(255, 255, 255)',
    colorText: 'rgb(55, 65, 81)',
  }
};

/** 获取主题配置 */
export function getThemeConfig(): ThemeConfig {
  // 这里可以从本地存储、API或其他地方获取用户自定义的主题配置
  // 目前返回默认配置
  return defaultThemeConfig;
}

/** 生成颜色调色板CSS变量 */
export function generateColorPaletteVars(baseColors: Record<string, string>): Record<string, string> {
  const colorPaletteNumbers = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const vars: Record<string, string> = {};

  Object.entries(baseColors).forEach(([colorName, rgb]) => {
    vars[`--${colorName}-color`] = rgb;
    
    // 为每个颜色生成调色板变量（这里简化处理，实际项目中可能需要更复杂的颜色计算）
    colorPaletteNumbers.forEach(number => {
      vars[`--${colorName}-${number}-color`] = rgb; // 简化处理，都使用基础色
    });
  });

  return vars;
}