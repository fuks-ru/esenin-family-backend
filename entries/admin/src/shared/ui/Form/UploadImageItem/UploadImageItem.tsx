import { Form, message, Upload, UploadFile } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import { FC, useState } from 'react';

import { ImageView } from 'admin/shared/ui/Form/UploadImageItem/ImageView';

interface IProps {
  initialValue: string | undefined;
  name?: string;
  label?: string;
}

export const UploadImageItem: FC<IProps> = ({ initialValue, name, label }) => {
  const [value, setValue] = useState(initialValue);
  const [percent, setPercent] = useState<null | number>(null);

  const onUpload = ({
    file,
  }: UploadChangeParam<UploadFile<{ name: string }>>): string | undefined => {
    if (file.status === 'error') {
      void message.error('Произошла ошибка при загрузке файла');

      setPercent(null);

      return undefined;
    }

    if (file.status !== 'done' || !file.response?.name) {
      setPercent(file.percent || null);

      return undefined;
    }

    setValue(file.response.name);
    setPercent(null);

    return file.response.name;
  };

  return (
    <Form.Item name={name} label={label} getValueFromEvent={onUpload}>
      <Upload.Dragger
        name='file'
        action='http://localhost:2000/upload'
        showUploadList={false}
        withCredentials={true}
      >
        <ImageView percent={percent} value={value} />
      </Upload.Dragger>
    </Form.Item>
  );
};
