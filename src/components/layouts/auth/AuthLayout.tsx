import React, {useEffect} from "react";
import styles from "./auth.module.css";
import {Outlet, useNavigate} from "react-router-dom";
import {useAppSelector} from "@/redux/store.ts";

import LogoWhite from "@/assets/logo_white.png";

export default function AuthLayout() {
  const {isLoggedIn} = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/wallet');
    }
  }, [isLoggedIn]);

  return (
    <div className={styles.authOuter}>
      <div className={styles.authFigure}>

      </div>
      <div className={styles.authSection}>
        <div className={styles.logoWrapper}>
          <img src={LogoWhite} className={styles.logo} alt={'U2U Wallet'}/>
        </div>
        <div className={styles.authForm}>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}
