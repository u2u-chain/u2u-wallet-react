import React from "react";
import styles from "@/components/layouts/wallet/wallet-layout.module.css";
import {Avatar, Button, Dropdown} from "antd";
import {MenuUnfoldOutlined} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "@/redux/store.ts";
import {doSignOut} from "@/redux/actions/auth.actions.ts";

export default function WalletHeader() {
  const {profile} = useAppSelector(state => state.app);
  const dispatch = useAppDispatch();

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
            label: 'Sign Out',
            onClick: () => {
              dispatch(doSignOut());
            }
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
