import React from "react";
import "../styles/header.css";

export default function Header() {
  return (
    <div className="header">
      <img
        src="/assets/images/logo.png"
        alt="logo"
        style={{ margin: "15px" }}
      />
    </div>
  );
}
