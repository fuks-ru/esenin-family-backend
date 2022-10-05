import { Schemas } from '@fuks-ru/esenin-family-client';
import { FC, useEffect } from 'react';
import { Form, Input, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';

import { UploadImageItem } from 'admin/shared/ui/Form';
import { pubApi } from 'admin/entities/pub';

interface IProps {
  pub: Schemas.Pub;
  onCancel: () => void;
}
export const EditPub: FC<IProps> = ({ pub, onCancel }) => {
  const [form] = useForm<Schemas.Pub>();
  const [update, { isLoading, isSuccess }] = pubApi.useUpdateMutation();

  useEffect(() => {
    if (isSuccess) {
      onCancel();
    }
  }, [isSuccess, onCancel]);

  return (
    <Modal
      open={true}
      title={pub.name}
      onCancel={onCancel}
      cancelText='Отменить'
      okButtonProps={{
        disabled: isLoading,
        children: 'Сохранить',
        onClick: form.submit,
      }}
    >
      <Form<Schemas.Pub> form={form} initialValues={pub} onFinish={update}>
        <Form.Item name='id' hidden={true}>
          <Input />
        </Form.Item>
        <Form.Item name='name' label='Название'>
          <Input />
        </Form.Item>
        <UploadImageItem label='Логотип' name='logo' initialValue={pub.logo} />
      </Form>
    </Modal>
  );
};
