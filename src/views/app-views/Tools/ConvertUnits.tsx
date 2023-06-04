import styles from "@/styles/Setting.module.css";
import {Card, Col, Row, Typography} from "antd";

export default function ConvertUnits() {
  return (
    <>
      <Card>
        <div className={styles.pageTitle}>
          Convert Units
        </div>
        <Typography.Paragraph>
          Our helpful conversion tool and hbar unit reference allow you to calculate your total transaction cost
        </Typography.Paragraph>
      </Card>
      <div style={{marginTop: 16}}>
        <Row>
          <Col>

          </Col>
        </Row>
      </div>
    </>
  )
}
