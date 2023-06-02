import React from "react";
import {Button, Layout, Menu, MenuProps, theme} from "antd";
import {LaptopOutlined, NotificationOutlined, UserOutlined} from "@ant-design/icons";
import styles from './wallet-layout.module.css';

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

export default function WalletSideBar() {
  const {token: {
    colorBgContainer
  }} = theme.useToken();
  return (
    <Layout.Sider>
      <div className={styles.siderOuter}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0, backgroundColor: colorBgContainer }}
          items={items2}
        />
        <div className={styles.userAction} style={{backgroundColor: colorBgContainer}}>
          <Button
            block
          >
            Edward Nguyen
          </Button>
        </div>
      </div>
    </Layout.Sider>
  )
}
