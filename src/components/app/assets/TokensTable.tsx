import React from "react";
import {Table} from "antd";
import {ColumnsType} from "antd/es/table";

interface DataType {
  key: string;
  image?: string;
  token: string;
  symbol: string;
  amount: number;
  totalValue: number;
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
        <div>
          $ {" "}
          {formattedIntegerPart}.
          <span>{decimalPartBlur}</span>
          <span style={{ opacity: 0.5 }}>{decimalPart.substring(2)}</span>
        </div>
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

export default function TokensTable() {
  return (
    <Table columns={columns} dataSource={data} pagination={false} />
  )
}
