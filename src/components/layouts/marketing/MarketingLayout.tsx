import React, {ReactNode} from "react";
import {Outlet} from "react-router-dom";
import MarketingNavBar from "@/components/layouts/marketing/MarketingNavBar.tsx";
import styles from './marketing.module.css';

export default function MarketingLayout() {
  return (
    <div className={styles.marketingWrapper}>
      <MarketingNavBar/>
      <Outlet/>
    </div>
  )
}
