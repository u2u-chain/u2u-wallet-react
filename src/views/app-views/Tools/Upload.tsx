import styles from "@/styles/Setting.module.css";
import {Button, Card, Col, Row, Typography, Upload} from "antd";

export default function UploadFile() {
  return (
    <>
      <Card bordered={false}>
        <div className={styles.pageTitle}>
          Upload
        </div>
        <Typography.Paragraph>
          Upload a file to HFS
        </Typography.Paragraph>
      </Card>
      <div style={{marginTop: 16}}>
        <Row>
          <Col xs={24} sm={24} md={24} lg={16}>
            <Card bordered={false} title={"Upload"}>
              <Upload.Dragger>
                <p className="ant-upload-text">Drop your files here</p>
                <p className="ant-upload-text">or</p>
                  <Button type={"primary"}>
                    Select a file from your device
                  </Button>
                <p className="ant-upload-hint">
                  Maximum file size to enable upload: 1 Mb
                </p>
              </Upload.Dragger>
              <div style={{marginTop: 16}}>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={24} md={24} lg={12}>
                    <Button type={"primary"} block>
                      Upload hash
                    </Button>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12}>
                    <Button type={"primary"} block>
                      Upload file
                    </Button>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}
