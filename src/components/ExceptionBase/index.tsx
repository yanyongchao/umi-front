import React, { FC, memo } from 'react';
import { Button } from 'antd'
import { ReactComponent as NoPermissionIcon } from '@/assets/svg-icon/no-permission.svg';
import { ReactComponent as NotFoundIcon } from '@/assets/svg-icon/not-found.svg';
import { ReactComponent as ServiceErrorIcon } from '@/assets/svg-icon/service-error.svg';
import { history } from 'umi';

type ExceptionType = '403' | '404' | '500';

interface Props {
  type: ExceptionType;
}
const iconMap: Record<ExceptionType, React.FC<React.SVGProps<SVGSVGElement>>> = {
  '403': NoPermissionIcon,
  '404': NotFoundIcon,
  '500': ServiceErrorIcon
};
const ExceptionBase: FC<Props> = memo(({ type }) => {

  return (
    <div className="size-full min-h-520px flex flex-col items-center justify-center gap-24px overflow-hidden">
      <div className="text-400px text-primary">
        {React.createElement(iconMap[type], { width: '1em', height: '1em', fill: 'currentColor' })}
      </div>
      <Button
        type="primary"
        onClick={() => { history.push('/') }}
      >
        返回首页
      </Button>
    </div>
  );
});

export default ExceptionBase;
