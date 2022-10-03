import { FC, ReactNode } from 'react';
import { Menu, Layout as LayoutBase, Space } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { CoffeeOutlined, CopyOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

import { GlobalStyle } from 'admin/shared/ui/GlobalStyles';
import EseninLogo from 'admin/widgets/Layout/imgs/esenin.svg';
import { routes } from 'admin/shared/config';

const { Content, Sider } = LayoutBase;

const menuItems: Array<ItemType & { route: string; key: string }> = [
  {
    key: 'pubs',
    icon: <CoffeeOutlined />,
    label: <Link to={routes.pubs}>Бары</Link>,
    route: routes.pubs,
  },
  {
    key: 'posters',
    icon: <CopyOutlined />,
    label: <Link to={routes.posters}>Афиша</Link>,
    route: routes.posters,
  },
];

interface IProps {
  children: ReactNode;
}

export const Layout: FC<IProps> = ({ children }) => {
  const { pathname } = useLocation();
  const activeMenuItem = menuItems.find((item) => item.route === pathname);
  const selectedKeys = activeMenuItem ? [activeMenuItem.key] : [];

  return (
    <>
      <GlobalStyle />
      <SLayout>
        <Sider>
          <SLogoWrapper align='center'>
            <SLogo />
            <SLogoText>Esenin Family</SLogoText>
          </SLogoWrapper>
          <Menu theme='dark' selectedKeys={selectedKeys} items={menuItems} />
        </Sider>
        <LayoutBase>
          <SContentWrapper>
            <SContent>{children}</SContent>
          </SContentWrapper>
        </LayoutBase>
      </SLayout>
    </>
  );
};

const SLayout = styled(LayoutBase)`
  height: 100%;
`;

const SContentWrapper = styled(LayoutBase)`
  padding: 24px;
`;

const SContent = styled(Content)`
  background: #ffffff;
`;

const SLogo = styled(EseninLogo)`
  width: 64px;
  height: 64px;
`;

const SLogoWrapper = styled(Space)`
  padding: 8px;
`;

const SLogoText = styled.span`
  color: #ffffff;
  font-size: 16px;
`;
