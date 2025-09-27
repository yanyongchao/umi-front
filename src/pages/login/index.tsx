import React, { useMemo, useState, useCallback } from "react";
import { AccountLoginForm, RegisterForm, PhoneLoginForm } from './modules';
import bgImage from '@/assets/imgs/login/bg.png';
import logoImage from '@/assets/imgs/login/logo.png';
import banerImage from '@/assets/imgs/login/banner.png';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

type LoginType = 'account' | 'phone' | 'register';

export default function LoginPage() {
  const [activeLoginType, setActiveLoginType] = useState<LoginType>('account');

  // Tab配置
  const tabItems: TabsProps['items'] = useMemo(() => [
    {
      key: 'account',
      label: '账号登录'
    },
    {
      key: 'phone',
      label: '手机号登录'
    }
  ], []);

  const handleTabChange = useCallback((key: string) => {
    setActiveLoginType(key as LoginType);
  }, []);
  return (
    <div
      className="relative size-full flex justify-center items-center overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <img className="w-379px absolute left-80px top-30px" src={logoImage} alt="logo" />
      <div className='flex justify-center'>
        <div className="flex flex-col items-center justify-center font-600">
          <h2 className="mb-46px text-33px text-#000">
            <span className="text-primary">天问，</span>
            <span>用Agent重塑软教辅生产力</span>
          </h2>
          <img src={banerImage} className='w-450px' alt="banner" />
        </div>
        <div className="px-76px py-40px bg-white ml-200px w-320px box-content">
          <h2 className="text-#000 text-24px mb-16px font-600">欢迎使用天问</h2>
          <Tabs
            activeKey={activeLoginType}
            items={tabItems}
            onChange={handleTabChange}
            indicator={{ size: (origin) => origin / 2, align: 'center' }}
            className="[&_.ant-tabs-nav::before]:hidden [&_.ant-tabs-tab]:font-600"
          />
          <AccountLoginForm />
        </div>
      </div>
    </div>
  );
}