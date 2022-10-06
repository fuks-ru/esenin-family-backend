import { FC, useState } from 'react';
import { Schemas } from '@fuks-ru/esenin-family-client';

import { usePubTableData } from 'admin/entities/pub/model/usePubTableData';
import { Table } from 'admin/shared/ui/Table';
import { pubApi, pubFormDataTypes } from 'admin/entities/pub';
import { EditModal } from 'admin/shared/ui/EditModal';

export const PubPage: FC = () => {
  const { columns, dataSource } = usePubTableData();
  const [deletePub] = pubApi.useDeleteMutation();
  const [activePub, setActivePub] = useState<Schemas.Pub | null>(null);
  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
  const [update, updateResult] = pubApi.useUpdateMutation();
  const [add, addResult] = pubApi.useAddMutation();

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        onDelete={(record) => {
          void deletePub(record.id);
        }}
        onDetail={(record) => {
          setActivePub(record);
        }}
        onAdd={() => {
          setIsOpenAdd(true);
        }}
      />
      {activePub && (
        <EditModal
          initialData={activePub}
          title={activePub.name}
          dataTypes={pubFormDataTypes}
          onSave={update}
          onClose={() => setActivePub(null)}
          {...updateResult}
        />
      )}
      {isOpenAdd && (
        <EditModal
          title='Добавление бара'
          dataTypes={pubFormDataTypes}
          onSave={add}
          onClose={() => setIsOpenAdd(false)}
          {...addResult}
        />
      )}
    </>
  );
};
