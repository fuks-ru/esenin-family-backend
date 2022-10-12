import { IEnumOption } from 'admin/shared/ui/EditModal';
import { pubApi } from 'admin/entities/pub/model/pubApi';

export const usePubEnumOptions = (): IEnumOption[] => {
  const { options } = pubApi.useGetListQuery(undefined, {
    selectFromResult: ({ data = [] }) => ({
      options: data.map((item) => ({
        label: item.name,
        value: item.id,
      })),
    }),
  });

  return options;
};
