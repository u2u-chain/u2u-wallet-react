import {Card, Empty} from "antd";

export default function ReceivedHistoryPage() {
  return (
    <Card bordered={false}>
      <Empty description={'No transactions found on the explorer.'} />
    </Card>
  )
}
