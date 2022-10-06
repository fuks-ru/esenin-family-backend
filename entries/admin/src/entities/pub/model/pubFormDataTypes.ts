import { Schemas } from '@fuks-ru/esenin-family-client';

import { IFormDataType } from 'admin/shared/ui/EditModal';

export const pubFormDataTypes: Array<IFormDataType<Schemas.Pub>> = [
  {
    dataIndex: 'name',
    type: 'text',
    label: 'Название',
  },
  {
    dataIndex: 'logo',
    label: 'Логотип',
    type: 'image',
  },
];
