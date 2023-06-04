import React from "react";
import {Divider, Space, Typography} from "antd";
import Container from "@/components/common/Container.tsx";
import styles from './marketing.module.css';
import {Link} from "react-router-dom";

export default function MarketingFooter() {
  return <div className={styles.footerWrapper}>
    <Container>
      <Divider/>
      <div className={styles.meta}>
        <Typography.Text>
          © 2023 U2U Wallet, All Rights reserved.
        </Typography.Text>
        <div className={styles.links}>
          <Space>
            <Link to={'/terms-of-use'}>
              Terms of Use
            </Link>

            <Link to={'/privacy-policy'}>
              Privacy Policy
            </Link>

            <Link to={'/auth/login'}>
              Sign In
            </Link>
            <Link to={'/auth/register'}>
              Sign Up
            </Link>
          </Space>
        </div>
      </div>
    </Container>
  </div>
}
