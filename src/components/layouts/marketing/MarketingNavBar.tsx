import React, {useState} from "react";
import styles from "./marketing.module.css";
import {Button, Divider, Drawer, Dropdown, List, Menu, Space, theme, Typography} from "antd";
import Container from "@/components/common/Container.tsx";
import {
  HomeFilled,
  InfoCircleFilled,
  MenuOutlined, QuestionCircleFilled,
  WalletOutlined
} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faWallet} from "@fortawesome/pro-solid-svg-icons";

interface MarketingNavBarProps {

}

export default function MarketingNavBar(props: MarketingNavBarProps) {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const navigate = useNavigate();

  return <div className={styles.marketingNavbar}>
    <Drawer
      headerStyle={{display: 'none'}}
      placement="right" open={drawerOpened}
      onClose={() => setDrawerOpened(false)}
      bodyStyle={{padding: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}
    >
      <div>
        <div style={{padding: '24px 0 0 24px'}}>
          <Typography.Text className={styles.logoText}>
            U2U Wallet
          </Typography.Text>
        </div>
        <Divider/>
        <Menu
          selectable={false}
          style={{backgroundColor: 'transparent', borderInlineEnd: 'none'}}
          items={[{
            key: 'home',
            label: 'Home',
            icon: <HomeFilled/>,
            onClick: () => {
              setDrawerOpened(false);
              navigate('/');
            }
          }, {
            key: 'about',
            label: 'About',
            icon: <InfoCircleFilled/>,
            onClick: () => {
              setDrawerOpened(false);
              navigate('/about');
            }
          }, {
            key: 'faqs',
            label: 'FAQs',
            icon: <QuestionCircleFilled/>,
            onClick: () => {
              setDrawerOpened(false);
              navigate('/faqs');
            }
          }]}
        />
      </div>
      <Space
        style={{
          padding: '24px',
          width: '100%',
        }}
        direction={'vertical'}
      >
        <Link to={'/wallet'}>
          <Button block size={'large'}>
            Access
          </Button>
        </Link>
        <Link to={'/auth/register'}>
          <Button block size={'large'} type={'primary'}>
            Create Wallet
          </Button>
        </Link>
      </Space>
    </Drawer>
    <Container>
      <div className={styles.marketingNavbarInner}>
        <div className={styles.logo}>
          <Typography.Text className={styles.logoText}>
            U2U Wallet
          </Typography.Text>

          <Dropdown menu={{
            items: [{
              key: 0,
              label: 'Test Net'
            }, {
              key: 1,
              label: 'Mainnet'
            }]
          }} trigger={['click']} className={styles.networkSelector}>
            <Button type={'text'} size={'small'}>
              Test net
            </Button>
          </Dropdown>
        </div>
        <div className={styles.links}>
          <Space>
            <Button type={'text'}>
              Home
            </Button>

            <Button type={'text'}>
              About
            </Button>

            <Button type={'text'}>
              FAQs
            </Button>
          </Space>
        </div>
        <div className={styles.actions}>
          <Space>
            <Button type={'text'} href={'/auth/login'}>
              Access
            </Button>
            <Button shape={'round'} href={'/auth/register'}>
              Create Wallet
            </Button>
          </Space>
        </div>
        <div className={styles.mobileActions}>
          <Space>
            <Button type={'text'} href={'/auth/login'}>
              <FontAwesomeIcon icon={faWallet}/>
            </Button>
            <Button type={'text'} onClick={() => setDrawerOpened(true)}>
              <FontAwesomeIcon icon={faBars}/>
            </Button>
          </Space>
        </div>
      </div>
    </Container>
  </div>
}
