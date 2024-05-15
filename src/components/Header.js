import React from "react";
import styles from "../styles/header.module.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div
      className={styles.header}
      onClick={() => navigate("/")}
      style={{ cursor: "pointer" }}
    >
      <img
        src="/assets/images/logo.png"
        alt="logo"
        style={{ margin: "15px" }}
      />
    </div>
  );
}
