import React from "react";
import {Menu, theme} from "antd";
import {useLocation, useNavigate} from "react-router-dom";

const routes = [{
  url: '/wallet',
  key: '/wallet',
  label: 'Home'
}, {
  url: '/wallet/assets/tokens',
  key: '/wallet/assets/tokens',
  label: 'Assets'
}, {
  url: '/wallet/history',
  key: '/wallet/history',
  label: 'History'
}, {
  url: '/wallet/keys',
  key: '/wallet/keys',
  label: 'Keys'
}, {
  url: '/wallet/tools',
  key: '/wallet/tools',
  label: 'Tools'
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
        onClick: () => navigate(route.url)
      }))}
    />
  )
}
