import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SideNav } from '../SideNav';
import { Layout } from 'antd';
import { HeaderUI } from '../HeaderUI';
import './dashboard.css';

const { Header, Content } = Layout;

const Dashboard: React.FC = () => {
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
