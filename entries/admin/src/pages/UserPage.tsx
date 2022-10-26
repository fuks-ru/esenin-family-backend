import { FC, useState } from 'react';
import { Schemas } from '@fuks-ru/auth-client';

import {
  useUserTableData,
  userApi,
  useUserFormDataTypes,
} from 'admin/entities/user';
import { Table } from 'admin/shared/ui/Table';
import { EditModal } from 'admin/shared/ui/EditModal';
import { useRoleEnumOptions } from 'admin/entities/role/model/useRoleEnumOptions';

export const UserPage: FC = () => {
  const roles = useRoleEnumOptions();
  const { columns, dataSource } = useUserTableData(roles);
  const userFormDataTypes = useUserFormDataTypes(roles);
  const [deleteUser] = userApi.useDeleteMutation();
  const [activeUser, setActiveUser] = useState<Schemas.UserResponse | null>(
    null,
  );
  const [update, updateResult] = userApi.useUpdateMutation();

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        onDelete={(record) => {
          void deleteUser(record.id);
        }}
        onDetail={(record) => {
          setActiveUser(record);
        }}
      />
      {activeUser && (
        <EditModal
          initialData={activeUser}
          title={
            activeUser.email ||
            activeUser.firstName ||
            activeUser.lastName ||
            'Редактирование пользователя'
          }
          dataTypes={userFormDataTypes}
          onSave={update}
          onClose={() => setActiveUser(null)}
          {...updateResult}
        />
      )}
    </>
  );
};
