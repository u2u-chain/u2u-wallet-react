import React from "react";
import styles from "./marketing.module.css";
import {Button, Dropdown, Space, Typography} from "antd";
import Container from "@/components/common/Container.tsx";

interface MarketingNavBarProps {

}

export default function MarketingNavBar(props: MarketingNavBarProps) {
  return <div className={styles.marketingNavbar}>
    <Container>
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
            <Button type={'text'} href={'/auth/login'}>
              Access
            </Button>
            <Button shape={'round'} href={'/auth/register'}>
              Create Wallet
            </Button>
          </Space>
        </div>
      </div>
    </Container>
  </div>
}
