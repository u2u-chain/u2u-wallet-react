import React, {useState} from "react";
import {Button, Card, Col, List, Row, Space} from "antd";
import TransferForm from "@/components/app/wallet/TransferForm.tsx";
import {CheckOutlined, DeleteOutlined, LoadingOutlined, WarningOutlined} from "@ant-design/icons";
import HederaService from "@/services/HederaService.ts";
import {useAppSelector} from "@/redux/store.ts";


export interface Transaction {
  recipient: string,
  asset: string,
  amount: number,
  status?: string,
}

export default function SendPage() {
  const {networkAccountId} = useAppSelector(state => state.auth);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const send = async () => {
    setTransactions([...transactions.map(t => {
      t.status = 'loading';
      return t;
    })]);

    for (let tx of transactions) {
      HederaService.sendTokens(networkAccountId, tx.recipient, tx.amount).then(response => {
        setTransactions([...transactions.map((t) => {
          if (t === tx) t.status = 'success';
          return t;
        })])
      }).catch(error => {
        setTransactions([...transactions.map((t) => {
          if (t === tx) t.status = 'error';
          return t;
        })])
      });
    }
  }

  return (
    <Row gutter={32}>
      <Col xs={24} sm={24} md={24} lg={10}>
        <Space direction={'vertical'} style={{width: '100%'}} size={'large'}>
          <Card>
            <TransferForm onSubmit={(transaction) => {
              const existTx = transactions.find(t => t.recipient === transaction.recipient && t.asset === transaction.asset);
              if (existTx) {
                setTransactions(ts => [...ts.map(t => {
                  if (t.recipient === transaction.recipient && t.asset === transaction.asset) {
                    t.amount += transaction.amount;
                  }
                  return t;
                })])
              } else {
                setTransactions(ts => [...ts, transaction]);
              }
            }}/>
          </Card>
          <Button block size={'large'} type={'primary'} onClick={send}>
            Send
          </Button>
        </Space>
      </Col>
      <Col xs={24} sm={24} md={24} lg={14}>
        <List
          dataSource={transactions}
          renderItem={item => (
            <Card style={{marginBottom: 8}}>
              <Row>
                <Col xs={8}>
                  {item.recipient}
                </Col>
                <Col xs={6}>
                  {item.asset}
                </Col>
                <Col xs={6}>
                  {item.amount}
                </Col>
                <Col xs={4}>
                  {item.status === 'loading' && (
                    <LoadingOutlined spin={true}/>
                  )}
                  {item.status === 'error' && (
                    <WarningOutlined style={{color: 'red'}}/>
                  )}
                  {item.status === 'success' && (
                    <CheckOutlined style={{color: 'green'}}/>
                  )}
                  {!item.status && (
                    <Button type={'text'} danger>
                      <DeleteOutlined/>
                    </Button>
                  )}
                </Col>
              </Row>
            </Card>
          )}
        />
      </Col>
    </Row>
  )
}
