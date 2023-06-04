import React from "react";
import {Menu, theme} from "antd";
import {useLocation, useNavigate} from "react-router-dom";
import {HistoryOutlined, HomeOutlined, KeyOutlined, ToolOutlined, WalletOutlined} from "@ant-design/icons";

const routes = [{
  url: '/wallet',
  key: '/wallet',
  label: 'Home',
  icon: <HomeOutlined/>,
}, {
  url: '/wallet/assets/tokens',
  key: '/wallet/assets/tokens',
  label: 'Assets',
  icon: <WalletOutlined/>,
}, {
  url: '/wallet/history',
  key: '/wallet/history',
  label: 'History',
  icon: <HistoryOutlined/>,
}, {
  url: '/wallet/keys',
  key: '/wallet/keys',
  label: 'Keys',
  icon: <KeyOutlined/>,
}, {
  url: '/wallet/tools',
  key: '/wallet/tools',
  label: 'Tools',
  icon: <ToolOutlined/>,
}]

export const WalletMenuContent = () => {
  const {token: {
    colorBgContainer
  }} = theme.useToken();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      selectedKeys={[location.pathname]}
      style={{ height: '100%', borderRight: 0, backgroundColor: colorBgContainer }}
      items={routes.map(route => ({
        key: route.key,
        label: route.label,
        icon: route.icon,
        onClick: () => navigate(route.url)
      }))}
    />
  )
}
