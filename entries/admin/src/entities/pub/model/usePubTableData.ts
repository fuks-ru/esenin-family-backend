import { ColumnsType } from 'antd/es/table';
import { Components } from '@difuks/esenin-family-backend';

import { pubApi } from 'admin/entities/pub';

interface IResult {
  columns: ColumnsType<Components.Schemas.Pub>;
  dataSource: Array<Components.Schemas.Pub & { key: string }>;
}

const columns: ColumnsType<Components.Schemas.Pub> = [
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
