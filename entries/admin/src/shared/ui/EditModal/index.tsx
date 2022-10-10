import { useCallback } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { Store } from 'rc-field-form/es/interface';
import { SerializedError } from '@reduxjs/toolkit';
import { v4 } from 'uuid';
import { IRtkResponseError } from '@fuks-ru/common-frontend';

import { UploadImage } from 'admin/shared/ui/UploadImage';

export interface IEnumOption {
  label: string;
  value: string;
}

export interface IFormDataType<Data extends { id: string }> {
  dataIndex: keyof Data;
  label?: string;
  field:
    | {
        type: 'text' | 'image';
      }
    | {
        type: 'enum';
        options: IEnumOption[];
      };
}

interface IProps<Data extends Store & { id: string }> {
  initialData?: Data;
  dataTypes: Array<IFormDataType<Data>>;
  onClose: () => void;
  onSave: (
    data: Data,
  ) => Promise<{ data: Data } | { error: SerializedError | IRtkResponseError }>;
  isLoading: boolean;
  title: string;
}
export const EditModal = <Data extends Store & { id: string }>({
  onSave,
  initialData,
  dataTypes,
  title,
  isLoading,
  onClose,
}: IProps<Data>): JSX.Element => {
  const [form] = useForm<Data>();

  const handleFinish = useCallback(
    async (data: Data) => {
      form.setFields(
        Object.keys(data).map((name) => ({
          name,
          errors: undefined,
        })),
      );

      const result = await onSave(data);

      if (
        'error' in result &&
        'validation' in result.error &&
        result.error.validation
      ) {
        form.setFields(
          Object.entries(result.error.validation).map(([name, errors]) => ({
            name,
            errors,
          })),
        );

        return;
      }

      onClose();
    },
    [form, onClose, onSave],
  );

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

          switch (data.field.type) {
            case 'image':
              return (
                <Form.Item name={dataIndex} label={data.label} key={dataIndex}>
                  <UploadImage />
                </Form.Item>
              );
            case 'enum':
              return (
                <Form.Item name={dataIndex} label={data.label} key={dataIndex}>
                  <Select options={data.field.options} />
                </Form.Item>
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
