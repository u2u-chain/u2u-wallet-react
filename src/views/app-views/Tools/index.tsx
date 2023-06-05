import {Card, Col, Input, Row} from "antd";
import {TOOlS_LIST} from "@/configs/app.config";
import ClickableCard from "@/components/app/tools/ClickableCard";

export default function ToolsPage() {
  return (
    <Card bordered={false} title={'Tools'} extra={<Input.Search placeholder="Search tools" style={{ width: '100%' }} />}>
      <Row gutter={[16, 16]}>
        {
          TOOlS_LIST.map((tool) => {
            return (
              <Col key={tool.key} xs={24} sm={24} md={12} lg={8} xl={6}>
                <ClickableCard
                  name={tool.name}
                  link={tool.link}
                  description={tool.description}
                  icon={tool.icon}
                />
              </Col>
            )
          })
        }
      </Row>
    </Card>
  )
}
