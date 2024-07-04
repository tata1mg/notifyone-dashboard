import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Menu } from '../Menu';
import MenuList from 'src/common/appMenu/menu.json';
import { SideNav } from '../SideNav';
import { Layout } from 'antd';
import { HeaderUI } from '../HeaderUI';
import './dashboard.css';

const { Header, Content } = Layout;

const Dashboard: React.FC = () => {
  const location: any = useLocation();
  const onClickMenu = ({ key }: any) => {
    console.log(key);
  };

  const getSelectedKey = () => {
    const { pathname } = location;

    if (pathname.startsWith('/templates')) {
      const lastItem = pathname.substring(pathname.lastIndexOf('/') + 1);
      switch (lastItem) {
        case 'sms':
        case 'whatsapp':
        case 'transaction':
        case 'email':
          return 'text_only';
        default:
          return 'search';
      }
    } else if (location.pathname.startsWith('/communication/new')) {
      const lastItem = location.pathname.substring(
        location.pathname.lastIndexOf('/') + 1
      );
      let key;
      switch (lastItem) {
        case 'event':
          key = 'event';
          break;
        case 'app':
          key = 'app';
          break;
        default:
          key = 'event';
      }
      return key;
    } else if (pathname.startsWith('/communication/raven')) {
      const lastItem = pathname.substring(pathname.lastIndexOf('/') + 1);
      switch (lastItem) {
        case 'raven':
          return 'raven';
        case 'action':
          return 'create_node_action';
        case 'node':
          return 'create_node';
        default:
          return 'root_node';
      }
    }

    return '';
  };

  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className="layout-container">
      <SideNav collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout className="site-layout">
        <Header className="site-layout-background header-container">
          <HeaderUI />
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
