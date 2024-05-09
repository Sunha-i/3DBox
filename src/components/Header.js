import React from "react";
import styles from "../styles/header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <img
        src="/assets/images/logo.png"
        alt="logo"
        style={{ margin: "15px" }}
      />
    </div>
  );
}
