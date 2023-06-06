import React, {useEffect} from "react";
import styles from "./auth.module.css";
import {Outlet, useNavigate} from "react-router-dom";
import {useAppSelector} from "@/redux/store.ts";
import BgConnect from "@/assets/images/bg-connect.svg";

import LogoWhite from "@/assets/logo_white.png";
import {Typography} from "antd";

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
      <div className={styles.authFigure} style={{
        backgroundImage: `url(${BgConnect})`
      }}>
        <div className={styles.authFigureContent}>
          <Typography.Title>
            Send & Receive U2U
          </Typography.Title>
          <Typography.Paragraph>
            All your assets in your pocket, decentralized, secure.
          </Typography.Paragraph>
        </div>
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
