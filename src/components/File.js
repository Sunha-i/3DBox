import React from "react";
import styles from "../styles/file.module.css";
import Checkbox from "./CheckBox/Checkbox";

export default function File({ name }) {
  return (
    <div className={styles.file}>
      <div className={styles.file_container}>
        <Checkbox value={name} />
        <img
          src="/assets/images/cloud.png"
          alt="cloud"
          style={{ margin: "0 13px" }}
        />
      </div>
      <p>{name}</p>
    </div>
  );
}
