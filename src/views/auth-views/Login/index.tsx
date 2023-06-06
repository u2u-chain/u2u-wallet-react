import React from "react";
import {Tabs, Typography} from "antd";
import styles from './login.module.css';
import LogoGradient from "@/assets/logo_gradient.png";
import LoginForm from "@/components/auth/LoginForm.tsx";
import LoginWithKeyPair from "@/components/auth/LoginWithKeyPair.tsx";
import LoginWithKeystore from "@/components/auth/LoginWithKeystore.tsx";
import LoginWithMnemonic from "@/components/auth/LoginWithMnemonic.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBrain, faFileLock, faKey, faUser} from "@fortawesome/pro-solid-svg-icons";
import {Link} from "react-router-dom";

export default function LoginPage() {

  return (
    <div style={{width: '100%'}}>
      <img src={LogoGradient} alt={'u2u wallet'} className={styles.logo}/>
      <Typography.Title level={2} className={styles.title}>
        Sign In
      </Typography.Title>
      <Typography.Paragraph className={styles.description}>
        Sign in to access your U2U Wallet & digital assets...
      </Typography.Paragraph>
      <div>
        <Tabs
          items={[{
            key: 'password',
            label: <>
              <FontAwesomeIcon icon={faUser}/> Account
            </>,
            children: <LoginForm/>
          }, {
            key: 'key-pairs',
            label: <>
              <FontAwesomeIcon icon={faKey}/> Private Key
            </>,
            children: <LoginWithKeyPair/>
          }, {
            key: 'mnemonic',
            label: <>
              <FontAwesomeIcon icon={faBrain}/> Mnemonic Phrase
            </>,
            children: <LoginWithMnemonic/>
          }, {
            key: 'keystore',
            label: <>
              <FontAwesomeIcon icon={faFileLock}/> Keystore
            </>,
            children: <LoginWithKeystore/>
          }]}
        />
        <Typography.Paragraph style={{marginTop: 10, color: 'var(--text-light)'}}>
          Haven't got an account yet? <Link to={'/auth/register'}>Create One</Link>
        </Typography.Paragraph>
      </div>
    </div>
  )
}
