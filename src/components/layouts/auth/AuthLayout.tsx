import React from "react";
import styles from "./auth.module.css";
import {Outlet} from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className={styles.authOuter}>
      <div className={styles.authFigure}>

      </div>
      <div className={styles.authSection}>
        <div className={styles.authForm}>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}
