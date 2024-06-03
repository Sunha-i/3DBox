import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/foldercontents.module.css";
import { handleDownload, handleMoveToTrash } from "../api/file";
import { createFolder } from "../api/folder";

export default function FolderContents() {
  const rootFolderId = localStorage.getItem("rootFolderId"); // 로컬 스토리지에서 root folder id 가져오기
  const userId = localStorage.getItem("userId"); // 로컬 스토리지에서 userId 가져오기

  const [isZoomed, setIsZoomed] = useState(false);
  const [isChecked, setIsChecked] = useState([]);

  const [editIndex, setEditIndex] = useState(null);
  const [newName, setNewName] = useState("");
  const [newFolderName, setNewFolderName] = useState("New folder");
  const [filesList, setFileList] = useState([]);
  const [folderList, setFolderList] = useState([]);
  const [imagePaths, setImagePaths] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  const spanRef = useRef(null);
  const [inputWidth, setInputWidth] = useState(0);

  useEffect(() => {
    if (spanRef.current) {
      setInputWidth(spanRef.current.getBoundingClientRect().width + 10);
    }
  }, [newName, newFolderName]);

  const toggleCheck = (index) => {
    setIsChecked((prev) => {
      const newChecked = [...prev];
      // newChecked[index] = !newChecked[index];
      if (newChecked[index]) {
        newChecked[index] = false;
      } else {
        newChecked[index] = filesList[index].file_id;
      }
      console.log(newChecked);
      return newChecked;
    });
  };

  const toggleZoom = () => {
    setIsZoomed((prev) => !prev);
  };

  const handleDoubleClick = (index) => {
    setEditIndex(index);
    setNewName(folderList[index].folder_name);
  };

  const handleInputChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNewFolderInputChange = (e) => {
    setNewFolderName(e.target.value);
  }

  // 폴더 이름 수정
  const changeFolderName = async (index) => {
    const folderId = folderList[index].folder_id;
    try {
      const response = await fetch(
        `http://144.24.83.40:8080/folder/${folderId}/name/${newName}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const updatedNames = [...folderList];
        updatedNames[index].folder_name = newName;
        setFolderList(updatedNames);
        setEditIndex(null);
      } else {
        console.error("Error updating folder name:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating folder name:", error);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      changeFolderName(index);
    }
  };

  // 폴더 내 파일 정보 조회
  const fetchFileData = async () => {
    try {
      const response = await fetch(
        `http://144.24.83.40:8080/folder/child/file/${rootFolderId}`
      );
      const data = await response.json();
      console.log("File", data.files);
      setFileList(data.files);
      const newImagePaths = data.files.map((file) => file.s3_key);
      setImagePaths(newImagePaths);
      setIsChecked(new Array(newImagePaths.length).fill(false));
    } catch (error) {
      console.error("Error fetching folder data:", error);
    }
  };

  // 하위 폴더 조회
  const fetchFolderData = async () => {
    try {
      const response = await fetch(
        `http://144.24.83.40:8080/folder/child/folder/${rootFolderId}`
      );
      const data = await response.json();
      console.log("Folder", data.folders);
      setFolderList(data.folders);
    } catch (error) {
      console.error("Error fetching folder data:", error);
    }
  };

  const handleDownloadSelected = async () => {
    const selectedFileIds = isChecked.filter((id) => id !== false);
    for (const fileId of selectedFileIds) {
      await handleDownload(fileId);
    }
  };

  const handleTrashSelected = async () => {
    const selectedFileIds = isChecked.filter((id) => id !== false);
    for (const fileId of selectedFileIds) {
      await handleMoveToTrash(fileId);
    }

    // Filter out the trashed files from fileList and imagePaths
    const updatedFileList = filesList.filter((file) => !selectedFileIds.includes(file.file_id));
    const updatedImagePaths = updatedFileList.map((file) => file.s3_key);

    setFileList(updatedFileList);
    setImagePaths(updatedImagePaths);
    setIsChecked(new Array(updatedImagePaths.length).fill(false));
  };

  useEffect(() => {
    fetchFileData();
    fetchFolderData();
  }, [rootFolderId]);

  return (
    <div className={styles.container}>
      <object type="image/svg+xml" data="/assets/images/foldercontents.svg">
        <img src="/assets/images/foldercontents.svg" alt="Folder Window" />
      </object>
      <div className={styles.titleBar}>
        <object type="image/svg+xml" data="/assets/images/leftbar.svg">
          <img src="/assets/images/leftbar.svg" alt="Left Bar" />
        </object>
        <div>Folder name</div>
        <object type="image/svg+xml" data="/assets/images/rightbar.svg">
          <img src="/assets/images/rightbar.svg" alt="Right Bar" />
        </object>
      </div>
      <div className={styles.contentsZone}>
        <div className={styles.actionZone}>
          <div className={styles.childFolders}>
            {folderList.map((folder, index) => (
              <div key={folder.folder_id} className={styles.folderList}>
                <object type="image/svg+xml" data="/assets/images/folder.svg">
                  <img src="/assets/images/folder.svg" alt="Upload Zone" />
                </object>
                <div className={styles.blankBox}></div>
                {editIndex === index ? (
                  <div>
                    <input
                      type="text"
                      value={newName}
                      onChange={handleInputChange}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className={styles.input}
                      style={{ width: `${inputWidth}px` }}
                    />
                    <span ref={spanRef} className={styles.hiddenSpan}>
                      {newName}
                    </span>
                  </div>
                ) : (
                  <div
                    key={index}
                    className={styles.name}
                    onDoubleClick={() => handleDoubleClick(index)}
                  >
                    {folder.folder_name}
                  </div>
                )}
              </div>
            ))}
            {isCreating && <div className={styles.folderList}>
              <object type="image/svg+xml" data="/assets/images/folder.svg">
                <img src="/assets/images/folder.svg" alt="Upload Zone" />
              </object>
              <div className={styles.blankBox}></div>
              <div>
                <input
                  type="text"
                  value={newFolderName}
                  onChange={handleNewFolderInputChange}
                  className={styles.input}
                  style={{ width: `${inputWidth}px` }}
                />
                <span ref={spanRef} className={styles.hiddenSpan}>
                  {newFolderName}
                </span>
              </div>
            </div>}
          </div>
          <div className={styles.options}>
            <div className={styles.toolBar}>
              <button className={`${styles.toolBtn} ${styles["tool-GAN"]}`}>
                <object
                  type="image/svg+xml"
                  data="/assets/images/GAN.svg"
                  style={{ pointerEvents: "none" }}
                >
                  <img src="/assets/images/GAN.svg" alt="GAN" />
                </object>
              </button>
              <button
                className={`${styles.toolBtn} ${
                  isZoomed ? styles.zoomedBtn : ""
                }`}
                onClick={toggleZoom}
              >
                <object
                  type="image/svg+xml"
                  data="/assets/images/zoom.svg"
                  style={{ pointerEvents: "none" }}
                >
                  <img src="/assets/images/zoom.svg" alt="Zoom" />
                </object>
              </button>
              <button
                className={styles.toolBtn}
                onClick={handleDownloadSelected}
              >
                <object
                  type="image/svg+xml"
                  data="/assets/images/download.svg"
                  style={{ pointerEvents: "none" }}
                >
                  <img src="/assets/images/download.svg" alt="Download" />
                </object>
              </button>
              <button className={styles.toolBtn} onClick={handleTrashSelected}>
                <object
                  type="image/svg+xml"
                  data="/assets/images/delete.svg"
                  style={{ pointerEvents: "none" }}
                >
                  <img src="/assets/images/delete.svg" alt="Delete" />
                </object>
              </button>
              <button className={styles.toolBtn} onClick={() => setIsCreating(!isCreating)}>
                <object
                  type="image/svg+xml"
                  data="/assets/images/newfolder.svg"
                  style={{ pointerEvents: "none" }}
                >
                  <img
                    src="/assets/images/newfolder.svg"
                    alt="Add new folder"
                  />
                </object>
              </button>
              <button className={styles.toolBtn}>
                <object
                  type="image/svg+xml"
                  data="/assets/images/newfolder.svg"
                  style={{ pointerEvents: "none" }}
                >
                  <img
                    src="/assets/images/newfolder.svg"
                    alt="Add new folder"
                  />
                </object>
              </button>
              <button className={styles.toolBtn}>
                <object
                  type="image/svg+xml"
                  data="/assets/images/newfolder.svg"
                  style={{ pointerEvents: "none" }}
                >
                  <img
                    src="/assets/images/newfolder.svg"
                    alt="Add new folder"
                  />
                </object>
              </button>
            </div>
          </div>
        </div>
        <div className={styles.gridZone}>
          {imagePaths.map((path, idx) => (
            <div
              key={idx}
              className={`${styles.squareBox} ${
                isZoomed ? styles.zoomedBox : ""
              }`}
              onClick={() => toggleCheck(idx)}
            >
              <img
                src={path}
                alt={`Image ${idx + 1}`}
                className={styles.squareImage}
              />
              <div
                className={`${styles.smallBox} ${
                  isZoomed ? styles.zoomedSmall : ""
                }`}
              >
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
          ))}
        </div>
      </div>
    </div>
  );
}
