import React, { useState } from "react";
import styles from "../styles/gan.module.css";

export default function Gan({ onClose }) {
  const [isCloseBtnPressed, setIsCloseBtnPressed] = useState(false);
  const [isEmptyBtnPressed, setIsEmptyBtnPressed] = useState(false);

  const handleButtonPressing = () => {
    setIsCloseBtnPressed(true);
  };

  const handleButtonRelease = () => {
    onClose();
  };

  const handleCreate = async () => {
  };

  return (
    <div className={styles.container}>
      <button type="button" onMouseDown={handleButtonPressing} onMouseUp={handleButtonRelease} className={styles.closeBox}>
        <img src={isCloseBtnPressed ? "/assets/images/btnactive.svg" 
                                    : "/assets/images/btndefault.svg"} alt="Close Box" />
      </button>
      <div className={styles.ganZone}>
        <div className={styles.selectZone}>
          <div className={styles.selectYear}>
            <div>Year:</div>
            <select className={styles.dropDownYear}>
              <option key="banana" value="banana">2013</option>
              <option key="apple" value="apple">2015</option>
              <option key="orange" value="orange">2017</option>
            </select>
          </div>
          <div className={styles.selectTheme}>
            <div>Theme:</div>
            <select className={styles.dropDownTheme}>
              <option key="banana" value="banana">Cartoon</option>
              <option key="apple" value="apple">Illustration</option>
              <option key="orange" value="orange">Fantasy</option>
            </select>
          </div>
          <img src={ isEmptyBtnPressed ? "/assets/images/createbtnselected.svg"
                                       : "/assets/images/createbtnnormal.svg"} alt="Empty Button" 
                                       onMouseDown={() => { setIsEmptyBtnPressed(true); handleCreate(); }}
                                       onMouseUp={() => {setIsEmptyBtnPressed(false)}} className={styles.btn}/>
        </div>
        <div className={styles.divisionLine}>
          <div style={{ backgroundColor: "#ddd" }} className={styles.line} />
          <div style={{ backgroundColor: "#bbb" }} className={styles.line} />
          <div style={{ backgroundColor: "#999" }} className={styles.line} />
          <div style={{ backgroundColor: "#fff" }} className={styles.line} />
        </div>
        <div className={styles.resultZone}>
            <div className={styles.ganResult}>

            </div>
        </div>
      </div>
    </div>
  );
}