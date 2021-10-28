import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { iconFontUrl } from '../../shared/configurations';

const IconFont = createFromIconfontCN({
  scriptUrl: iconFontUrl,
});

type TopNavBarProps = {
  title: string
}

export const TopNavBar = React.memo<TopNavBarProps>(({ title }) => {
  const { Header } = Layout;

  return (
    <>
      <Header>
        <div className="title-container">
          <h3>{title}</h3>
        </div>
        <Menu theme="dark" mode="horizontal" className="menu" onDeselect={(event) => event.selectedKeys.splice(0)}>
          <Menu.Item className="menu-item" key='profile' icon={<IconFont type="icon-profile" className="icon-font"/>} />
        </Menu>
      </Header>
    </>
  );
});