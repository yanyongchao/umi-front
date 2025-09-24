import { Button, Card, InputNumber, Space, Typography } from 'antd';
import { useCounterStore } from '../stores/counterStore';

const { Title, Text } = Typography;

export const CounterExample = () => {
  // 使用 Zustand store
  const { count, increment, decrement, reset, setCount } = useCounterStore();

  return (
    <Card title="计数器示例 - 基础 Zustand 用法" style={{ margin: '16px 0' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 显示当前计数 */}
        <div style={{ textAlign: 'center' }}>
          <Title level={2} style={{ color: count > 0 ? '#52c41a' : count < 0 ? '#ff4d4f' : '#1890ff' }}>
            {count}
          </Title>
          <Text type="secondary">当前计数值</Text>
        </div>

        {/* 操作按钮 */}
        <Space wrap style={{ justifyContent: 'center', width: '100%' }}>
          <Button type="primary" onClick={increment}>
            +1 增加
          </Button>
          <Button onClick={decrement}>
            -1 减少
          </Button>
          <Button danger onClick={reset}>
            重置
          </Button>
        </Space>

        {/* 自定义设置值 */}
        <div style={{ textAlign: 'center' }}>
          <Space>
            <Text>设置值：</Text>
            <InputNumber
              value={count}
              onChange={(value) => setCount(value || 0)}
              style={{ width: 100 }}
            />
          </Space>
        </div>

        {/* 状态说明 */}
        <div style={{ padding: '16px', background: '#f5f5f5', borderRadius: '6px' }}>
          <Text strong>Zustand 特点：</Text>
          <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
            <li>无需 Provider 包装</li>
            <li>TypeScript 支持良好</li>
            <li>状态更新自动触发组件重渲染</li>
            <li>可以在任意组件中使用</li>
          </ul>
        </div>
      </Space>
    </Card>
  );
};
