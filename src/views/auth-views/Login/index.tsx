import React, {useState} from "react";
import {Button, Divider, Space, Tabs, Typography} from "antd";
import styles from './login.module.css';
import LogoGradient from "@/assets/logo_gradient.png";
import LoginForm from "@/components/auth/LoginForm.tsx";
import LoginWithKeyPair from "@/components/auth/LoginWithKeyPair.tsx";
import LoginWithKeystore from "@/components/auth/LoginWithKeystore.tsx";
import LoginWithMnemonic from "@/components/auth/LoginWithMnemonic.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBrain, faFileLock, faKey, faLock, faUser} from "@fortawesome/pro-solid-svg-icons";
import {Link} from "react-router-dom";

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState('password');
  return (
    <div style={{width: '100%'}}>
      <img src={LogoGradient} alt={'u2u wallet'} className={styles.logo}/>
      <Typography.Title level={2} className={styles.title}>
        Sign In
      </Typography.Title>
      <Typography.Paragraph className={styles.description}>
        Sign in to access your U2U Wallet & digital assets...
      </Typography.Paragraph>
      <div style={{marginTop: 32}}>
        {loginMethod === 'password' && <LoginForm/>}
        {loginMethod === 'private-key' && <LoginWithKeyPair/>}
        {loginMethod === 'mnemonic' && <LoginWithMnemonic/>}
        {loginMethod === 'keystore' && <LoginWithKeystore/>}
        <Typography.Paragraph style={{marginTop: 10, color: 'var(--text-light)'}}>
          Haven't got an account yet? <Link to={'/auth/register'}>Create One</Link>
        </Typography.Paragraph>
        <Divider style={{marginTop: 64}}>
          Other login methods
        </Divider>
        <Space direction={'vertical'} style={{width: '100%'}}>
          {loginMethod !== 'password' && (
            <Button
              block
              icon={<FontAwesomeIcon icon={faLock}/>}
              onClick={() => setLoginMethod('password')}
            >
              Password
            </Button>
          )}
          {loginMethod !== 'private-key' && (
            <Button
              block
              icon={<FontAwesomeIcon icon={faKey}/>}
              onClick={() => setLoginMethod('private-key')}
            >
              Private Key
            </Button>
          )}
          {loginMethod !== 'mnemonic' && (
            <Button
              block
              icon={<FontAwesomeIcon icon={faBrain}/>}
              onClick={() => setLoginMethod('mnemonic')}
            >
              Mnemonic Phrase
            </Button>
          )}
          {loginMethod !== 'keystore' && (
            <Button
              block
              icon={<FontAwesomeIcon icon={faFileLock}/>}
              onClick={() => setLoginMethod('keystore')}
            >
              Keystore
            </Button>
          )}
        </Space>
      </div>
    </div>
  )
}
