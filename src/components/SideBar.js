import React from "react";
import styles from "../styles/sidebar.module.css";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const navigate = useNavigate();

  return (
    <div className={styles.sidebar}>
      <div
        className={`${styles.container} ${styles.clicked}`}
        onClick={() => {
          navigate("/");
        }}
      >
        <p>모든 파일</p>
      </div>
      <div className={styles.container}>
        <p>즐겨찾기</p>
      </div>
      <div
        className={styles.container_bin}
        onClick={() => {
          navigate("/bin");
        }}
      >
        <p>휴지통</p>
      </div>
    </div>
  );
}
