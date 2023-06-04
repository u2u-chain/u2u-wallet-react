import React from "react";
import {Typography} from "antd";
import styles from "./landing.module.css";
import Separator from "@/views/app-views/Landing/Separator.tsx";

interface SectionTitleProps {
  title: string;
}

export default function SectionTitle({title}: SectionTitleProps) {
  return <div className={styles.sectionTitleWrapper}>
    <Separator/>
    <Typography.Text className={styles.sectionTitle}>
      {title}
    </Typography.Text>
  </div>
}
