import { FC } from 'react';

import { pubApi } from 'admin/entities/pub';
import { Layout } from 'admin/widgets/Layout';

export const PubPage: FC = () => {
  const { data: pubs } = pubApi.useGetListQuery();

  return (
    <Layout>
      {pubs?.map((pub) => (
        <div key={pub.id}>{pub.name}</div>
      ))}
    </Layout>
  );
};
