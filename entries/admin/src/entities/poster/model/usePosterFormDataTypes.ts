import { Schemas } from '@fuks-ru/esenin-family-client';
import { useMemo } from 'react';

import { IEnumOption, IFormDataType } from 'admin/shared/ui/EditModal';

export const usePosterFormDataTypes = (
  pubs: IEnumOption[],
): Array<IFormDataType<Schemas.PosterResponse>> =>
  useMemo(
    () => [
      {
        dataIndex: 'name',
        field: { type: 'text' },
        label: 'Название',
      },
      {
        dataIndex: 'image',
        label: 'Изображение',
        field: { type: 'image' },
      },
      {
        dataIndex: 'pubId',
        label: 'Бар',
        field: { type: 'enum', options: pubs },
      },
      {
        dataIndex: 'date',
        label: 'Дата',
        field: { type: 'date' },
      },
      {
        dataIndex: 'description',
        label: 'Описание',
        field: { type: 'textarea' },
      },
    ],
    [pubs],
  );
