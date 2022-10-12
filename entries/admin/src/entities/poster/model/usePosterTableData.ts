import { ColumnsType } from 'antd/es/table';
import { Schemas } from '@fuks-ru/esenin-family-client';

import { posterApi } from 'admin/entities/poster/model/posterApi';
import { IEnumOption } from 'admin/shared/ui/EditModal';
import { isoToFullDate } from 'admin/shared/lib';

interface IResult {
  columns: ColumnsType<Schemas.PosterResponse>;
  dataSource: Array<Schemas.PosterResponse & { key: string }>;
}

const getColumns = (
  pubs: IEnumOption[],
): ColumnsType<Schemas.PosterResponse> => [
  {
    title: 'Название',
    dataIndex: 'name',
  },
  {
    title: 'Дата',
    dataIndex: 'date',
    render: isoToFullDate,
  },
  {
    title: 'Бар',
    dataIndex: 'pubId',
    render: (value: string) => {
      const pub = pubs.find((item) => item.value === value);

      return pub?.label || value;
    },
  },
];

export const usePosterTableData = (pubs: IEnumOption[]): IResult => {
  const { dataSource } = posterApi.useGetListQuery(undefined, {
    selectFromResult: ({ data = [] }) => ({
      dataSource: data.map((item) => ({ ...item, key: item.id })),
    }),
  });

  return {
    columns: getColumns(pubs),
    dataSource,
  };
};
