import React from "react";
import {Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {useAppSelector} from "@/redux/store.ts";
import CurrencyWrapper from "@/components/app/wallet/CurrencyWrapper.tsx";

interface DataType {
  key: string;
  image?: string;
  token: string;
  symbol: string;
  amount: number;
  totalValue: number;
}

export default function TokensTable() {
  const {balance, currencyCode, currencyRate} = useAppSelector(state => state.app);
  const data: DataType[] = [
    {
      key: '1',
      image: 'https://portal.hedera.com/assets/hedera-logo-black-a0b1bd4f.svg',
      token: 'Hedera',
      symbol: 'HBAR',
      amount: balance,
      totalValue: 507.49
    }
  ];


  const columns: ColumnsType<DataType> = [
    {
      title: "Token",
      dataIndex: "token",
      key: "token",
      render: (_, record) => {
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: currencyCode,
        });
        const calculatedPrice = formatter.format(balance * currencyRate);
        return(
          <div style={{display: "flex", alignItems: "center"}}>
            <img width={40} height={40} src={record.image} alt="image"/>
            <div style={{display: "flex", flexDirection: "column", paddingLeft: 8}}>
              <span style={{fontWeight: 500}}>{record.symbol}</span>
              <CurrencyWrapper style={{paddingLeft: 8}}>
                {calculatedPrice}
              </CurrencyWrapper>
            </div>
          </div>
        )
      },
      responsive: ["xs"]
    },
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
      responsive: ["sm"]
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => {
        const [integerPart, decimalPart] = text.toString().split(".");
        const decimalPartBlur = decimalPart?.substring(0, 2);

        let formattedIntegerPart = integerPart;
        if (parseInt(integerPart) >= 1000) {
          formattedIntegerPart = parseInt(integerPart).toLocaleString();
        }

        return (
          <span>
          {formattedIntegerPart}.
          <span>{decimalPartBlur}</span>
          <span style={{opacity: 0.5}}>{decimalPart?.substring(2)}</span>
        </span>
        );
      }
    },
    {
      title: 'Total value',
      dataIndex: 'totalValue',
      key: 'totalValue',
      render: () => {
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: currencyCode,
        });
        const calculatedPrice = formatter.format(balance * currencyRate);

        return (
          <CurrencyWrapper>
            {calculatedPrice}
          </CurrencyWrapper>
        );
      },
      responsive: ["sm"]
    },


  ];
  return (
    <Table columns={columns} dataSource={data} pagination={false} />
  )
}
