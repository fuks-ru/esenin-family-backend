import { Schemas } from '@fuks-ru/auth-client';
import { useMemo } from 'react';

import { IEnumOption, IFormDataType } from 'admin/shared/ui/EditModal';

export const useUserFormDataTypes = (
  roles: IEnumOption[],
): Array<IFormDataType<Schemas.UserResponse>> =>
  useMemo(
    () => [
      {
        dataIndex: 'email',
        field: { type: 'text' },
        label: 'Email',
      },
      {
        dataIndex: 'role',
        label: 'Роль',
        field: { type: 'enum', options: roles },
      },
    ],
    [roles],
  );
