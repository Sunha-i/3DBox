import React, { useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import "../styles/home.css";
import File from "../components/File";
import CheckboxGroup from "../components/CheckBox/CheckboxGroup";

export default function Home() {
  const [files, setFiles] = useState([]);
  return (
    <div className="home">
      <Header />
      <div className="main">
        <SideBar />
        <div className="content">
          <div className="button_container">
            <div className="upload">
              <img src="/assets/images/upload.png" alt="upload" />
              <p>업로드</p>
            </div>
            <div className="create">
              <img src="/assets/images/folder-plus.png" alt="upload" />
              <p>폴더 만들기</p>
            </div>
          </div>
          <h3 style={{ margin: "0 30px" }}>모든 파일</h3>
          <div className="button_container">
            <div className="button" style={{ backgroundColor: "#4545C2" }}>
              <img src="/assets/images/upload.png" alt="upload" />
              <p style={{ color: "white" }}>다운로드</p>
            </div>
            <div className="button">
              <img src="/assets/images/rename.png" alt="upload" />
              <p>이름 변경</p>
            </div>
            <div className="button">
              <img src="/assets/images/share.png" alt="upload" />
              <p>항목 공유</p>
            </div>
            <div className="button" style={{ width: "70px" }}>
              <img src="/assets/images/trash.png" alt="upload" />
              <p>삭제</p>
            </div>
          </div>
          <div className="content_container">
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
