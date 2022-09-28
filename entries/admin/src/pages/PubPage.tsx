import { FC, useState } from 'react';
import { Schemas } from '@fuks-ru/esenin-family-backend';

import { Layout } from 'admin/widgets/Layout/Layout';
import { usePubTableData } from 'admin/entities/pub/model/usePubTableData';
import { Table } from 'admin/shared/ui/Table';
import { pubApi } from 'admin/entities/pub';
import { EditPub } from 'admin/features/EditPub/EditPub';

export const PubPage: FC = () => {
  const { columns, dataSource } = usePubTableData();
  const [deletePub] = pubApi.useDeleteMutation();
  const [activePub, setActivePub] = useState<Schemas.Pub | null>(null);

  return (
    <Layout>
      <Table
        columns={columns}
        dataSource={dataSource}
        onDelete={(record) => {
          void deletePub(record.id);
        }}
        onDetail={(record) => {
          setActivePub(record);
        }}
      />
      {activePub && (
        <EditPub pub={activePub} onCancel={() => setActivePub(null)} />
      )}
    </Layout>
  );
};
