import React from "react";
import styles from "@/components/layouts/wallet/wallet-layout.module.css";
import {Avatar, Button, Dropdown, Select, Space} from "antd";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "@/redux/store.ts";
import {doSignOut} from "@/redux/actions/auth.actions.ts";
import {setCurrency} from "@/redux/slices/appSlice.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/pro-solid-svg-icons";

interface WalletHeaderProps {
  collapsed: boolean,
  toggleCollapsed: () => void
}

export default function WalletHeader({collapsed, toggleCollapsed}: WalletHeaderProps) {
  const {profile, currencyCode} = useAppSelector(state => state.app);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.header}>
      <Button
        type={'text'}
        size={'large'}
        icon={<FontAwesomeIcon icon={faBars}/>}
        onClick={toggleCollapsed}
      />
      <Space size={'large'}>
        <Select
          defaultValue={currencyCode}
          onChange={value => {
            dispatch(setCurrency(value));
          }}
        >
          <Select.Option value={'usd'}>
            USD
          </Select.Option>
          <Select.Option value={'vnd'}>
            VND
          </Select.Option>
        </Select>
        <Dropdown
          menu={{
            items: [{
              key: 'wallet',
              label: 'My Wallet'
            }, {
              type: 'divider'
            },{
              key: 'logout',
              label: 'Sign Out',
              onClick: () => {
                dispatch(doSignOut());
              }
            }]
          }}
          placement="bottomRight"
        >
          <a>
            <Avatar src={profile?.avatar}/>
          </a>
        </Dropdown>
      </Space>
    </div>
  )
}
