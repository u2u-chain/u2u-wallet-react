import React, {useEffect} from "react";
import styles from "./auth.module.css";
import {Outlet, useNavigate} from "react-router-dom";
import {useAppSelector} from "@/redux/store.ts";

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
        <div className={styles.authForm}>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}
