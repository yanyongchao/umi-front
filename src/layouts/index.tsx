import { Outlet } from 'umi';
import { ConfigProvider } from 'antd';
import { useEffect } from 'react';
import { getAntdThemeConfig, injectThemeVars } from '@/plugins/theme/theme';

export default function Layout() {
  // 注入主题变量到CSS
  useEffect(() => {
    injectThemeVars();
  }, []);

  // 获取Antd主题配置
  const antdTheme = getAntdThemeConfig();

  return (
    <ConfigProvider
      theme={{
        token: antdTheme,
      }}
    >
      <Outlet />
    </ConfigProvider>
  );
}
