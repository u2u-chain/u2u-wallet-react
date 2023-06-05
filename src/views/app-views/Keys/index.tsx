import {Button, Card, Col, Form, Input, message, Row, Tooltip, Typography} from "antd";
import styles from "@/styles/Setting.module.css";
import {faCopy} from "@fortawesome/pro-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

export default function KeysPage() {
  const privateKey = '220003237d79123541cd36b0da1ef603b3eb9714d161c1a907d7d94716f00a8e13257d';
  const publicKey = '220003237d79123541cd36b0da1ef603b3eb9714d161c1a907d7d94716f00a8e13257c';
  
  return (
    <>
      <Card bordered={false}>
        <div className={styles.pageTitle}>
          Keys
        </div>
        <Typography.Paragraph>
          Review your transactions...
        </Typography.Paragraph>
      </Card>
      <div style={{marginTop: 16}}>
        <Row>
          <Col xs={24} sm={24} md={24} lg={16}>
            <Card title={"Keys"} bordered={false}>
              <Form
                layout={"vertical"}
              >
                
                <Form.Item
                  name={'privateKey'}
                  label={'Private Key'}
                >
                  <div style={{display: "flex"}}>
                    <Input.Password
                      style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, flexGrow: 1 }}
                      value={privateKey}
                    />
                    <Tooltip title={"Copy"}>
                      <Button
                        type="primary"
                        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                        onClick={() => {
                          navigator.clipboard.writeText(privateKey).then(_ => {
                            message.success('Copy to private key successfully!');
                          });
                        }}
                      >
                        <FontAwesomeIcon icon={faCopy}/>
                      </Button>
                    </Tooltip>
                  </div>
                </Form.Item>
                <Form.Item
                  name={'publicKey'}
                  label={'Public Key'}
                >
                  <div style={{display: "flex"}}>
                    <Input
                      style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, flexGrow: 1 }}
                      value={publicKey}
                    />
                    <Tooltip title={"Copy"}>
                      <Button
                        type="primary"
                        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                        onClick={() => {
                          navigator.clipboard.writeText(publicKey).then(_ => {
                            message.success('Copy to public key successfully!');
                          });
                        }}
                      >
                        <FontAwesomeIcon icon={faCopy}/>
                      </Button>
                    </Tooltip>
                  </div>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}