import { useCallback, useEffect } from 'react';
import { Form, Input, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { Store } from 'rc-field-form/es/interface';
import { SerializedError } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

import { UploadImageItem } from 'admin/shared/ui/Form';
import { IResponseError } from 'admin/shared/api/mainApi';

export interface IFormDataType<Data extends { id: string }> {
  dataIndex: keyof Data;
  label?: string;
  type?: 'text' | 'image';
}

interface IProps<Data extends Store & { id: string }> {
  initialData?: Data;
  dataTypes: Array<IFormDataType<Data>>;
  onClose: () => void;
  onSave: (data: Data) => void;
  isLoading: boolean;
  isSuccess: boolean;
  title: string;
  error?: IResponseError | SerializedError;
}
export const EditModal = <Data extends Store & { id: string }>({
  onSave,
  initialData,
  dataTypes,
  title,
  isSuccess,
  isLoading,
  onClose,
  error,
}: IProps<Data>): JSX.Element => {
  const [form] = useForm<Data>();

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);

  const handleFinish = useCallback(
    (data: Data) => {
      form.setFields(
        Object.keys(data).map((name) => ({
          name,
          errors: undefined,
        })),
      );

      onSave(data);
    },
    [form, onSave],
  );

  useEffect(() => {
    if (error && 'validation' in error && error.validation) {
      form.setFields(
        Object.entries(error.validation).map(([name, errors]) => ({
          name,
          errors,
        })),
      );
    }
  }, [error, form]);

  return (
    <Modal
      open={true}
      title={title}
      onCancel={onClose}
      cancelText='Отменить'
      okButtonProps={{
        disabled: isLoading,
        children: 'Сохранить',
        onClick: form.submit,
      }}
    >
      <Form<Data>
        labelCol={{
          span: 24,
        }}
        wrapperCol={{ span: 24 }}
        form={form}
        initialValues={initialData || { id: v4() }}
        onFinish={handleFinish}
      >
        <Form.Item name='id' hidden={true}>
          <Input />
        </Form.Item>
        {dataTypes.map((data) => {
          const dataIndex = String(data.dataIndex);

          switch (data.type) {
            case 'image':
              return (
                <UploadImageItem
                  label={data.label}
                  name={dataIndex}
                  initialValue={initialData?.[dataIndex] as string}
                  key={dataIndex}
                />
              );
            // eslint-disable-next-line unicorn/no-useless-switch-case
            case 'text':
            default:
              return (
                <Form.Item name={dataIndex} label={data.label} key={dataIndex}>
                  <Input />
                </Form.Item>
              );
          }
        })}
      </Form>
    </Modal>
  );
};
