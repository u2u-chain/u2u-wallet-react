import React from "react";
import styles from "@/styles/Setting.module.css";
import {Card, Menu, Typography} from "antd";
import {Link, Outlet, useLocation} from "react-router-dom";


export default function AssetsLayout() {

  const location = useLocation();

  return (
    <>
      <Card className={styles.pageHeaderCard}>
        <div className={styles.pageTitle}>
          Assets
        </div>
        <Typography.Paragraph>
          Take control of your assets...
        </Typography.Paragraph>
      </Card>
      <Menu
        mode={'horizontal'}
        rootClassName={styles.tabsContainer}
        defaultSelectedKeys={[location.pathname]}
        items={[{
          key: '/wallet/assets/tokens',
          label: <Link to={'/wallet/assets/tokens'}>
            Tokens
          </Link>,
        }, {
          key: '/wallet/assets/collectibles',
          label: <Link to={'/wallet/assets/collectibles'}>
            Collectibles
          </Link>,
        }]}
      />
      <div style={{marginTop: 16}}>
        <Outlet />
      </div>
    </>
  )
}
