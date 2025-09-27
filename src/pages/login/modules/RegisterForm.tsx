// 账号登录表单组件
import { Button, Checkbox, Input, Space, Form as AForm } from 'antd';
import type { CheckboxChangeEvent } from 'antd';
import React, { useCallback, useState } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { ReactComponent as MdiUser } from '@/assets/svg-icon/mdi-user.svg';
import { ReactComponent as MdiPassword } from '@/assets/svg-icon/mdi-password.svg';

import './style.less';

const INITIAL_VALUES = {
  account: {
    password: '123456',
    userName: 'Soybean'
  },
  phone: {
    phone: '',
    code: ''
  }
};

export const RegisterForm = () => {
  const [agree, setAgree] = useState(false);
  const [form] = AForm.useForm();
  const rules = {
    userName: [
      { required: true, message: '请输入工号' },
    ],
    pwd: [
      { required: true, message: '请输入密码' },
    ]
  };

  const handleAgreeChange = useCallback((e: CheckboxChangeEvent) => {
    setAgree(e.target.checked);
  }, []);

  return (
    <AForm
      form={form}
      layout='vertical'
      className='pt-5px login-form-item'
      initialValues={INITIAL_VALUES.account}
      requiredMark={false}
      size='large'
    >
      <AForm.Item
        name="userName"
        label="工号"
        rules={rules.userName}
      >
        <Input placeholder="请输入工号" prefix={<MdiUser />} />
      </AForm.Item>

      <AForm.Item
        name="password"
        label="密码"
        rules={rules.pwd}
      >
        <Input.Password autoComplete="password" placeholder="请输入密码" prefix={<MdiPassword />} />
      </AForm.Item>
      <div className='mt-[-10px] mb-20px'>
        <Checkbox value={agree} onChange={handleAgreeChange} className='text-12px'>登录即代表已同意 <Button type="link" className='px-0px text-12px'>用户协议</Button> 和 <Button type="link" className='px-0px text-12px'>隐私政策</Button></Checkbox>

      </div>
      <AForm.Item>
        <Button type="primary" htmlType="submit" block>登录</Button>
      </AForm.Item>
      <div className='text-center text-14px'>
        没有账号？ <span className='text-primary'>现在就注册</span>
      </div>
    </AForm>
  )
}

