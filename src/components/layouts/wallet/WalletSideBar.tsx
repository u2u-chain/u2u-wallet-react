import React from "react";
import {Avatar, Button, theme, Typography} from "antd";
import styles from './wallet-layout.module.css';
import {useAppSelector} from "@/redux/store.ts";
import {WalletMenuContent} from "@/components/layouts/wallet/WalletMenuContent.tsx";
import LogoWhite from "@/assets/logo_white.png";

export default function WalletSideBar({collapsed} : {collapsed: boolean}) {
  const {profile} = useAppSelector(state => state.app);
  const {token: {
    colorBgContainer
  }} = theme.useToken();

  return (
    <div className={styles.siderOuter}>
      <div className={styles.logoSection} style={{backgroundColor: colorBgContainer}}>
        {
          collapsed ?
            <Typography.Text>
              U2U
            </Typography.Text>
            : <img src={LogoWhite} alt={"U2U Wallet"} className={styles.logo} />
        }

      </div>
      <WalletMenuContent/>
      <div className={styles.userAction} style={{backgroundColor: colorBgContainer}}>
        <Button
          block
          icon={<Avatar
            src={profile?.avatar}
            size={16}
          />}
        >
          {collapsed ? "" : profile?.username}
        </Button>
      </div>
    </div>
  )
}
