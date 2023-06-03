import {Card, Empty} from "antd";

export default function HistoryPage() {

  return (
    <>
      <Card>
        <Empty description={'No transactions found on the explorer.'} />
      </Card>
    </>
  )
}
