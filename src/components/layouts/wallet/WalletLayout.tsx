import React, {useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "@/redux/store.ts";
import {Layout, Menu, MenuProps, message} from "antd";
import WalletSideBar from "@/components/layouts/wallet/WalletSideBar.tsx";
import {LaptopOutlined, NotificationOutlined, UserOutlined} from "@ant-design/icons";
import {loadUserProfile} from "@/redux/actions/auth.actions.ts";

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));


export default function WalletLayout() {
  const {isLoggedIn, accessToken} = useAppSelector(state => state.auth);
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
    console.log('profile', profile)
    console.log(accessToken);
    if (!profile) dispatch(loadUserProfile());
  }, [profile]);

  if (!profile) return <>
    Loading
  </>

  return (
    <Layout>
      <WalletSideBar/>
      <Layout>
        <Outlet/>
      </Layout>
    </Layout>
  )
}
