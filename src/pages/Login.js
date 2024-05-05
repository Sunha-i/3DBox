import React, { useState } from "react";
import "../styles/login.css";

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

  return (
    <div class="container">
      <div style={{ height: "110px" }}></div>
      <div class="title">Welcome to 3D box</div>
      <div style={{ height: "20px" }}></div>
      <img src="/assets/images/projectdesc.svg" alt="Project Description" />
      <div style={{ height: "50px" }}></div>
      <button type="button" onMouseDown={handleButtonPressing} onMouseUp={handleButtonRelease}>
        <img src={ isPressed ? "/assets/images/googlepressing.svg"
                             : "/assets/images/googledefault.svg"} alt="Login with Google" />
      </button>
    </div>
  );
}
