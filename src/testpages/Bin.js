// In Bin.js
import React, { useState } from "react";
import styles from "../styles/bin.module.css";

export default function Bin({ onClose }) {
  const [isCloseBtnPressed, setIsCloseBtnPressed] = useState(false);

  const handleButtonPressing = () => {
    setIsCloseBtnPressed(true);
  };

  const handleButtonRelease = () => {
    onClose();
  };

  return (
    <div className={styles.container}>
      <button type="button" onMouseDown={handleButtonPressing} onMouseUp={handleButtonRelease} className={styles.closeBox}>
        <img src={isCloseBtnPressed ? "/assets/images/btnactive.svg" 
                                    : "/assets/images/btndefault.svg"} alt="Close Box" />
      </button>
      <div className={styles.binZone}>
        
      </div>
    </div>
  );
}
