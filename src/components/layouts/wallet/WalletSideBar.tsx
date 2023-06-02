import React from "react";
import {Avatar, Button, Divider, Layout, Menu, MenuProps, theme, Typography} from "antd";
import styles from './wallet-layout.module.css';
import {useAppSelector} from "@/redux/store.ts";

export default function WalletSideBar() {
  const {profile} = useAppSelector(state => state.app);
  const {token: {
    colorBgContainer
  }} = theme.useToken();
  return (
    <Layout.Sider>
      <div className={styles.siderOuter}>
        <div className={styles.logoSection} style={{backgroundColor: colorBgContainer}}>
          <Typography.Text>
            U2U Wallet
          </Typography.Text>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0, backgroundColor: colorBgContainer }}
          items={[{
            key: 'home',
            label: 'Home'
          }, {
            key: 'assets',
            label: 'Assets',
          }, {
            key: 'history',
            label: 'History'
          }, {
            key: 'keys',
            label: 'Keys'
          }, {
            key: 'tools',
            label: 'Tools'
          }]}
        />
        <div className={styles.userAction} style={{backgroundColor: colorBgContainer}}>
          <Button
            block
            icon={<Avatar
              src={profile?.avatar}
              size={16}
            />}
          >
            {profile?.fullName}
          </Button>
        </div>
      </div>
    </Layout.Sider>
  )
}
