import {useEffect} from "react";
import {Card, Col, Empty, Row, Table} from "antd";
import {useAppDispatch, useAppSelector} from "@/redux/store.ts";
import {loadAccountBalance} from "@/redux/actions/app.actions.ts";
import {RedoOutlined, SendOutlined, WalletOutlined} from "@ant-design/icons";
import {ColumnsType} from "antd/es/table";

interface DataType {
  key: string;
  image?: string;
  token: string;
  symbol: string;
  amount: number;
  totalValue: number
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Token',
    dataIndex: 'token',
    key: 'token',
    render: (_, record) => {
      return(
        <div style={{display: "flex", alignItems: "center"}}>
          <img width={40} height={40} src={record.image} alt="image"/>
          <span style={{padding: '0 8px', fontWeight: 500}}>{record.token}</span>
          <span style={{fontWeight: 500}}>({record.symbol})</span>
        </div>
      )
      console.log('record', record);
    },
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (text) => {
      const [integerPart, decimalPart] = text.toString().split(".");
      const decimalPartBlur = decimalPart.substring(0, 2);

      let formattedIntegerPart = integerPart;
      if (parseInt(integerPart) >= 1000) {
        formattedIntegerPart = parseInt(integerPart).toLocaleString();
      }

      const formattedText = (
        <span>
          {formattedIntegerPart}.
          <span>{decimalPartBlur}</span>
          <span style={{ opacity: 0.5 }}>{decimalPart.substring(2)}</span>
        </span>
      );

      return formattedText;
    }
  },
  {
    title: 'Total value',
    dataIndex: 'totalValue',
    key: 'totalValue',
    render: (text) => {
      const [integerPart, decimalPart] = text.toString().split(".");
      const decimalPartBlur = decimalPart.substring(0, 2);

      let formattedIntegerPart = integerPart;
      if (parseInt(integerPart) >= 1000) {
        formattedIntegerPart = parseInt(integerPart).toLocaleString();
      }

      const formattedText = (
        <span>
          $ {" "}
          {formattedIntegerPart}.
          <span>{decimalPartBlur}</span>
          <span style={{ opacity: 0.5 }}>{decimalPart.substring(2)}</span>
        </span>
      );

      return formattedText;
    }
  },


];

const data: DataType[] = [
  {
    key: '1',
    image: 'https://portal.hedera.com/assets/hedera-logo-black-a0b1bd4f.svg',
    token: 'Hedera',
    symbol: 'HBAR',
    amount: 9999.99151988,
    totalValue: 507.49
  }
];

export default function WalletPage() {
  const {isLoggedIn, networkAccountId} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggedIn) dispatch(loadAccountBalance());
  }, [isLoggedIn]);

  return (
    <>
      <Card style={{marginBottom: 16}}>
        <div>
          <p style={{margin: 0, fontSize: 30}}>
            Hey there, <strong>{networkAccountId}</strong>
          </p>
          <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <div>
              <p style={{fontSize: 16, margin: '20px 0'}}>
                Total value
              </p>
              <p style={{margin: 0, fontSize: 42}}>
                <WalletOutlined /> <span style={{color: "#00b96b", fontWeight: 700}}>$507.49</span> <a><RedoOutlined /></a>
              </p>
            </div>
            <p style={{fontSize: 52, margin: 0}}>
              <SendOutlined />
            </p>
          </div>
        </div>
      </Card>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <Card title={'Assets'} extra={<a href="#">View all</a>}>
            <Table columns={columns} dataSource={data} pagination={false} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <Card title={'Collectibles'} extra={<a href="#">View all</a>}>
            <Empty description={'Looks like you don\'t have any collectibles yet.'} />
          </Card>
        </Col>
      </Row>
    </>
  )
}
