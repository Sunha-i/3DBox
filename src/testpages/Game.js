import React, { useState } from "react";
import styles from "../styles/nonogram.module.css";
import Nonogram from "../components/Nonogram/Nonogram";

export default function Game() {

  return (
    <div className={styles.container}>
      
      <object type="image/svg+xml" data="/assets/images/nonogram.svg" className={styles.scaledObject}>
        <img src="/assets/images/nonogram.svg" alt="Nonogram Window" />
      </object>
      <div className={styles.blankZone}>
        <div className={styles.gameZone}>
          <Nonogram />
        </div>
      </div>
    </div>
  );
}