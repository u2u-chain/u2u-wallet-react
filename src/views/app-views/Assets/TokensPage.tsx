 import React, {useEffect} from "react";
import {Card, Input} from "antd";
 import TokensTable from "@/components/app/assets/TokensTable";

export default function TokensPage() {
  return (
    <>
      <Card title={'Tokens'} extra={<Input.Search placeholder="Search assets" style={{ width: '100%' }} />}>
        <TokensTable />
      </Card>
    </>
  )
}
