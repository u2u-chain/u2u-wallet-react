import React from "react";
import {Menu, theme} from "antd";
import {useLocation, useNavigate} from "react-router-dom";
import {HistoryOutlined, HomeOutlined, KeyOutlined, ToolOutlined, WalletOutlined} from "@ant-design/icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHistory, faHome, faKey, faWallet, faWrench} from "@fortawesome/pro-solid-svg-icons";

const routes = [{
  url: '/wallet',
  key: '/wallet',
  label: 'Home',
  icon: <FontAwesomeIcon icon={faHome}/>,
}, {
  url: '/wallet/assets/tokens',
  key: '/wallet/assets/tokens',
  label: 'Assets',
  icon: <FontAwesomeIcon icon={faWallet}/>,
}, {
  url: '/wallet/history',
  key: '/wallet/history',
  label: 'History',
  icon: <FontAwesomeIcon icon={faHistory}/>,
}, {
  url: '/wallet/keys',
  key: '/wallet/keys',
  label: 'Keys',
  icon: <FontAwesomeIcon icon={faKey}/>,
}, {
  url: '/wallet/tools',
  key: '/wallet/tools',
  label: 'Tools',
  icon: <FontAwesomeIcon icon={faWrench}/>,
}]

export const WalletMenuContent = () => {
  const {token: {
    colorBgContainer
  }} = theme.useToken();
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (key) => {
    if (key === '/wallet') {
      return location.pathname === key;
    }
    return location.pathname.startsWith(key);
  };

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      selectedKeys={[...routes.filter(route => isActive(route.key)).map(route => route.key)]}
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
