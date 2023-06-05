import styles from "@/styles/Setting.module.css";
import {Button, Card, Col, Form, Input, Row, Typography} from "antd";
import ToolsLayout from "@/components/layouts/tools";

export default function ExportKeystore() {

  const onFinish = (values: any) => {
    console.log(values);
  }

  return (
    <>
      <Card bordered={false}>
        <div className={styles.pageTitle}>
          Export Keystore
        </div>
        <Typography.Paragraph>
          Export a keystore file for your current wallet
        </Typography.Paragraph>
      </Card>
      <div style={{marginTop: 16}}>
        <ToolsLayout>
          <Card bordered={false} title={'Download'}>
            <Form
              layout={"vertical"}
              onFinish={onFinish}
            >
              <Form.Item
                label="Password"
                name="password"
              >
                <Input.Password placeholder={'Enter password'} />
              </Form.Item>
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
              >
                <Input.Password placeholder={'Confirm password'} />
              </Form.Item>
              <Form.Item>
                <Typography.Text>
                  <span style={{color: "#ff4d4f"}}>*</span> Note: DO NOT FORGET to save your password. You will need this Password + Keystore File to access your wallet.
                </Typography.Text>
              </Form.Item>
              <Form.Item>
                <Button
                  type={"primary"}
                  htmlType={"submit"}
                  block
                >
                  Export Keystore
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </ToolsLayout>
      </div>
    </>
  )
}
