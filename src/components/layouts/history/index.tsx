import styles from "@/styles/Setting.module.css";
import {Card, Menu, Typography} from "antd";
import {Link, Outlet, useLocation} from "react-router-dom";

export default function HistoryLayout() {

  const location = useLocation();

  return (
    <>
      <Card bordered={false} className={styles.pageHeaderCard}>
        <div className={styles.pageTitle}>
          History
        </div>
        <Typography.Paragraph>
          Review your transactions...
        </Typography.Paragraph>
      </Card>
      <Menu
        mode={'horizontal'}
        rootClassName={styles.tabsContainer}
        defaultSelectedKeys={[location.pathname]}
        items={[{
          key: '/wallet/history',
          label: <Link to={'/wallet/history'}>
            All
          </Link>,
        }, {
          key: '/wallet/history/sent',
          label: <Link to={'/wallet/history/sent'}>
            Sent
          </Link>,
        }, {
          key: '/wallet/history/received',
          label: <Link to={'/wallet/history/received'}>
            Received
          </Link>,
        }, {
          key: '/wallet/history/tokens',
          label: <Link to={'/wallet/history/tokens'}>
            Tokens
          </Link>,
        }, {
          key: '/wallet/history/account',
          label: <Link to={'/wallet/history/account'}>
            Account
          </Link>,
        }]}
      />
      <div style={{marginTop: 16}}>
        <Outlet />
      </div>
    </>
  )
}
