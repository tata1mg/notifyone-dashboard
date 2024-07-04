import React, { useEffect, useState } from 'react';
import { Menu, Layout, Col, Row, Divider } from 'antd';
import type { MenuProps } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  FileTextOutlined,
  WhatsAppOutlined,
  NotificationOutlined,
  Html5Outlined,
  MailOutlined,
  PlusOutlined,
  FormOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';

import './sideNav.css';
import onemgIcon from 'src/assets/image/logo.png';
import { Link, useLocation } from 'react-router-dom';
import { SIDER_WIDTH } from 'src/common/constants';

type MenuItem = Required<MenuProps>['items'][number];
interface SideNavProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const { Sider } = Layout;

const getItem = (
  key: React.Key,
  label: React.ReactNode,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
};

const menuItems = [
  getItem('text_only', 'Text Only', <FileTextOutlined />, [
    getItem('sms', <Link to="/templates/sms">SMS</Link>, <MessageOutlined />),
    getItem(
      'whatsapp',
      <Link to="/templates/whatsapp">Whatsapp</Link>,
      <WhatsAppOutlined />
    ),
    getItem(
      'transaction',
      <Link to="/templates/transaction">Transactional Push Notification</Link>,
      <NotificationOutlined />
    ),
  ]),
  getItem('html_based', 'HTML Based', <Html5Outlined />, [
    getItem(
      'email',
      <Link to="/templates/email">Email</Link>,
      <MailOutlined />
    ),
  ]),
  getItem('create', 'Create', <PlusOutlined />, [
    getItem(
      'event',
      <Link to="/new/event">Event Creation</Link>,
      <FormOutlined />
    ),
    getItem(
      'app',
      <Link to="/new/app">App Creation</Link>,
      <AppstoreOutlined />
    ),
  ]),
];

const SideNav = ({ collapsed, setCollapsed }: SideNavProps) => {
  const currentPathname = useLocation().pathname;
  const [activeMenu, setActiveMenu] = useState(['sms']);

  const highlightMenuItem = () => {
    let highlightedMenu: string[] = [''];

    switch (currentPathname) {
      case '/templates/sms':
        highlightedMenu = ['sms'];
        break;

      case '/templates/whatsapp':
        highlightedMenu = ['whatsapp'];
        break;

      case '/templates/transaction':
        highlightedMenu = ['transaction'];
        break;

      case '/templates/email':
        highlightedMenu = ['email'];
        break;

      case '/new/event':
        highlightedMenu = ['event'];
        break;

      case '/new/app':
        highlightedMenu = ['app'];
        break;

      default:
        break;
    }
    return highlightedMenu;
  };

  const expandedMenuItem = () => {
    let expandedMenu: string[] = [''];
    switch (currentPathname) {
      case '/templates/sms':
      case '/templates/whatsapp':
      case '/templates/transaction':
        expandedMenu = ['text_only'];
        break;

      case '/templates/email':
        expandedMenu = ['html_based'];
        break;

      case '/new/event':
      case '/new/app':
        expandedMenu = ['create'];
        break;
      default:
        break;
    }

    return expandedMenu;
  };

  //   useEffect(() => {
  //     setActiveMenu(expandedMenuItem());
  //     if (
  //       currentPathname === '/vendor-hub/polygon-manager/polygons/create' ||
  //       currentPathname === '/vendor-hub/polygon-manager/polygons/edit'
  //     ) {
  //       setCollapsed(true);
  //     } else {
  //       setCollapsed(false);
  //     }
  //   }, [currentPathname]);

  useEffect(() => {
    if (collapsed) {
      setActiveMenu(['']);
    } else {
      setActiveMenu(expandedMenuItem());
    }
  }, [collapsed]);

  const onMenuChangeHandler = (openKeys: string[]) => {
    setActiveMenu(openKeys);
  };

  return (
    <Sider
      trigger={null}
      collapsible
      reverseArrow={true}
      collapsed={collapsed}
      theme="light"
      width={SIDER_WIDTH}
    >
      <Row
        align="middle"
        justify="center"
        className={
          collapsed
            ? 'sider-row-wrapper'
            : 'sider-row-wrapper sider-row-wrapper-padding'
        }
      >
        <Col flex="20px">
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger sider-row-collapse-icon',
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Col>
        {!collapsed && (
          <Col flex="auto">
            <div
              style={{
                margin: '16px',
              }}
            >
              <img
                style={{
                  background: 'rgba(255, 255, 255, 0.3)',
                  width: '8rem',
                  height: '4rem',
                }}
                src={onemgIcon}
                alt="1mg Icon"
              />
            </div>
          </Col>
        )}
      </Row>

      <Divider style={{ margin: 8 }} />

      <Menu
        defaultSelectedKeys={highlightMenuItem()}
        selectedKeys={highlightMenuItem()}
        onOpenChange={onMenuChangeHandler}
        openKeys={activeMenu}
        mode="inline"
        style={{ width: '100%' }}
        inlineCollapsed={collapsed}
        items={menuItems}
      />
    </Sider>
  );
};

export default SideNav;
