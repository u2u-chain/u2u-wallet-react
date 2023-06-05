import styles from "@/styles/Setting.module.css";
import {Button, Card, Col, Divider, Form, Input, List, Row, Typography} from "antd";
import {useState} from "react";
import {DeleteOutlined} from "@ant-design/icons";
import ToolsLayout from "@/components/layouts/tools";

export default function AssociateToken() {
  const [tokens, setTokens] = useState<string[]>([]);
  const [form] = Form.useForm();

  const handleDelete = (tokenId) => {
    const updatedTokens = tokens.filter(item => item !== tokenId);
    setTokens(updatedTokens);
  }


  const onFinish = (values: any) => {
    setTokens([values.tokenId, ...tokens]);
    form.resetFields();
  }

  return (
    <>
      <Card bordered={false}>
        <div className={styles.pageTitle}>
          Associate Token
        </div>
        <Typography.Paragraph>
          To send or receive a token, you need to first associate your account with the token
        </Typography.Paragraph>
      </Card>
      <div style={{marginTop: 16}}>
        <ToolsLayout>
          <Card bordered={false} title={'Create Account'}>
            <Form
              form={form}
              layout={"vertical"}
              onFinish={onFinish}
            >
              <Form.Item
                label="Token ID"
                name="tokenId"
              >
                <Input placeholder={'Shard.Realm.Num'} />
              </Form.Item>
              <Form.Item>
                <Button
                  type={"primary"}
                  htmlType={"submit"}
                  block
                >
                  Add Token
                </Button>
              </Form.Item>
            </Form>
            <Divider />
            <List
              dataSource={tokens}
              renderItem={item => (
                <Row>
                  <Col span={20}>
                    {item}
                  </Col>
                  <Col span={4}>
                    <Button type={'text'} danger onClick={() => handleDelete(item)}>
                      <DeleteOutlined/>
                    </Button>
                  </Col>
                </Row>
              )}
            />
            {tokens.length > 0 &&
              <div style={{marginTop: 16}}>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={24} md={24} lg={12}>
                    <Button
                      block
                    >
                      Cancel
                    </Button>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12}>
                    <Button
                      type={"primary"}
                      block
                    >
                      Associate Tokens
                    </Button>
                  </Col>
                </Row>
              </div>
            }
          </Card>
        </ToolsLayout>
      </div>
    </>
  )
}
