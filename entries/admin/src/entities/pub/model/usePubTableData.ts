import { ColumnsType } from 'antd/es/table';
import { Schemas } from '@fuks-ru/esenin-family-backend';

import { pubApi } from 'admin/entities/pub';

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
  const { data = [] } = pubApi.useGetListQuery();

  const dataSource = data.map((item) => ({ ...item, key: item.id }));

  return {
    columns,
    dataSource,
  };
};
