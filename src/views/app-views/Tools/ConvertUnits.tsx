import styles from "@/styles/Setting.module.css";
import {Card, Col, Divider, Form, Input, Row, Select, Table, Typography} from "antd";
import type { ColumnsType } from 'antd/es/table';
import {SwapOutlined} from "@ant-design/icons";

interface DataType {
  key: string;
  unit: string;
  amount: number;
  amountHbar: number;
  symbol: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Unit',
    dataIndex: 'unit',
    key: 'unit',
    render: (_, record) => (
      <div style={{display: "flex", alignItems: "start", justifyContent: "start", flexDirection: "column"}}>
        <span>Name: {record.unit}</span>
        <>Amount: {record.amount.toLocaleString(undefined, {maximumFractionDigits:2})} {record.symbol}</>
      </div>
    ),
    responsive: ["xs"]
  },
  {
    title: 'Unit',
    dataIndex: 'unit',
    key: 'unit',
    responsive: ["sm"]
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (_, record) => <>{record.amount.toLocaleString(undefined, {maximumFractionDigits:2})} {record.symbol}</>,
    responsive: ["sm"]
  },
  {
    title: 'Amount in Hbar',
    dataIndex: 'amountHbar',
    key: 'amountHbar',
    render: (text) => <>{text.toLocaleString(undefined, {maximumFractionDigits:2})} ℏ</>,
  },
];

const data: DataType[] = [
  {
    key: 'tinybar',
    unit: 'Tinybar',
    amount: 100000000,
    amountHbar: 1,
    symbol: 'tℏ'
  }, {
    key: 'microbar',
    unit: 'Microbar',
    amount: 1000000,
    amountHbar: 1,
    symbol: 'μℏ'
  }, {
    key: 'millibar',
    unit: 'Millibar',
    amount: 1000,
    amountHbar: 1,
    symbol: 'mℏ'
  }, {
    key: 'hbar',
    unit: 'Hbar',
    amount: 1,
    amountHbar: 1,
    symbol: 'ℏ'
  }, {
    key: 'kilobar',
    unit: 'Kilobar',
    amount: 1,
    amountHbar: 1000,
    symbol: 'kℏ'
  }, {
    key: 'megabar',
    unit: 'Megabar',
    amount: 1,
    amountHbar: 1000000,
    symbol: 'Mℏ'
  }, {
    key: 'gigabar',
    unit: 'Gigabar',
    amount: 1,
    amountHbar: 1000000000,
    symbol: 'Gℏ'
  }
];

export default function ConvertUnits() {
  const [form] = Form.useForm();

  const handleOnchangeSelect = (value) => {
    switch (value) {
      case "tinybar":
        form.setFieldsValue({
          "preInput": 100000000
        });
        break;
      case "microbar":
        form.setFieldsValue({
          "preInput": 1000000
        });
        break;
      case "millibar":
        form.setFieldsValue({
          "preInput": 1000
        });
        break;
      case "hbar":
        form.setFieldsValue({
          "preInput": 1
        });
        break;
      case "kilobar":
        form.setFieldsValue({
          "preInput": 1
        });
        break;
      case "megabar":
        form.setFieldsValue({
          "preInput": 1
        });
        break;
      case "gigabar":
        form.setFieldsValue({
          "preInput": 1
        });
        break;
    }
  }

  const prefixSelector = (
    <Select defaultValue={"tinybar"} onChange={(value) => handleOnchangeSelect(value)} style={{ width: 100 }}>
      {
        data.map((item) => {
          return (
            <Select.Option value={item.key}>{item.unit}</Select.Option>
          )
        })
      }
    </Select>
  );

  return (
    <>
      <Card bordered={false}>
        <div className={styles.pageTitle}>
          Convert Units
        </div>
        <Typography.Paragraph>
          Our helpful conversion tool and hbar unit reference allow you to calculate your total transaction cost
        </Typography.Paragraph>
      </Card>
      <div style={{marginTop: 16}}>
        <Row>
          <Col xs={24} sm={24} md={24} lg={16}>
            <Card bordered={false} title={'Convert Units'}>
              <Form
                form={form}
                layout={"vertical"}
              >
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={24} md={10}>
                    <Form.Item name={"preInput"} style={{margin: 0}}>
                      <Input addonBefore={prefixSelector} style={{width: "100%"}} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={4}>
                    <div style={{fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", height: "100%"}}>
                      <SwapOutlined />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={10}>
                    <Form.Item style={{margin: 0}}>
                        <Input addonBefore={prefixSelector} />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
              <Divider />
              <Table columns={columns} dataSource={data} pagination={false} />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}
