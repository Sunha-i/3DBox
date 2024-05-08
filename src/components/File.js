import React from "react";
import "../styles/file.css";
import Checkbox from "./CheckBox/Checkbox";

export default function File({ name }) {
  return (
    <div className="file">
      <div className="file_container">
        <Checkbox value={name} />
        <img src="/assets/images/cloud.png" alt="cloud" />
      </div>
      <p>{name}</p>
    </div>
  );
}
