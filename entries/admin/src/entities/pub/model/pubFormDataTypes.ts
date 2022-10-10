import { Schemas } from '@fuks-ru/esenin-family-client';

import { IFormDataType } from 'admin/shared/ui/EditModal';

export const pubFormDataTypes: Array<IFormDataType<Schemas.Pub>> = [
  {
    dataIndex: 'name',
    field: { type: 'text' },
    label: 'Название',
  },
  {
    dataIndex: 'logo',
    label: 'Логотип',
    field: { type: 'image' },
  },
];
