import React, {useEffect} from "react";
import {Button, Form, Input, message, Tabs, Typography} from "antd";
import styles from './login.module.css';
import ApiService from "@/services/ApiService.ts";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "@/redux/store.ts";
import {doSignIn} from "@/redux/actions/auth.actions.ts";
import LogoWhite from "@/assets/logo_white.png";
import LoginForm from "@/components/auth/LoginForm.tsx";
import LoginWithKeyPair from "@/components/auth/LoginWithKeyPair.tsx";

export default function LoginPage() {

  return (
    <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
      <img src={LogoWhite} alt={'u2u wallet'} className={styles.logo}/>
      <Typography.Title level={2} className={styles.title}>
        Sign In
      </Typography.Title>
      <Typography.Paragraph className={styles.description}>
        Sign in to access your U2U Wallet & digital assets...
      </Typography.Paragraph>
      <Tabs
        items={[{
          key: 'password',
          label: 'Account',
          children: <LoginForm/>
        }, {
          key: 'key-pairs',
          label: 'Key Pair',
          children: <LoginWithKeyPair/>
        }]}
      />
    </div>
  )
}
