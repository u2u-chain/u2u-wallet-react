import React, {useEffect, useState} from "react";
import {Button, Divider, Table, Tooltip} from "antd";
import {useAppSelector} from "@/redux/store.ts";
import HederaService from "@/services/HederaService.ts";
import moment from "moment";
import {CheckOutlined, LoadingOutlined, WarningOutlined} from "@ant-design/icons";

export default function TransactionsHistoryTable() {
  const {networkAccountId} = useAppSelector(state => state.auth);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [nextLink, setNextLink] = useState('');

  useEffect(() => {
    if (networkAccountId) {
      loadData();
    }
  }, [networkAccountId]);

  const loadData = (nextLink?: string) => {
    setLoading(true);
    HederaService.getTransactionsHistory(networkAccountId, nextLink).then(response => {
      console.log(response.data.transactions);
      setTransactions(txs => [...txs, ...response.data.transactions]);
      if (response.data && response.data.links && response.data.links.next) {
        setHasNext(true);
        setNextLink(response.data.links.next);
      }
      setLoading(false);
    });
  }

  return <>
    <Table
      rowKey={'transaction_hash'}
      dataSource={transactions}
      pagination={false}
      columns={[{
        //   key: 'transaction_id',
        //   title: 'Transaction ID',
        //   dataIndex: 'transaction_id',
        // }, {
        key: 'timestamp',
        title: 'Time',
        dataIndex: 'consensus_timestamp',
        render: (item) => {
          return <Tooltip title={moment(item.split('.')[0] * 1000).format('LLL')}>
            {moment(item.split('.')[0] * 1000).fromNow()}
          </Tooltip>
        }
      }, {
        key: 'amount',
        title: 'Amount',
        render: (item) => {
          const mainTransaction = item.transfers[item.transfers.length - 2];
          return <>
            {mainTransaction.amount}
          </>
        }
      }, {
        key: 'recipient',
        title: 'Recipient',
        render: (item) => {
          const mainTransaction = item.transfers[item.transfers.length - 2];
          return <>
            {mainTransaction.account}
          </>
        }
      }, {
        key: 'result',
        title: 'Result',
        dataIndex: 'result',
        render: (item) => {
          return <Tooltip title={item}>
            {item === 'SUCCESS' ? <CheckOutlined style={{color: 'green'}}/> : <WarningOutlined style={{color: 'red'}}/>}
          </Tooltip>
        }
      }]}
    />
    {hasNext && (
      <Divider>
        <Button
          loading={loading}
          onClick={() => loadData(nextLink)}
        >
          Load more
        </Button>
      </Divider>
    )}
  </>
}
