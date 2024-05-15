import React from "react";
import styles from "../styles/bin.module.css";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

function Bin() {
  return (
    <div className={styles.bin}>
      <Header />
      <div className={styles.main}>
        <SideBar />
        <div className={styles.content}>
          <h2>휴지통</h2>
        </div>
      </div>
    </div>
  );
}

export default Bin;
