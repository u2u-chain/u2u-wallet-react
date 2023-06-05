import React, {ReactNode} from "react";
import {Card} from "antd";
import styles from "./icon-card.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface IconCardProps {
  icon: IconProp,
  children?: ReactNode,
  style?: any,
  bodyStyle?: any,
  contentStyle?: any,
}

export default function IconCard({icon, children, style, bodyStyle, contentStyle}: IconCardProps) {
  return <Card
    className={styles.card}
    style={{...style}}
    bodyStyle={{...bodyStyle}}
  >
    <div className={styles.content} style={{...contentStyle}}>
      {children}
    </div>
    <div className={styles.icon}>
      <FontAwesomeIcon icon={icon}/>
    </div>
  </Card>
}
