import {useEffect} from "react";
import {Card, Col, Row, Space, Tooltip} from "antd";
import {useAppDispatch, useAppSelector} from "@/redux/store.ts";
import {loadAccountBalance, loadPrice} from "@/redux/actions/app.actions.ts";
import {RedoOutlined, SendOutlined, WalletOutlined} from "@ant-design/icons";
import styles from './wallet.module.css';
import {Link} from "react-router-dom";
import TokensTable from "@/components/app/assets/TokensTable";
import Collectibles from "@/components/app/assets/Collectibles";
import CurrencyWrapper from "@/components/app/wallet/CurrencyWrapper.tsx";


export default function WalletPage() {
  const {isLoggedIn, networkAccountId} = useAppSelector(state => state.auth);
  const {balance, currencyCode, currencyRate} = useAppSelector(state => state.app);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggedIn) dispatch(loadAccountBalance());
  }, [isLoggedIn]);

  const reloadPrice = () => dispatch(loadPrice());
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  });
  const calculatedPrice = formatter.format(balance * currencyRate);

  return (
    <>
      <Card style={{marginBottom: 16}}>
        <p className={styles.title}>
          Hey there, <strong>{networkAccountId}</strong>
        </p>
        <div className={styles.wrapper}>
          <div>
            <div className={styles.text}>
              Total value ({balance})
            </div>
            <div className={styles.value}>
              <Space>
                <WalletOutlined/>
                <div style={{color: "#00b96b", fontWeight: 700}}>
                  <CurrencyWrapper>
                    {calculatedPrice}
                  </CurrencyWrapper>
                </div>
                <a onClick={reloadPrice}><RedoOutlined/></a>
              </Space>
            </div>
          </div>
          <Tooltip title={"Send"} placement="bottom">
            <a className={styles.icon} href={'/wallet/send'}>
              <SendOutlined/>
            </a>
          </Tooltip>
        </div>
      </Card>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <Card title={'Assets'} extra={<Link to={'/wallet/assets/tokens'}>View all</Link>}>
            <TokensTable/>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <Card title={'Collectibles'} extra={<Link to={'/wallet/assets/collectibles'}>View all</Link>}>
            <Collectibles/>
          </Card>
        </Col>
      </Row>
    </>
  )
}
