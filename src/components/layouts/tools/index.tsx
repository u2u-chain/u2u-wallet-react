import {Card, Col, List, Row} from "antd";
import {PropsWithChildren} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";
import {TOOlS_LIST} from "@/configs/app.config.ts";

export default function ToolsLayout(props: PropsWithChildren<{extra?: any}>) {
  const navigate = useNavigate();
  
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24} xl={16}>
        {props.children}
      </Col>
      <Col xs={24} sm={24} md={24} xl={8}>
        <Card
          bordered={false}
          title={"Tools"}
        >
          <List
            dataSource={TOOlS_LIST}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<>
                    <FontAwesomeIcon icon={item.icon}/>
                  </>}
                  title={
                    <a onClick={() => {
                      navigate(item.link);
                    }}>
                      {item.name}
                    </a>
                  }
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>
    </Row>
  )
}
