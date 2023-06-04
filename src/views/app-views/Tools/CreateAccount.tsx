import styles from "@/styles/Setting.module.css";
import {Button, Card, Col, Form, Input, Row, Typography} from "antd";

export default function CreateAccount() {

  const onFinish = (values: any) => {
    console.log(values);
  }

  return (
    <>
      <Card>
        <div className={styles.pageTitle}>
          Create Account
        </div>
        <Typography.Paragraph>
          Create an account for a public key
        </Typography.Paragraph>
      </Card>
      <div style={{marginTop: 16}}>
        <Row>
          <Col xs={24} sm={24} md={24} lg={16}>
            <Card title={'Create Account'}>
              <Form
                layout={"vertical"}
                onFinish={onFinish}
              >
                <Form.Item
                  label="Public Key"
                  name="publicKey"
                >
                  <Input placeholder={'302e020100300...'} />
                </Form.Item>
                <Form.Item>
                  <Button
                    type={"primary"}
                    htmlType={"submit"}
                    block
                  >
                    Create Account
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
