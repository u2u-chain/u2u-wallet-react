import {Card, Empty} from "antd";

export default function TokensHistoryPage() {
  return (
    <Card bordered={false}>
      <Empty description={'No transactions found on the explorer.'} />
    </Card>
  )
}
