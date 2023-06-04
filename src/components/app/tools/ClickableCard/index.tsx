import {Card} from "antd";
import {
  CloudDownloadOutlined,
  CloudUploadOutlined,
  DeliveredProcedureOutlined,
  ApartmentOutlined,
  RetweetOutlined,
  UserAddOutlined
} from "@ant-design/icons";
import styles from './ClickableCard.module.css';
import {useNavigate} from "react-router-dom";

interface ClickableCardProps {
  name: string;
  description: string;
  link: string;
  icon: string;
}

const iconMap: { [key: string]: any } = {
  ApartmentOutlined,
  UserAddOutlined,
  CloudUploadOutlined,
  CloudDownloadOutlined,
  RetweetOutlined,
  DeliveredProcedureOutlined,
};

export default function ClickableCard({name, description, link, icon}: ClickableCardProps) {
  const IconComponent = iconMap[icon];
  const navigate = useNavigate();
  return (
    <div className={styles.clickableCard} onClick={() => navigate(link)}>
      <Card>
        <div className={styles.name}>
          {name}
        </div>
        <div className={styles.description}>
          {description}
        </div>
        <div className={styles.icon}>
          <IconComponent />
        </div>
      </Card>
    </div>

  )
}
