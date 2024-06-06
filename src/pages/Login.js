import React, { useState } from "react";
import styles from "../styles/login.module.css";

export default function Login() {

  // set status variable
  const [isPressed, setIsPressed] = useState(false);

  // handler function
  const handleButtonPressing = () => {
    setIsPressed(true);
  };
  const handleButtonRelease = () => {
    setIsPressed(false);
  };
  const handleButtonClick = () => {
    window.location.href = 'http://3.38.95.127:8080/oauth/KAKAO';
  };

  return (
    <div className={styles.container}>
      <div style={{ height: "120px" }}></div>
      <div className={styles.title}>Welcome to 3D box</div>
      <div style={{ height: "20px" }}></div>
      <object type="image/svg+xml" data="/assets/images/projectdesc.svg">
          <img src="/assets/images/projectdesc.svg" alt="Project Description" />
      </object>
      <div style={{ height: "47px" }}></div>
      <button type="button" onMouseDown={handleButtonPressing} onMouseUp={handleButtonRelease} onClick={handleButtonClick}>
        <img src={ isPressed ? "/assets/images/googlepressing.svg"
                             : "/assets/images/googledefault.svg"} alt="Login with Google" />
      </button>
    </div>
  );
}
