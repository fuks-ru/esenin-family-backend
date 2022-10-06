import { Button, Space, Table as TableBase, TableProps } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ReactElement, useMemo } from 'react';
import { DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';

interface IProps<RecordType extends object>
  extends Omit<TableProps<RecordType>, 'columns'> {
  columns: ColumnsType<RecordType>;
  onDelete?: (record: RecordType) => void | Promise<void>;
  onDetail?: (record: RecordType) => void | Promise<void>;
  onAdd?: () => void | Promise<void>;
  dataSource: Array<RecordType & { key: string }>;
}

export const Table = <RecordType extends object>({
  columns: defaultColumns,
  onDelete,
  onDetail,
  dataSource,
  onAdd,
  ...props
}: IProps<RecordType>): ReactElement => {
  const columns = useMemo(() => {
    if (!onDelete && !onDetail) {
      return defaultColumns;
    }

    return [
      ...defaultColumns,
      {
        title: 'Действия',
        render: (
          _: unknown,
          record: RecordType & {
            key: string;
          },
        ) => (
          <Space>
            {onDetail && (
              <Button
                onClick={() => {
                  void onDetail(record);
                }}
                icon={<EyeOutlined />}
              />
            )}
            {onDelete && (
              <Button
                onClick={() => {
                  void onDelete(record);
                }}
                icon={<DeleteOutlined />}
                type='primary'
                danger={true}
              />
            )}
          </Space>
        ),
      },
    ];
  }, [defaultColumns, onDelete, onDetail]);

  return (
    <>
      {onAdd && (
        <SAddWrapper>
          <Button onClick={onAdd} icon={<PlusOutlined />}>
            Добавить
          </Button>
        </SAddWrapper>
      )}
      <STableBase<RecordType>
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        dataSource={dataSource}
        columns={columns as ColumnsType<RecordType>}
        bordered={true}
      />
    </>
  );
};

const STableBase = styled(TableBase)`
  .ant-pagination {
    padding: 0 24px;
  }
` as typeof TableBase;

const SAddWrapper = styled.div`
  padding-bottom: 12px;
`;
