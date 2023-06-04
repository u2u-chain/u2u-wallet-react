import Card from "antd/lib/card/Card";
import styles from "@/styles/Setting.module.css";
import {Typography} from "antd";
import {Outlet} from "react-router-dom";

export default function ToolsLayout() {
  return (
    <>
      <Card className={styles.pageHeaderCard}>
        <div className={styles.pageTitle}>
          History
        </div>
        <Typography.Paragraph>
          Review your transactions...
        </Typography.Paragraph>
      </Card>
      <div style={{marginTop: 16}}>
        <Outlet />
      </div>
    </>
  )
}
