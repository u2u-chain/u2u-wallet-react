import React from "react";
import styles from './landing.module.css';
import {Button, Col, Row, Typography} from "antd";
import {ArrowRightOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

export default function LandingHero() {
  return <div className={styles.hero}>
    <Row>
      <Col xs={24} sm={24} md={12}>
        <div className={styles.heroTitlePromo}>
          <Typography.Text className={styles.heroTitle}>
            Supercharge your Web3 Experience
          </Typography.Text>
          <Typography.Text className={styles.heroDescription}>
            Manage all your U2U Tokens, exchange NFTs and explore many applications
          </Typography.Text>
        </div>
        <Link to={'/wallet'}>
          <Button shape={'round'} type={'primary'} size={'large'}>
            Access Your Wallet <ArrowRightOutlined/>
          </Button>
        </Link>
      </Col>
      <Col xs={24} sm={24} md={12}>
        <>
          Figure be here
        </>
      </Col>
    </Row>
  </div>
}
