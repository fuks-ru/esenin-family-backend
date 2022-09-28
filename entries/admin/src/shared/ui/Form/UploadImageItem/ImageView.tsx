import { PlusOutlined } from '@ant-design/icons';
import { Progress, Space, Typography } from 'antd';
import { FC } from 'react';

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
      src={`http://localhost:2000/static/esenin/${value}`}
      alt='logo'
    />
  ) : (
    <Space direction='vertical'>
      <PlusOutlined />
      <Typography.Text>Загрузить</Typography.Text>
    </Space>
  );
};
