import React from "react";
import styles from "./Sun.module.css";

const Sun: React.FC<{ width?: number; height?: number }> = ({
  width,
  height,
}) => {
  return <div className={styles["sun"]} style={{ width, height }}></div>;
};

export default Sun;
