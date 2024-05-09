import React, { useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import styles from "../styles/home.module.css";
import File from "../components/File";
import CheckboxGroup from "../components/CheckBox/CheckboxGroup";

export default function Home() {
  const [files, setFiles] = useState([]);
  return (
    <div className={styles.home}>
      <Header />
      <div className={styles.main}>
        <SideBar />
        <div className={styles.content}>
          <div className={styles.button_container}>
            <div className={styles.upload}>
              <img src="/assets/images/upload.png" alt="upload" />
              <p>업로드</p>
            </div>
            <div className={styles.create}>
              <img src="/assets/images/folder-plus.png" alt="upload" />
              <p>폴더 만들기</p>
            </div>
          </div>
          <h3 style={{ margin: "0 30px" }}>모든 파일</h3>
          <div className={styles.button_container}>
            <div
              className={styles.button}
              style={{ backgroundColor: "#4545C2" }}
            >
              <img src="/assets/images/upload.png" alt="upload" />
              <p style={{ color: "white" }}>다운로드</p>
            </div>
            <div className={styles.button}>
              <img src="/assets/images/rename.png" alt="upload" />
              <p>이름 변경</p>
            </div>
            <div className={styles.button}>
              <img src="/assets/images/share.png" alt="upload" />
              <p>항목 공유</p>
            </div>
            <div className={styles.button} style={{ width: "70px" }}>
              <img src="/assets/images/trash.png" alt="upload" />
              <p>삭제</p>
            </div>
          </div>
          <div className={styles.content_container}>
            <CheckboxGroup values={files} onChange={setFiles}>
              <File name="구름1" />
              <File name="구름2" />
            </CheckboxGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
