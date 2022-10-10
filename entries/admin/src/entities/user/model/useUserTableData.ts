import { ColumnsType } from 'antd/es/table';
import { Schemas } from '@fuks-ru/auth-client';

import { userApi } from 'admin/entities/user/model/userApi';
import { IEnumOption } from 'admin/shared/ui/EditModal';

interface IResult {
  columns: ColumnsType<Schemas.UserResponse>;
  dataSource: Array<Schemas.UserResponse & { key: string }>;
}

const columns: ColumnsType<Schemas.UserResponse> = [
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Роль',
    dataIndex: 'role',
  },
];

export const useUserTableData = (roles: IEnumOption[]): IResult => {
  const { data = [] } = userApi.useGetListQuery();

  const dataSource = data.map((item) => {
    const roleValue = item.role;

    const roleName = roles.find((role) => role.value === roleValue);

    return { ...item, role: roleName?.label || roleValue, key: item.id };
  });

  return {
    columns,
    dataSource,
  };
};
