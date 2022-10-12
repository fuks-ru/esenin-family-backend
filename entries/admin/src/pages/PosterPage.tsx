import { FC, useState } from 'react';
import { Schemas } from '@fuks-ru/esenin-family-client';

import {
  usePosterTableData,
  posterApi,
  usePosterFormDataTypes,
} from 'admin/entities/poster';
import { Table } from 'admin/shared/ui/Table';
import { EditModal } from 'admin/shared/ui/EditModal';
import { usePubEnumOptions } from 'admin/entities/pub';

export const PosterPage: FC = () => {
  const pubsOptions = usePubEnumOptions();
  const { columns, dataSource } = usePosterTableData(pubsOptions);
  const formDataTypes = usePosterFormDataTypes(pubsOptions);
  const [deletePoster] = posterApi.useDeleteMutation();
  const [activePoster, setActivePoster] =
    useState<Schemas.PosterResponse | null>(null);
  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
  const [update, updateResult] = posterApi.useUpdateMutation();
  const [add, addResult] = posterApi.useAddMutation();

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        onDelete={(record) => {
          void deletePoster(record.id);
        }}
        onDetail={(record) => {
          setActivePoster(record);
        }}
        onAdd={() => {
          setIsOpenAdd(true);
        }}
      />
      {activePoster && (
        <EditModal
          initialData={activePoster}
          title={activePoster.name}
          dataTypes={formDataTypes}
          onSave={update}
          onClose={() => setActivePoster(null)}
          {...updateResult}
        />
      )}
      {isOpenAdd && (
        <EditModal
          title='Добавление афиши'
          dataTypes={formDataTypes}
          onSave={add}
          onClose={() => setIsOpenAdd(false)}
          {...addResult}
        />
      )}
    </>
  );
};
