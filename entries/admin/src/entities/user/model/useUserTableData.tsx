import { ColumnsType } from 'antd/es/table';
import { Schemas } from '@fuks-ru/auth-client';

import { userApi } from 'admin/entities/user/model/userApi';
import { IEnumOption } from 'admin/shared/ui/EditModal';

interface IResult {
  columns: ColumnsType<Schemas.UserResponse>;
  dataSource: Array<Schemas.UserResponse & { key: string }>;
}

const getColumns = (
  roles: IEnumOption[],
): ColumnsType<Schemas.UserResponse> => [
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Роль',
    dataIndex: 'role',
    render: (value: string) => {
      const role = roles.find((item) => item.value === value);

      return role?.label || value;
    },
  },
];

export const useUserTableData = (roles: IEnumOption[]): IResult => {
  const { dataSource } = userApi.useGetListQuery(undefined, {
    selectFromResult: ({ data = [] }) => ({
      dataSource: data.map((item) => ({ ...item, key: item.id })),
    }),
  });

  return {
    columns: getColumns(roles),
    dataSource,
  };
};
