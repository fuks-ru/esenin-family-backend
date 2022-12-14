import { roleApi } from 'admin/entities/role/model/roleApi';
import { IEnumOption } from 'admin/shared/ui/EditModal';

export const useRoleEnumOptions = (): IEnumOption[] => {
  const { options } = roleApi.useGetListQuery(undefined, {
    selectFromResult: ({ data = [] }) => ({
      options: data.map((item) => ({
        label: item.name,
        value: item.id,
      })),
    }),
  });

  return options;
};
