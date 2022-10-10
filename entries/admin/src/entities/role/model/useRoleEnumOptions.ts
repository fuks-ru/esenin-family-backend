import { useMemo } from 'react';

import { roleApi } from 'admin/entities/role/model/roleApi';
import { IEnumOption } from 'admin/shared/ui/EditModal';

export const useRoleEnumOptions = (): IEnumOption[] => {
  const { data } = roleApi.useGetListQuery();

  return useMemo(
    () =>
      data?.map((item) => ({
        label: item.name,
        value: item.id,
      })) || [],
    [data],
  );
};
