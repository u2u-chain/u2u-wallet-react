import React, {useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {useAppSelector} from "@/redux/store.ts";
import {Layout, Menu, MenuProps, message} from "antd";
import WalletSideBar from "@/components/layouts/wallet/WalletSideBar.tsx";
import {LaptopOutlined, NotificationOutlined, UserOutlined} from "@ant-design/icons";

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));


export default function WalletLayout() {
  const {isLoggedIn} = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/auth/login');
      return message.error('You have not logged in.');
    }
  }, [isLoggedIn]);

  return (
    <Layout>
      <WalletSideBar/>
      <Layout>
        <Outlet/>
      </Layout>
    </Layout>
  )
}
