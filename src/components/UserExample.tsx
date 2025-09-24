import { useEffect } from 'react';
import { Button, Card, List, Avatar, Space, Spin, Alert, Typography, Tag } from 'antd';
import { UserOutlined, ReloadOutlined, DeleteOutlined } from '@ant-design/icons';
import { useUserStore } from '../stores/userStore';

const { Title, Text } = Typography;

export const UserExample = () => {
  const {
    user,
    users,
    loading,
    error,
    setUser,
    clearUser,
    updateUser,
    fetchUser,
    fetchUsers,
    removeUser,
  } = useUserStore();

  // 组件挂载时获取用户列表
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <Card title="用户管理示例 - 异步操作与状态管理" style={{ margin: '16px 0' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 当前用户信息 */}
        <div>
          <Title level={4}>当前用户</Title>
          {user ? (
            <Card size="small" style={{ background: '#f0f2f5' }}>
              <Space>
                <Avatar src={user.avatar} icon={<UserOutlined />} size={48} />
                <div>
                  <div><strong>{user.name}</strong></div>
                  <div><Text type="secondary">{user.email}</Text></div>
                  <Space size="small" style={{ marginTop: 4 }}>
                    <Button 
                      size="small" 
                      onClick={() => updateUser({ name: `${user.name} (已更新)` })}
                    >
                      更新用户名
                    </Button>
                    <Button size="small" onClick={clearUser}>
                      清除用户
                    </Button>
                  </Space>
                </div>
              </Space>
            </Card>
          ) : (
            <div style={{ padding: '16px', background: '#fafafa', borderRadius: '6px', textAlign: 'center' }}>
              <Text type="secondary">暂无用户信息</Text>
            </div>
          )}
        </div>

        {/* 操作按钮 */}
        <Space wrap>
          <Button 
            type="primary" 
            loading={loading} 
            icon={<ReloadOutlined />}
            onClick={() => fetchUsers()}
          >
            刷新用户列表
          </Button>
          <Button 
            loading={loading}
            onClick={() => fetchUser(Math.floor(Math.random() * 10) + 1)}
          >
            随机获取用户
          </Button>
        </Space>

        {/* 错误信息 */}
        {error && (
          <Alert
            message="操作失败"
            description={error}
            type="error"
            showIcon
            closable
            onClose={() => useUserStore.getState().setError(null)}
          />
        )}

        {/* 用户列表 */}
        <div>
          <Title level={4}>
            用户列表 
            <Tag color="blue" style={{ marginLeft: 8 }}>
              {users.length} 人
            </Tag>
          </Title>
          
          <Spin spinning={loading}>
            <List
              dataSource={users}
              renderItem={(user) => (
                <List.Item
                  actions={[
                    <Button 
                      key="select"
                      type="link" 
                      onClick={() => setUser(user)}
                    >
                      选择
                    </Button>,
                    <Button 
                      key="delete"
                      type="link" 
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => removeUser(user.id)}
                    >
                      删除
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={user.avatar} icon={<UserOutlined />} />}
                    title={user.name}
                    description={user.email}
                  />
                </List.Item>
              )}
              locale={{ emptyText: '暂无用户数据' }}
            />
          </Spin>
        </div>

        {/* 使用说明 */}
        <div style={{ padding: '16px', background: '#f5f5f5', borderRadius: '6px' }}>
          <Text strong>异步操作特点：</Text>
          <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
            <li>使用 get() 获取当前状态</li>
            <li>统一的加载状态管理</li>
            <li>错误处理机制</li>
            <li>乐观更新和回滚</li>
          </ul>
        </div>
      </Space>
    </Card>
  );
};
