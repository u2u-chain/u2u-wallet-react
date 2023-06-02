import React, {useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "@/redux/store.ts";
import {Avatar, Button, Layout, Menu, MenuProps, message} from "antd";
import WalletSideBar from "@/components/layouts/wallet/WalletSideBar.tsx";
import {loadUserProfile} from "@/redux/actions/auth.actions.ts";
import WalletHeader from "@/components/layouts/wallet/WalletHeader.tsx";
import styles from "./wallet-layout.module.css";
import hederaService from "@/services/HederaService.ts";


export default function WalletLayout() {
  const {isLoggedIn, accessToken, networkAccountId, privateKey, publicKey} = useAppSelector(state => state.auth);
  const {profile} = useAppSelector(state => state.app);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/auth/login');
      return message.error('You have not logged in.');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!profile) dispatch(loadUserProfile());
  }, [profile]);

  useEffect(() => {
    if (networkAccountId && privateKey) {
      hederaService.initialize(networkAccountId, privateKey);
    }
  }, [networkAccountId, privateKey]);

  if (!profile) return <>
    Loading
  </>

  return (
    <Layout>
      <WalletSideBar/>
      <Layout>
        <WalletHeader/>
        <Layout.Content className={styles.content}>
          <Outlet/>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
