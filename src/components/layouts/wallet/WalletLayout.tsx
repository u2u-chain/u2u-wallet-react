import {useEffect, useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "@/redux/store.ts";
import {Drawer, Layout, message, theme} from "antd";
import WalletSideBar from "@/components/layouts/wallet/WalletSideBar.tsx";
import {loadUserProfile} from "@/redux/actions/auth.actions.ts";
import WalletHeader from "@/components/layouts/wallet/WalletHeader.tsx";
import styles from "./wallet-layout.module.css";
import hederaService from "@/services/HederaService.ts";
import {loadPrice} from "@/redux/actions/app.actions.ts";


export default function WalletLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const {isLoggedIn, authMethod, networkAccountId, privateKey} = useAppSelector(state => state.auth);
  const {profile, currencyCode} = useAppSelector(state => state.app);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [width, setWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth: 0);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  const isMobile = width <= 768;

  useEffect(() => {
    if (isMobile) setCollapsed(true)
  }, [isMobile]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/auth/login');
      return message.error('You have not logged in.');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && !profile && authMethod === 'account') dispatch(loadUserProfile());
  }, [profile, isLoggedIn, authMethod]);

  useEffect(() => {
    if (networkAccountId && privateKey) {
      hederaService.initialize(networkAccountId, privateKey);
    }
  }, [networkAccountId, privateKey]);

  useEffect(() => {
    dispatch(loadPrice());
  }, [currencyCode]);

  if (!profile) return <>
    Loading
  </>

  return (
    <Layout>
      {
        isClient && (
          <>
            {
              isMobile ? (
                <>
                  <Drawer
                    open={!collapsed}
                    headerStyle={{display: 'none'}}
                    bodyStyle={{padding: 0, backgroundColor: colorBgContainer}}
                    onClose={() => setCollapsed(true)}
                    placement={'left'}
                    width={300}
                  >
                    <WalletSideBar collapsed={collapsed}/>
                  </Drawer>
                </>
              ) : (
                <Layout.Sider
                  breakpoint="lg"
                  collapsed={collapsed}
                  width={260}
                  style={{
                    background: colorBgContainer,
                    borderRight: '1px solid #00000011',
                  }}
                  onBreakpoint={(broken) => {
                    console.log(broken);
                  }}
                  onCollapse={(isCollapsed) => {
                    setCollapsed(isCollapsed);
                  }}
                >
                  <WalletSideBar collapsed={collapsed} />
                </Layout.Sider>
              )
            }
          </>
        )
      }
      <Layout>
        <WalletHeader collapsed={collapsed} toggleCollapsed={() => setCollapsed(!collapsed)} />
        <Layout.Content className={styles.content}>
          <Outlet/>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
