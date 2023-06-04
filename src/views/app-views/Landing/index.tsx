import React from "react";
import {Typography} from "antd";
import Container from "@/components/common/Container.tsx";
import LandingHero from "@/views/app-views/Landing/LandingHero.tsx";
import styles from "./landing.module.css";

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
            <img src={'https://s2.coinmarketcap.com/static/img/coins/64x64/4642.png'} alt={'Hedera'} className={styles.technologyIcon}/>
            <Typography.Text className={styles.technologyName}>
              Hedera Hashgraph
            </Typography.Text>
          </div>
        </div>
      </Container>
    </div>
  )
}
