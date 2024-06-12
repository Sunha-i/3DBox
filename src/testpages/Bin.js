import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/bin.module.css";
import axios from "axios";
import { restoreFile, deleteFile, deleteAllFiles } from "../api/bin";
import { FolderContext } from "../context/FolderContext";

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

  const { setPutBackList } = useContext(FolderContext);

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
  }, [userId]);


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

  const handlePutBack = async () => {
    const filesToRestore = isChecked.filter(fileId => fileId !== false);
    try {
      await Promise.all(filesToRestore.map(fileId => restoreFile(fileId)));
      // Update the file list by removing the restored files
      const updatedFileList = fileList.filter(file => !filesToRestore.includes(file.file_id));
      setFileList(updatedFileList);
      setImagePaths(updatedFileList.map(file => file.s3_key));
      setIsChecked(new Array(updatedFileList.length).fill(false));
      setPutBackList(prev => [...prev, ...fileList.filter(file => filesToRestore.includes(file.file_id))]);
    } catch (error) {
      console.error('Error restoring files:', error);
    }
  };

  const handleEmpty = async () => {
    const allFileIds = fileList.map(file => file.file_id);
    try {
      await deleteAllFiles(allFileIds);
      setFileList([]);
      setImagePaths([]);
      setIsChecked([]);
    } catch (error) {
      console.error('Error emptying the bin:', error);
    }
  };

  const handleDelete = async () => {
    const filesToDelete = isChecked.filter(fileId => fileId !== false);
    try {
      await Promise.all(filesToDelete.map(fileId => deleteFile(fileId)));
      const updatedFileList = fileList.filter(file => !filesToDelete.includes(file.file_id));
      setFileList(updatedFileList);
      setImagePaths(updatedFileList.map(file => file.s3_key));
      setIsChecked(new Array(updatedFileList.length).fill(false));
    } catch (error) {
      console.error('Error deleting files:', error);
    }
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
                                      onMouseDown={() => { setIsPutBackPressed(true); if (isAnyChecked) handlePutBack(); }}
                                      onMouseUp={() => {setIsPutBackPressed(false)}} className={styles.btn}/>
          <img src={ isDeletePressed ? "/assets/images/deletebtnselected.svg"
                                     : isAnyChecked ? "/assets/images/deletebtnnormal.svg" : "/assets/images/deletebtndisabled.svg"} alt="Delete" 
                                     onMouseDown={() => { setIsDeletePressed(true); if (isAnyChecked) handleDelete(); }}
                                     onMouseUp={() => {setIsDeletePressed(false)}} className={styles.btn}/>
          <img src={ isEmptyBtnPressed ? "/assets/images/emptybtnselected.svg"
                                       :  "/assets/images/emptybtnnormal.svg"} alt="Empty Button" 
                                       onMouseDown={() => { setIsEmptyBtnPressed(true); handleEmpty(); }}
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
            <div>Nothing to delete</div>
          ) }
        </div>
      </div>
    </div>
  );
}