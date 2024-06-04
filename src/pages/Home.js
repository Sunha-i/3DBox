import React, { useRef, useState } from "react";
import styles from "../styles/home.module.css";
import Dragcont from "../components/Dragcont";
import Upload from "../testpages/Upload";
import FolderTree from "../testpages/FolderTree";

export default function Home() {
  
  return (
    <div className={styles.container}>
      <Dragcont>
        <Upload />
      </Dragcont>
      <Dragcont>
        <FolderTree />
      </Dragcont>
    </div>
  );
}