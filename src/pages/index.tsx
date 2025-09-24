import React, { useState } from 'react';
import { Button, Card, Form, Input, Space, Typography, message } from 'antd';
import yayJpg from '../assets/yay.jpg';
import UserService, { LoginParams } from '@/services/user';

const { Title, Paragraph } = Typography;

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // 处理登录
  const handleLogin = async (values: LoginParams) => {
    try {
      setLoading(true);
      const response = await UserService.login(values);
      
      if (response.success) {
        message.success('登录成功！');
        // 保存token到本地存储
        localStorage.setItem('token', response.data.token);
        console.log('用户信息:', response.data.user);
      }
    } catch (error) {
      console.error('登录失败:', error);
      // 错误处理已在请求拦截器中统一处理
    } finally {
      setLoading(false);
    }
  };

  // 获取用户信息示例
  const handleGetUserInfo = async () => {
    try {
      setLoading(true);
      const response = await UserService.getUserInfo();
      
      if (response.success) {
        message.success('获取用户信息成功！');
        console.log('用户信息:', response.data);
      }
    } catch (error) {
      console.error('获取用户信息失败:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Title level={2} className='text-primary'>Yay! Welcome to umi!</Title>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <img src={yayJpg} width="388" />
        </div>
        
        <Paragraph>
          To get started, edit <code>pages/index.tsx</code> and save to reload.
        </Paragraph>

        <Card title="请求库使用示例" style={{ maxWidth: 400 }}>
          <Form
            form={form}
            name="login"
            onFinish={handleLogin}
            layout="vertical"
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Input placeholder="请输入用户名" />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" loading={loading}>
                  登录
                </Button>
                <Button onClick={handleGetUserInfo} loading={loading}>
                  获取用户信息
                </Button>
              </Space>
            </Form.Item>
          </Form>

          <Paragraph type="secondary" style={{ fontSize: '12px', marginTop: 16 }}>
            这是一个请求库使用示例。实际使用时需要配置正确的API地址。
          </Paragraph>
        </Card>
      </Space>
    </div>
  );
}
