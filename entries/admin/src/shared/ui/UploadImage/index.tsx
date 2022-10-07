import { message, Upload, UploadFile } from 'antd';
import { FC, useState } from 'react';
import { UploadChangeParam } from 'antd/es/upload';

import { bucketUploadUrl } from 'admin/shared/config';
import { ImageView } from 'admin/shared/ui/UploadImage/ImageView';

interface IProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const UploadImage: FC<IProps> = ({ value, onChange }) => {
  const [percent, setPercent] = useState<null | number>(null);

  const onUpload = ({
    file,
  }: UploadChangeParam<UploadFile<{ name: string }>>): void => {
    if (file.status === 'error') {
      void message.error('Произошла ошибка при загрузке файла');

      setPercent(null);

      return;
    }

    if (file.status !== 'done' || !file.response?.name) {
      setPercent(file.percent || null);

      return;
    }

    if (onChange) {
      onChange(file.response.name);
    }

    setPercent(null);
  };

  return (
    <Upload.Dragger
      name='file'
      action={bucketUploadUrl}
      showUploadList={false}
      withCredentials={true}
      onChange={onUpload}
    >
      <ImageView percent={percent} value={value} />
    </Upload.Dragger>
  );
};
