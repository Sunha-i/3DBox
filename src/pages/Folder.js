import React from "react";
import styles from "../styles/folder.module.css";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

export default function Folder() {
  return (
    <div className={styles.folder}>
      <Header />
      <div className={styles.main}>
        <SideBar />
        <div className={styles.content}></div>
      </div>
    </div>
  );
}
