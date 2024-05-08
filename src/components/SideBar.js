import React from "react";
import "../styles/sidebar.css";

export default function SideBar() {
  return (
    <div className="sidebar">
      <div className="container clicked">
        <p>모든 파일</p>
      </div>
      <div className="container">
        <p>즐겨찾기</p>
      </div>
    </div>
  );
}
