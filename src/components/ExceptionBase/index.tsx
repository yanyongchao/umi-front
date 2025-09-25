import React, { FC, memo } from 'react';
import { Button } from 'antd'
import { ReactComponent as NoPermissionIcon } from '@/assets/svg-icon/no-permission.svg';
import { ReactComponent as NotFoundIcon } from '@/assets/svg-icon/not-found.svg';
import { ReactComponent as ServiceErrorIcon } from '@/assets/svg-icon/service-error.svg';

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
    <div className="size-full min-h-520px flex-col-center gap-24px overflow-hidden">
      <div className="flex text-400px text-primary">
        {React.createElement(iconMap[type], { width: '1em', height: '1em', fill: 'currentColor' })}
      </div>
      <Button
        type="primary"
      >
        返回首页
      </Button>
    </div>
  );
});

export default ExceptionBase;
