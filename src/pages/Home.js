import React, { useRef, useState } from "react";
import styles from "../styles/home.module.css";
import Dragcont from "../components/Dragcont";
import Upload from "../testpages/Upload";
import FolderTree from "../testpages/FolderTree";
import FolderContents from "../testpages/FolderContents";

export default function Home() {
  
  return (
    <div className={styles.container}>
      <div className={styles.menuBar}>
        <div className={`${styles.menuContents} ${styles.logOut}`}>LogOut</div>
        <object type="image/svg+xml" data="/assets/images/menuResizer.svg" className={styles.menuResizer}>
          <img src="/assets/images/menuResizer.svg" alt="Menu Resizer" />
        </object>
        <div className={`${styles.menuContents} ${styles.userName}`}>Sunha</div>
      </div>
      <Dragcont>
        <div className={styles.uploadBox}>
          <Upload />
        </div>
      </Dragcont>
      <Dragcont>
        <div className={styles.folderTreeBox}>
          <FolderTree />
        </div>
      </Dragcont>
      <Dragcont>
        <div className={styles.folderContentsBox}>
          <FolderContents />
        </div>
      </Dragcont>
    </div>
  );
}