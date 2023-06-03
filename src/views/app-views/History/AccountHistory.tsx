import {Card, Empty} from "antd";

export default function AccountHistoryPage() {
  return (
    <Card>
      <Empty description={'No transactions found on the explorer.'} />
    </Card>
  )
}
