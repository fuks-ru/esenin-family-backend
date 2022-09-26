import { FC, ReactNode } from 'react';
import { Menu, Layout as LayoutBase } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { CoffeeOutlined } from '@ant-design/icons';

const menuItems: ItemType[] = [
  {
    key: 'pub',
    icon: <CoffeeOutlined />,
    label: 'Бары',
  },
];

interface IProps {
  children: ReactNode;
}

export const Layout: FC<IProps> = ({ children }) => (
  <LayoutBase>
    <LayoutBase.Header>Esenin Family</LayoutBase.Header>
    <Menu items={menuItems} />
    {children}
  </LayoutBase>
);
