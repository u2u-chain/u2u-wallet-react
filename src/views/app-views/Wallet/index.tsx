import {useEffect} from "react";
import {Button, Card, Col, Row, Space, Tooltip, Typography} from "antd";
import {useAppDispatch, useAppSelector} from "@/redux/store.ts";
import {loadAccountBalance, loadPrice} from "@/redux/actions/app.actions.ts";
import styles from './wallet.module.css';
import {Link} from "react-router-dom";
import TokensTable from "@/components/app/assets/TokensTable";
import Collectibles from "@/components/app/assets/Collectibles";
import CurrencyWrapper from "@/components/app/wallet/CurrencyWrapper.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoneyBillTransfer, faRefresh, faSend, faWallet} from "@fortawesome/pro-solid-svg-icons";
import IconCard from "@/components/common/IconCard";


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
      <Row gutter={16}>
        <Col xs={24} sm={24} md={12}>
          <IconCard
            style={{marginBottom: 16}}
            icon={faWallet}
          >
            <p className={styles.title}>
              Hey there, <strong>{networkAccountId}</strong>
            </p>
            <div className={styles.wrapper}>
              <div className={styles.value}>
                <div style={{color: "#00b96b", fontWeight: 700}}>
                  <CurrencyWrapper>
                    {calculatedPrice}
                  </CurrencyWrapper>
                </div>
                <Button onClick={reloadPrice} type={'text'}>
                  <FontAwesomeIcon icon={faRefresh} fontSize={14}/>
                </Button>
              </div>
            </div>
          </IconCard>
        </Col>
        <Col xs={24} sm={24} md={12} style={{display: 'flex'}}>
          <IconCard
            style={{marginBottom: 16, width: '100%', display: 'flex'}}
            bodyStyle={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}
            contentStyle={{display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}
            icon={faMoneyBillTransfer}
          >
            <Typography.Text className={styles.title}>
              Transfer
            </Typography.Text>
            <Typography.Text className={styles.description}>
              Send U2U to your buddies...
            </Typography.Text>
            <div className={styles.wrapper}>
              <Link to={'/wallet/send'}>
                <Button
                  type={'primary'} shape={'round'}
                  icon={<FontAwesomeIcon icon={faSend}/>}
                >
                  Send U2U
                </Button>
              </Link>
            </div>
          </IconCard>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <Card bordered={false} title={'Assets'} extra={<Link to={'/wallet/assets/tokens'}>View all</Link>}>
            <TokensTable/>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <Card bordered={false} title={'Collectibles'} extra={<Link to={'/wallet/assets/collectibles'}>View all</Link>}>
            <Collectibles/>
          </Card>
        </Col>
      </Row>
    </>
  )
}
