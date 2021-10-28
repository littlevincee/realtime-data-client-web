import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { SideNavBar } from '../components/navBar/SideNavBar';
import { TopNavBar } from '../components/navBar/TopNavBar';
import { Routes } from '../shared/router/Routes';

export const DefaultLayout = () => {
  const { Content } = Layout;
  return (
    <div>
      <Layout>
        <TopNavBar title="Stock Data App"/>
        <Layout>
          <SideNavBar />
          <Layout  className="layout">
            <Content className="content">
              <Routes />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};