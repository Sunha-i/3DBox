import React, { useState, useEffect } from "react";
import styles from "../styles/bin.module.css";
import axios from "axios";

export default function Bin({ onClose }) {
  const userId = localStorage.getItem("userId");
  const [isCloseBtnPressed, setIsCloseBtnPressed] = useState(false);
  const [isEmptyBtnPressed, setIsEmptyBtnPressed] = useState(false);
  const [isPutBackPressed, setIsPutBackPressed] = useState(false);
  const [isDeletePressed, setIsDeletePressed] = useState(false);

  const [fileList, setFileList] = useState([]);
  const [folderList, setFolderList] = useState([]);
  const [imagePaths, setImagePaths] = useState([]);
  const [isChecked, setIsChecked] = useState([]);

  useEffect(() => {
    // Fetch data from API on component mount
    axios.post('http://3.38.95.127:8080/folder/trash', {
      userId: userId
    })
    .then(response => {
      const { filesInfo, foldersInfo } = response.data;
      setFileList(filesInfo.trashFiles);
      setFolderList(foldersInfo.folders);
      setImagePaths(filesInfo.trashFiles.map(file => file.s3_key));
      setIsChecked(new Array(filesInfo.trashFiles.length).fill(false));
    })
    .catch(error => {
      console.error("There was an error fetching the data!", error);
    });
  }, []);


  const handleButtonPressing = () => {
    setIsCloseBtnPressed(true);
  };

  const handleButtonRelease = () => {
    onClose();
  };

  const toggleCheck = (index) => {
    setIsChecked((prev) => {
      const newChecked = [...prev];
      if (newChecked[index]) {
        newChecked[index] = false;
      } else {
        newChecked[index] = fileList[index].file_id;
      }
      console.log(newChecked);
      return newChecked;
    });
  };

  const isAnyChecked = isChecked.some((value) => value !== false);

  return (
    <div className={styles.container}>
      <button type="button" onMouseDown={handleButtonPressing} onMouseUp={handleButtonRelease} className={styles.closeBox}>
        <img src={isCloseBtnPressed ? "/assets/images/btnactive.svg" 
                                    : "/assets/images/btndefault.svg"} alt="Close Box" />
      </button>
      <div className={styles.binZone}>
        <div className={styles.binMenu}>
          <img src={ isPutBackPressed ? "/assets/images/putbackselected.svg"
                                      : "/assets/images/putbacknormal.svg"} alt="Put Back" 
                                      onMouseDown={() => {setIsPutBackPressed(true)}}
                                      onMouseUp={() => {setIsPutBackPressed(false)}} className={styles.btn}/>
          <img src={ isDeletePressed ? "/assets/images/deletebtnselected.svg"
                                     : isAnyChecked ? "/assets/images/deletebtnnormal.svg" : "/assets/images/deletebtndisabled.svg"} alt="Delete" 
                                     onMouseDown={() => {setIsDeletePressed(true)}}
                                     onMouseUp={() => {setIsDeletePressed(false)}} className={styles.btn}/>
          <img src={ isEmptyBtnPressed ? "/assets/images/emptybtnselected.svg"
                                       :  "/assets/images/emptybtnnormal.svg"} alt="Empty Button" 
                                       onMouseDown={() => {setIsEmptyBtnPressed(true)}}
                                       onMouseUp={() => {setIsEmptyBtnPressed(false)}} className={styles.btn}/>
        </div>
        <div className={styles.divisionLine}>
          <div style={{ backgroundColor: "#ddd" }} className={styles.line} />
          <div style={{ backgroundColor: "#bbb" }} className={styles.line} />
          <div style={{ backgroundColor: "#999" }} className={styles.line} />
          <div style={{ backgroundColor: "#fff" }} className={styles.line} />
        </div>
        <div className={styles.gridZone}>
          {fileList && fileList.length > 0? (
            imagePaths.map((path, idx) => (
              <div
                key={idx}
                className={styles.squareBox}
                onClick={() => toggleCheck(idx)}
              >
                <img
                  src={path}
                  alt={`image ${idx + 1}`}
                  className={styles.squareImage}
                />
                <div className={styles.smallBox}>
                  {isChecked[idx] && (
                    <object
                      type="image/svg+xml"
                      data="/assets/images/checkmark.svg"
                      className={styles.check}
                      style={{ pointerEvents: "none" }}
                    >
                      <img src="/assets/images/checkmark.svg" alt="Checkmark" />
                    </object>
                  )}
                </div>
              </div>
            ))
          ):(
            <div>No files in this folder</div>
          ) }
        </div>
      </div>
    </div>
  );
}