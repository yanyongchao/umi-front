// API 配置
export const API_CONFIG = {
  // 开发环境
  development: {
    baseURL: 'http://localhost:3000/api',
    timeout: 30000,
  },
  // 测试环境
  test: {
    baseURL: 'https://test-api.example.com',
    timeout: 30000,
  },
  // 生产环境
  production: {
    baseURL: 'https://api.example.com',
    timeout: 30000,
  },
};

// 获取当前环境的配置
export const getCurrentConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  return API_CONFIG[env as keyof typeof API_CONFIG] || API_CONFIG.development;
};

// API 端点配置
export const API_ENDPOINTS = {
  // 用户相关
  USER: {
    LOGIN: '/user/login',
    LOGOUT: '/user/logout',
    INFO: '/user/info',
    REGISTER: '/user/register',
  },
  // 其他模块可以在这里添加
  // PRODUCT: {
  //   LIST: '/product/list',
  //   DETAIL: '/product/detail',
  // },
};
