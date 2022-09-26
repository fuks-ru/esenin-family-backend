import { Button, Table as TableBase, TableProps } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ReactElement, useMemo } from 'react';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';

interface IProps<RecordType extends object>
  extends Omit<TableProps<RecordType>, 'columns'> {
  columns: ColumnsType<RecordType>;
  onDelete?: (record: RecordType) => void | Promise<void>;
  onDetail?: (record: RecordType) => void | Promise<void>;
  dataSource: Array<RecordType & { key: string }>;
}

export const Table = <RecordType extends object>({
  columns: defaultColumns,
  onDelete,
  onDetail,
  dataSource,
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
          <>
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
              />
            )}
          </>
        ),
      },
    ];
  }, [defaultColumns, onDelete, onDetail]);

  return (
    <TableBase<RecordType>
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      dataSource={dataSource}
      columns={columns as ColumnsType<RecordType>}
    />
  );
};
