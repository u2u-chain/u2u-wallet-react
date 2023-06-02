import React from "react";
import styles from "./marketing.module.css";
import {Button, Dropdown, Space, Typography} from "antd";

interface MarketingNavBarProps {

}

export default function MarketingNavBar(props: MarketingNavBarProps) {
  return <div className={styles.marketingNavbar}>
    <div className={styles.marketingNavbarInner}>
      <div className={styles.logo}>
        <Typography.Text className={styles.logoText}>
          U2U Wallet
        </Typography.Text>

        <Dropdown menu={{
          items: [{
            key: 0,
            label: 'Test Net'
          }, {
            key: 1,
            label: 'Mainnet'
          }]
        }} trigger={['click']}>
          <Button type={'text'} size={'small'}>
            Test net
          </Button>
        </Dropdown>
      </div>
      <div className={styles.links}>
        <Space>
          <Button type={'text'}>
            Home
          </Button>

          <Button type={'text'}>
            About
          </Button>

          <Button type={'text'}>
            FAQs
          </Button>
        </Space>
      </div>
      <div className={styles.actions}>
        <Space>
          <Button type={'text'}>
            Access
          </Button>
          <Button type={'primary'} shape={'round'}>
            Create Wallet
          </Button>
        </Space>
      </div>
    </div>
  </div>
}
