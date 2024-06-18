import React, { useState } from "react";
import styles from "../styles/gan.module.css";

export default function Gan({ onClose }) {
  const [isCloseBtnPressed, setIsCloseBtnPressed] = useState(false);
  const [isEmptyBtnPressed, setIsEmptyBtnPressed] = useState(false);
  const [ganImage, setGanImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("9997");
  const [year, setYear] = useState("0");

  const handleButtonPressing = () => {
    setIsCloseBtnPressed(true);
  };

  const handleButtonRelease = () => {
    onClose();
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://3.38.95.127:8080/folder/child/file/${type}`, {
        method: 'GET',
        headers: {
          'accept': '*/*'
        }
      });
      const result = await response.json();
      console.log(result);
      if (result.files && result.files.length > 0) {
        setGanImage(result.files[year].s3_key);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
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
            <select onChange={(e) => {
              const selectedYear = e.target.value;
              switch(selectedYear) {
                case '2003':
                  setYear(0);
                  break;
                case '2006':
                  setYear(1);
                  break;
                case '2009':
                  setYear(2);
                  break;
                default:
                  setYear(0);
              }
            }} className={styles.dropDownYear}>
              <option key="2003" value="2003">2003</option>
              <option key="2006" value="2006">2006</option>
              <option key="2009" value="2009">2009</option>
            </select>
          </div>
          <div className={styles.selectTheme}>
            <div>Theme:</div>
            <select onChange={(e) => {
            const selectedType = e.target.value;
              switch(selectedType) {
                case 'cartoon':
                  setType("9997");
                  break;
                case 'illustration':
                  setType("9998");
                  break;
                case 'fantasy':
                  setType("9999");
                  break;
                default:
                  setType("9997");
              }
            }} className={styles.dropDownTheme}>
              <option key="cartoon" value="cartoon">Cartoon</option>
              <option key="illustration" value="illustration">Illustration</option>
              <option key="fantasy" value="fantasy">Fantasy</option>
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
              {loading && <p>Loading...</p>}
              {ganImage && <img src={ganImage} alt="gan" className="" />}
            </div>
        </div>
      </div>
    </div>
  );
}