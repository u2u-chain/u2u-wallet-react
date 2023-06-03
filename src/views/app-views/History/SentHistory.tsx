import {Card, Empty} from "antd";

export default function SentHistoryPage() {
  return (
    <Card>
      <Empty description={'No transactions found on the explorer.'} />
    </Card>
  )
}
