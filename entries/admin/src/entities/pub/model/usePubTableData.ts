import { ColumnsType } from 'antd/es/table';
import { Schemas } from '@fuks-ru/esenin-family-client';

import { pubApi } from 'admin/entities/pub/model/pubApi';

interface IResult {
  columns: ColumnsType<Schemas.Pub>;
  dataSource: Array<Schemas.Pub & { key: string }>;
}

const columns: ColumnsType<Schemas.Pub> = [
  {
    title: 'Название',
    dataIndex: 'name',
  },
];

export const usePubTableData = (): IResult => {
  const { dataSource } = pubApi.useGetListQuery(undefined, {
    selectFromResult: ({ data = [] }) => ({
      dataSource: data.map((item) => ({ ...item, key: item.id })),
    }),
  });

  return {
    columns,
    dataSource,
  };
};
