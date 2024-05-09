import React from "react";
import styles from "../styles/sidebar.module.css";

export default function SideBar() {
  return (
    <div className={styles.sidebar}>
      <div className={`${styles.container} ${styles.clicked}`}>
        <p>모든 파일</p>
      </div>
      <div className={styles.container}>
        <p>즐겨찾기</p>
      </div>
    </div>
  );
}
