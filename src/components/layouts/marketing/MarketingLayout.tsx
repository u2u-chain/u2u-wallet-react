import React, {ReactNode} from "react";
import {Outlet} from "react-router-dom";
import MarketingNavBar from "@/components/layouts/marketing/MarketingNavBar.tsx";
import styles from './marketing.module.css';
import MarketingFooter from "@/components/layouts/marketing/MarketingFooter.tsx";
import Container from "@/components/common/Container.tsx";

export default function MarketingLayout() {
  return (
    <div className={styles.marketingWrapper}>
      <MarketingNavBar/>
      <Outlet/>

      <MarketingFooter/>
    </div>
  )
}
