import {useEffect} from "react";
import {Card, Col, Row, Tooltip} from "antd";
import {useAppDispatch, useAppSelector} from "@/redux/store.ts";
import {loadAccountBalance} from "@/redux/actions/app.actions.ts";
import {RedoOutlined, SendOutlined, WalletOutlined} from "@ant-design/icons";
import styles from './wallet.module.css';
import {Link} from "react-router-dom";
import TokensTable from "@/components/app/assets/TokensTable";
import Collectibles from "@/components/app/assets/Collectibles";


export default function WalletPage() {
  const {isLoggedIn, networkAccountId} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggedIn) dispatch(loadAccountBalance());
  }, [isLoggedIn]);

  return (
    <>
      <Card style={{marginBottom: 16}}>
        <p className={styles.title}>
          Hey there, <strong>{networkAccountId}</strong>
        </p>
        <div className={styles.wrapper}>
          <div>
            <p className={styles.text}>
              Total value
            </p>
            <p className={styles.value}>
              <WalletOutlined /> <span style={{color: "#00b96b", fontWeight: 700}}>$507.49</span> <a><RedoOutlined /></a>
            </p>
          </div>
          <Tooltip title={"Send"} placement="bottom">
            <p className={styles.icon}>
              <SendOutlined />
            </p>
          </Tooltip>
        </div>
      </Card>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <Card title={'Assets'} extra={<Link to={'/wallet/assets/tokens'}>View all</Link>}>
            <TokensTable />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <Card title={'Collectibles'} extra={<Link to={'/wallet/assets/collectibles'}>View all</Link>}>
            <Collectibles />
          </Card>
        </Col>
      </Row>
    </>
  )
}
