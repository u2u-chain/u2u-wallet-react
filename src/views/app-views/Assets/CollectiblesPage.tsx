import React from 'react';
import Collectibles from "@/components/app/assets/Collectibles";
import {Card} from "antd";

export default function CollectiblesPage() {
  return (
    <Card bordered={false} title={'Collectibles'}>
      <Collectibles />
    </Card>
  )
}
