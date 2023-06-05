import {Card} from "antd";
import styles from './ClickableCard.module.css';
import {useNavigate} from "react-router-dom";
import {IconDefinition} from "@fortawesome/pro-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

interface ClickableCardProps {
  name: string;
  description: string;
  link: string;
  icon: IconDefinition;
}

export default function ClickableCard({name, description, link, icon}: ClickableCardProps) {
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
          <FontAwesomeIcon icon={icon}/>
        </div>
      </Card>
    </div>

  )
}
