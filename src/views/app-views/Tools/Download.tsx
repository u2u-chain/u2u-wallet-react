import styles from "@/styles/Setting.module.css";
import {Button, Card, Col, Form, Input, Row, Typography} from "antd";

export default function Download() {

  const onFinish = (values: any) => {
    console.log(values);
  }

  return (
    <>
      <Card>
        <div className={styles.pageTitle}>
          Download
        </div>
        <Typography.Paragraph>
          Download a file from HFS
        </Typography.Paragraph>
      </Card>
      <div style={{marginTop: 16}}>
        <Row>
          <Col xs={24} sm={24} md={24} lg={16}>
            <Card title={'Download'}>
              <Form
                layout={"vertical"}
                onFinish={onFinish}
              >
                <Form.Item
                  label="File ID"
                  name="fileId"
                >
                  <Input placeholder={'0.0.1001 or shard.realm.num'} />
                </Form.Item>
                <Form.Item>
                  <Button
                    type={"primary"}
                    htmlType={"submit"}
                    block
                  >
                    Download
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}
