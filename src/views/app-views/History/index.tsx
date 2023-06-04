import {Card, Col, Empty, Row} from "antd";
import TransactionsHistoryTable from "@/components/app/wallet/TransactionsHistoryTable.tsx";

export default function HistoryPage() {

  return (
    <Row>
      <Col xs={24} sm={24} md={24} lg={24} xl={14}>
        <TransactionsHistoryTable/>
      </Col>
    </Row>
  )
}
