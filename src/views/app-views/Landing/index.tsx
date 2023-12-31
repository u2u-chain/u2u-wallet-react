import React from "react";
import {Card, Col, Row, Typography} from "antd";
import Container from "@/components/common/Container.tsx";
import LandingHero from "@/views/app-views/Landing/LandingHero.tsx";
import styles from "./landing.module.css";
import SectionTitle from "@/views/app-views/Landing/SectionTitle.tsx";
import LandingFeatureCard from "@/views/app-views/Landing/LandingFeatureCard.tsx";

export default function LandingPage() {
  return (
    <div className={styles.wrapper}>
      <Container>
        <LandingHero/>
        <div className={styles.poweredLine}>
          <Typography.Text className={styles.poweredLineText}>
            POWERED BY AMAZING TECHNOLOGY
          </Typography.Text>
          <div className={styles.technology}>
            <img src={'https://uniultra.xyz/uploads/logo-U2U.png'} alt={'Hedera'} className={styles.technologyIcon}/>
          </div>
        </div>
        <SectionTitle title={'Features'}/>
        <Row gutter={32}>
          <Col xs={24} sm={24} md={12}>
            <LandingFeatureCard/>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <LandingFeatureCard/>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <LandingFeatureCard/>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <LandingFeatureCard/>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
