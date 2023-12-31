import React from "react";
import {Card, Typography} from "antd";
import styles from './landing.module.css';

export default function LandingFeatureCard() {
  return <Card
    className={styles.featureCard}
    bordered={false}
  >
    <Typography.Text className={styles.landingFeatureTitle}>
      Connect your Wallet
    </Typography.Text>
    <Typography.Paragraph className={styles.landingFeatureDesc}>
      Take your Web3 experience to the next level with decentralized
    </Typography.Paragraph>
  </Card>
}
