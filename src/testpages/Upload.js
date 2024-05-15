import React from "react";
import styles from "../styles/upload.module.css";

export default function Upload() {

  return (
    <div className={styles.container}>
      <object type="image/svg+xml" data="/assets/images/uploadzone.svg">
        <img src="/assets/images/uploadzone.svg" alt="Upload Zone" />
      </object>
      <div className={styles.dragZone}>
        <div className={styles.message}>Drag and Drop !</div>
      </div>
    </div>
  );
}