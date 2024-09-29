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
  AlignRightOutlined,
  MailOutlined,
  AppstoreOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  FileAddOutlined,
  AppstoreAddOutlined,
  SettingOutlined,
  InteractionOutlined,
  OrderedListOutlined,
  CodeSandboxOutlined,
} from '@ant-design/icons';

import './sideNav.css';
import { logo } from 'src/assets/image';
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
  getItem('home', <Link to="/home">Home</Link>, <HomeOutlined />),
  getItem(
    'providers',
    <Link to="/providers">Providers</Link>,
    <UnorderedListOutlined />
  ),
  getItem('events', 'Events', <FileTextOutlined />, [
    getItem(
      'templates',
      <Link to="/templates">Templates</Link>,
      <AlignRightOutlined />,
      [
        getItem(
          'email',
          <Link to="/templates/email">Email</Link>,
          <MailOutlined />
        ),
        getItem(
          'sms',
          <Link to="/templates/sms">SMS</Link>,
          <MessageOutlined />
        ),
        getItem(
          'whatsapp',
          <Link to="/templates/whatsapp">Whatsapp</Link>,
          <WhatsAppOutlined />
        ),
        getItem(
          'transaction',
          <Link to="/templates/transaction">Push</Link>,
          <NotificationOutlined />
        ),
      ]
    ),
    getItem(
      'create_event',
      <Link to="/new/event">New Event</Link>,
      <FileAddOutlined />
    ),
  ]),
  getItem('tenants', 'Tenants', <AppstoreOutlined />, [
    getItem(
      'apps',
      <Link to="/apps">Apps List</Link>,
      <UnorderedListOutlined />
    ),
    getItem(
      'create_app',
      <Link to="/apps/new">App Creation</Link>,
      <AppstoreAddOutlined />
    ),
  ]),
  getItem(
    'activity',
    <Link to="/activity">Activity Feed</Link>,
    <InteractionOutlined />
  ),
  getItem('settings', 'Settings', <SettingOutlined />, [
    getItem(
      'priority',
      <Link to="/priority">Providers Priority</Link>,
      <OrderedListOutlined />
    ),
    getItem(
      'dynamic_priority',
      <Link to="/priority/dynamic">Dynamic Priority</Link>,
      <CodeSandboxOutlined />
    ),
  ]),
];

const SideNav = ({ collapsed, setCollapsed }: SideNavProps) => {
  const currentPathname = useLocation().pathname;
  const [activeMenu, setActiveMenu] = useState(['sms']);

  const highlightMenuItem = () => {
    let highlightedMenu: string[] = [''];

    switch (currentPathname) {
      case '/home':
        highlightedMenu = ['home'];
        break;
      case '/providers':
        highlightedMenu = ['providers'];
        break;

      case '/templates':
        highlightedMenu = ['templates'];
        break;

      case '/templates/sms':
        highlightedMenu = ['templates', 'sms'];
        break;

      case '/templates/whatsapp':
        highlightedMenu = ['templates', 'whatsapp'];
        break;

      case '/templates/transaction':
        highlightedMenu = ['templates', 'transaction'];
        break;

      case '/templates/email':
        highlightedMenu = ['templates', 'email'];
        break;

      case '/new/event':
        highlightedMenu = ['create_event'];
        break;

      case '/apps':
        highlightedMenu = ['apps'];
        break;

      case '/apps/new':
        highlightedMenu = ['create_app'];
        break;

      case '/activity':
        highlightedMenu = ['activity'];
        break;

      case '/priority':
        highlightedMenu = ['priority'];
        break;

      case '/priority/dynamic':
        highlightedMenu = ['dynamic_priority'];
        break;

      default:
        break;
    }
    return highlightedMenu;
  };

  const expandedMenuItem = () => {
    let expandedMenu = [''];
    switch (currentPathname) {
      case '/templates':
        expandedMenu = ['events'];
        break;
      case '/templates/email':
      case '/templates/sms':
      case '/templates/whatsapp':
      case '/templates/transaction':
        expandedMenu = ['events', 'templates'];
        break;

      case '/new/event':
        expandedMenu = ['events'];
        break;

      case '/apps':
      case '/apps/new':
        expandedMenu = ['tenants'];
        break;

      case '/priority':
      case '/priority/dynamic':
        expandedMenu = ['settings'];
        break;
      default:
        break;
    }
    return expandedMenu;
  };

  useEffect(() => {
    setActiveMenu(expandedMenuItem());
  }, [currentPathname]);

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
                  height: '2.5rem',
                }}
                src={logo}
                alt="1mg Icon"
              />
            </div>
          </Col>
        )}
      </Row>

      <Divider style={{ margin: 0 }} />

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
