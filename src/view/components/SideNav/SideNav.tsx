import React, { useEffect, useState } from 'react';
import { Menu, Layout, Typography, Col, Row, Divider } from 'antd';
import type { MenuProps } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ContactsOutlined,
  SlidersOutlined,
  RadarChartOutlined,
  SettingOutlined,
  DashboardOutlined,
  AppstoreOutlined,
  PushpinOutlined,
  ContainerOutlined,
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
const { Title } = Typography;

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
  getItem(
    'services_dashboard',
    <Link to="/vendor-hub/vendor-services-dashboard">
      Vendor Services Dashboard
    </Link>,
    <DashboardOutlined />
  ),
];

const SideNav = ({ collapsed, setCollapsed }: SideNavProps) => {
  const currentPathname = useLocation().pathname;
  const [activeMenu, setActiveMenu] = useState(['vendor_manager']);

  const highlightMenuItem = () => {
    let highlightedMenu: string[] = [''];

    switch (currentPathname) {
      case '/vendor-hub/vendor-manager/vendors':
        highlightedMenu = ['all_vendors'];
        break;

      case '/vendor-hub/polygon-manager/polygons':
        highlightedMenu = ['all_polygons'];
        break;

      case '/vendor-hub/bulk-update-manager/bulk-update':
        highlightedMenu = ['bulk_update'];
        break;

      case '/vendor-hub/vendor-services-dashboard':
        highlightedMenu = ['services_dashboard'];
        break;

      case '/vendor-hub/provent':
        highlightedMenu = ['pro_vent'];
        break;

      case '/vendor-hub/dashboards/sku-serviceability':
        highlightedMenu = ['sku_serviceability'];
        break;

      case '/vendor-hub/dashboards/vendor-data-history/commission-history':
        highlightedMenu = ['commission_history'];
        break;

      case '/vendor-hub/dashboards/allocation-history':
        highlightedMenu = ['allocation_history'];
        break;

      case '/vendor-hub/capacity':
      case '/vendor-hub/capacity/new':
        highlightedMenu = ['capacity'];
        break;

      case '/vendor-hub/rules/availability-rules':
        highlightedMenu = ['availability_rules'];
        break;

      case '/vendor-hub/rules/stockable-rules':
        highlightedMenu = ['stockable_rules'];
        break;

      default:
        break;
    }
    return highlightedMenu;
  };

  const expandedMenuItem = () => {
    let expandedMenu: string[] = [''];
    switch (currentPathname) {
      case '/vendor-hub/vendor-manager/vendors':
        expandedMenu = ['vendor_manager'];
        break;

      case '/vendor-hub/polygon-manager/polygons':
        expandedMenu = ['polygon_manager'];
        break;

      case '/vendor-hub/bulk-update-manager/bulk-update':
        expandedMenu = ['bulk_update_manager'];
        break;

      case '/vendor-hub/dashboards/sku-serviceability':
      case '/vendor-hub/dashboards/allocation-history':
        expandedMenu = ['dashboards'];
        break;

      case '/vendor-hub/dashboards/vendor-data-history/commission-history':
        expandedMenu = ['dashboards', 'vendor_data_history'];
        break;

      case '/vendor-hub/rules/availability-rules':
      case '/vendor-hub/rules/stockable-rules':
        expandedMenu = ['rules'];
        break;

      default:
        break;
    }

    return expandedMenu;
  };

  useEffect(() => {
    setActiveMenu(expandedMenuItem());
    if (
      currentPathname === '/vendor-hub/polygon-manager/polygons/create' ||
      currentPathname === '/vendor-hub/polygon-manager/polygons/edit'
    ) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
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
                  width: '128px',
                  height: '48px',
                }}
                src={onemgIcon}
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
