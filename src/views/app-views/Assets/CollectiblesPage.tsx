import React from 'react';
import Collectibles from "@/components/app/assets/Collectibles";
import {Card} from "antd";

export default function CollectiblesPage() {
  return (
    <Card title={'Collectibles'}>
      <Collectibles />
    </Card>
  )
}
