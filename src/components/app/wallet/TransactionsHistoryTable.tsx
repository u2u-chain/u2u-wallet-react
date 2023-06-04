import React, {useEffect, useState} from "react";
import {Table} from "antd";
import {useAppSelector} from "@/redux/store.ts";
import HederaService from "@/services/HederaService.ts";
import moment from "moment";

export default function TransactionsHistoryTable() {
  const {networkAccountId} = useAppSelector(state => state.auth);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    if (networkAccountId) {
      HederaService.getTransactionsHistory(networkAccountId).then(response => {
        console.log(response.data);
        setTransactions(response.data.transactions);
      });
    }
  }, [networkAccountId]);

  return <Table
    dataSource={transactions}
    columns={[{
      key: 'transaction_id',
      title: 'Transaction ID',
      dataIndex: 'transaction_id',
    }, {
      key: 'timestamp',
      title: 'Time',
      dataIndex: 'consensus_timestamp',
      render: (item) => {
        return <>
          {moment(item.split('.')[0] * 1000).format('LLL')}
        </>
      }
    }, {
      key: 'result',
      title: 'Result',
      dataIndex: 'result'
    }]}
  />
}
