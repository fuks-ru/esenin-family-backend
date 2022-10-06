import { PlusOutlined } from '@ant-design/icons';
import { Progress, Space, Typography } from 'antd';
import { FC } from 'react';

import { bucketUrl } from 'admin/shared/config';

interface IProps {
  percent: number | null;
  value?: string;
}

export const ImageView: FC<IProps> = ({ value, percent }) => {
  if (percent !== null) {
    return <Progress percent={percent} />;
  }

  return value ? (
    <img
      style={{ width: '100%' }}
      src={`${bucketUrl}/static-bucket/files/${value}`}
      alt='logo'
    />
  ) : (
    <Space direction='vertical'>
      <PlusOutlined />
      <Typography.Text>Загрузить</Typography.Text>
    </Space>
  );
};
