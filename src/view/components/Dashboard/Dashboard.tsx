import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Menu } from '../Menu';
import MenuList from 'src/common/appMenu/menu.json';

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
  return (
    <div>
      <Menu
        className="!bg-app-theme communication-top-menu"
        data-testid="communication-top-menu"
        menuList={MenuList}
        mode="horizontal"
        onClick={onClickMenu}
        selectedKeys={[getSelectedKey()]}
        textTheme={'!text-white hover:!text-app-theme'}
        theme="dark"
      />
      <Outlet />
    </div>
  );
};

export const DashboardComponent = Dashboard;

export default Dashboard;
