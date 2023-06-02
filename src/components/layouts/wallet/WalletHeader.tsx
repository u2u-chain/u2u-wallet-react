import React from "react";
import styles from "@/components/layouts/wallet/wallet-layout.module.css";
import {Avatar, Button, Dropdown} from "antd";
import {MenuUnfoldOutlined} from "@ant-design/icons";
import {useAppSelector} from "@/redux/store.ts";

export default function WalletHeader() {
  const {profile} = useAppSelector(state => state.app);
  return (
    <div className={styles.header}>
      <Button type={'text'} size={'large'}>
        <MenuUnfoldOutlined/>
      </Button>
      <Dropdown
        menu={{
          items: [{
            key: 'wallet',
            label: 'My Wallet'
          }, {
            type: 'divider'
          },{
            key: 'logout',
            label: 'Sign Out'
          }]
        }}
        placement="bottomRight"
      >
        <a>
          <Avatar src={profile?.avatar}/>
        </a>
      </Dropdown>
    </div>
  )
}
