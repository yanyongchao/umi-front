import { useEffect } from 'react';
import { Typography, Space, Divider } from 'antd';
import { CounterExample } from '@/components/CounterExample';
import { UserExample } from '@/components/UserExample';
import { CartExample } from '@/components/CartExample';
import { SettingsExample } from '@/components/SettingsExample';
import { initializeSettings } from '@/stores/settingsStore';

const { Title, Paragraph } = Typography;

export default function HomePage() {
  // 初始化设置
  useEffect(() => {
    initializeSettings();
  }, []);

  return (
    <div style={{ padding: 24, minHeight: '100vh', background: '#f0f2f5' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* 页面标题 */}
        <div style={{ textAlign: 'center', marginBottom: 40, padding: '40px 0' }}>
          <Title level={1} style={{ marginBottom: 16 }}>
            🎯 Zustand 状态管理学习示例
          </Title>
          <Paragraph style={{ fontSize: '16px', color: '#666' }}>
            通过实际例子学习 Zustand 的各种用法，从基础到高级特性
          </Paragraph>
        </div>

        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* 基础计数器示例 */}
          <CounterExample />
          
          <Divider />
          
          {/* 用户管理示例 */}
          <UserExample />
          
          <Divider />
          
          {/* 购物车示例 */}
          <CartExample />
          
          <Divider />
          
          {/* 设置管理示例 */}
          <SettingsExample />
          
          {/* 学习总结 */}
          <div style={{ 
            marginTop: '40px', 
            padding: '24px', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '12px',
            color: 'white'
          }}>
            <Title level={3} style={{ color: 'white', marginBottom: 16 }}>
              🚀 Zustand 学习要点总结
            </Title>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '16px' 
            }}>
              <div>
                <Title level={5} style={{ color: 'white' }}>✨ 核心特性</Title>
                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                  <li>极简的 API 设计</li>
                  <li>TypeScript 原生支持</li>
                  <li>无需 Provider 包装</li>
                  <li>支持多个独立 store</li>
                </ul>
              </div>
              <div>
                <Title level={5} style={{ color: 'white' }}>🎨 高级特性</Title>
                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                  <li>持久化存储 (persist)</li>
                  <li>中间件系统</li>
                  <li>异步操作处理</li>
                  <li>状态订阅和派生</li>
                </ul>
              </div>
              <div>
                <Title level={5} style={{ color: 'white' }}>🔧 最佳实践</Title>
                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                  <li>按功能拆分 store</li>
                  <li>使用 get() 访问当前状态</li>
                  <li>合理使用 immer 处理复杂状态</li>
                  <li>善用 devtools 调试</li>
                </ul>
              </div>
            </div>
          </div>
        </Space>
      </div>
    </div>
  );
}
