import { FC, useState } from 'react';
import { Modal } from 'antd';
import { Components } from '@difuks/esenin-family-backend/dist/lib';

import { Layout } from 'admin/widgets/Layout/Layout';
import { usePubTableData } from 'admin/entities/pub/model/usePubTableData';
import { Table } from 'admin/shared/ui/Table/Table';
import { pubApi } from 'admin/entities/pub';

export const PubPage: FC = () => {
  const { columns, dataSource } = usePubTableData();
  const [deletePub] = pubApi.useDeleteMutation();
  const [activePub, setActivePub] = useState<Components.Schemas.Pub | null>(
    null,
  );

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
      <Modal
        visible={!!activePub}
        title={activePub?.name}
        onCancel={() => setActivePub(null)}
      >
        {activePub?.id}
        {activePub?.name}
      </Modal>
    </Layout>
  );
};
