import React, { useState, useRef, useEffect, useMemo, useContext } from "react";
import styles from "../styles/foldercontents.module.css";
import { handleDownload, handleMoveToTrash } from "../api/file";
import { createFolder } from "../api/folder";
import { useNavigate } from "react-router-dom";
import { FolderContext } from "../context/FolderContext";
import { useParams } from "react-router-dom";

export default function FolderContents({ folderId }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const { uploadImages, setTopFolderName, topFolderName, putBackList, setPutBackList } = useContext(FolderContext);
  const rootFolderId = localStorage.getItem("rootFolderId"); // 로컬 스토리지에서 root folder id 가져오기
  const userId = localStorage.getItem("userId"); // 로컬 스토리지에서 userId 가져오기

  //const [folderId, setFolderId] = useState(paramFolderId || rootFolderId);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isChecked, setIsChecked] = useState([]);

  const [editIndex, setEditIndex] = useState(null);
  const [newName, setNewName] = useState("");
  const [newFolderName, setNewFolderName] = useState("Untitled folder"); // 폴더 생성 시 사용할
  const [fileList, setFileList] = useState([]);
  const [folderList, setFolderList] = useState([]);
  const [imagePaths, setImagePaths] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isWriting, setIsWriting] = useState(false);

  const spanRef = useRef(null);
  const inputRef = useRef(null);
  const [inputWidth, setInputWidth] = useState(0);

  useEffect(() => {
    if (spanRef.current) {
      setInputWidth(spanRef.current.getBoundingClientRect().width + 10);
    }
  }, [newName, newFolderName, isWriting]);

  useEffect(() => {
    // input 바깥 눌렀을 때
    const handleClick = (event) => {
      if (
        editIndex !== null &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        changeFolderName(editIndex);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [newName, newFolderName, editIndex]);

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
  };

  // 폴더 이름 수정
  const changeFolderName = async (index) => {
    const selectedFolderId = folderList[index].folder_id;
    try {
      const response = await fetch(
        `http://3.38.95.127:8080/folder/${selectedFolderId}/name/${newName}`,
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
      if (index === null) {
        handleCreateFolder();
        setIsCreating(false);
      } else {
        changeFolderName(index);
      }
    }
  };

  // 폴더 내 파일 정보 조회
  const fetchFileData = async (id) => {
    try {
      const response = await fetch(
        `http://3.38.95.127:8080/folder/child/file/${id}`
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

  // 폴더 내 하위 폴더 조회
  const fetchFolderData = async (id) => {
    try {
      const response = await fetch(
        `http://3.38.95.127:8080/folder/child/folder/${id}`
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

    // 파일 휴지통 이동 후 재정렬
    const updatedFileList = fileList.filter(
      (file) => !selectedFileIds.includes(file.file_id)
    );
    const updatedImagePaths = updatedFileList.map((file) => file.s3_key);

    setFileList(updatedFileList);
    setImagePaths(updatedImagePaths);
    setIsChecked(new Array(updatedImagePaths.length).fill(false));
  };

  useEffect(() => {
    const id = folderId || rootFolderId;
    fetchFileData(id);
    fetchFolderData(id);
  }, [folderId, rootFolderId, uploadImages, putBackList]);

  const handleFolderClick = (folderId, name) => {
    navigate(`/home/${folderId}`);
    setTopFolderName(name);
    fetchFileData(folderId);
    fetchFolderData(folderId);
  };

  const prevFolderClick = () => {
    navigate(-1);
  };

  const handleCreateFolder = useMemo(
    () => async () => {
      try {
        const newFolder = await createFolder(newFolderName, userId, id);
        if (newFolder) {
          // 폴더 생성 후 로딩 상태 해제
          setFolderList((prevFolderList) => [
            ...prevFolderList,
            {
              folder_id: newFolder.folder_id,
              folder_name: newFolder.folder_name,
            },
          ]);
          console.log("새폴더", newFolder);
          fetchFolderData(id);
        }
      } catch (error) {
        console.error("Error creating new folder:", error);
        setIsCreating(false);
      }
    },
    [newFolderName, userId, id]
  );

  const getFileId = (index) => {
    return fileList[index].file_id;
  };

  const dragStartHandler = (e, idx) => {
    const fileId = getFileId(idx);
    e.dataTransfer.setData("text/plain", fileId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleBar}>
        <div>{id !== rootFolderId ? topFolderName : "Sunha's folder"}</div>
      </div>
      <div className={styles.contentsZone}>
        <div className={styles.actionZone}>
          <div className={styles.childFolders}>
            {folderList.map((folder, index) => (
              <div
                key={folder.folder_id}
                className={styles.folderList}
                onClick={() =>
                  handleFolderClick(folder.folder_id, folder.folder_name)
                }
              >
                <object type="image/svg+xml" data="/assets/images/folder.svg">
                  <img src="/assets/images/folder.svg" alt="Upload Zone" />
                </object>
                <div className={styles.blankBox}></div>
                {editIndex === index ? (
                  <div>
                    <input
                      type="text"
                      ref={inputRef}
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
                    key={folder.folder_id}
                    className={styles.name}
                    onDoubleClick={() => handleDoubleClick(index)}
                  >
                    {folder.folder_name}
                  </div>
                )}
              </div>
            ))}
            {isCreating && (
              <div key="creating-folder" className={styles.folderList}>
                <object type="image/svg+xml" data="/assets/images/folder.svg">
                  <img src="/assets/images/folder.svg" alt="Upload Zone" />
                </object>
                <div className={styles.blankBox}></div>

                <div key="new-folder">
                  <input
                    type="text"
                    ref={inputRef}
                    value={newFolderName}
                    onChange={handleNewFolderInputChange}
                    onKeyDown={(e) => handleKeyDown(e, null)}
                    className={styles.input}
                    style={{ width: `${inputWidth}px` }}
                  />
                  <span ref={spanRef} className={styles.hiddenSpan}>
                    {newFolderName}
                  </span>
                </div>
              </div>
            )}
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
              <button
                className={styles.toolBtn}
                onClick={() => {
                  setIsCreating(true);
                  setIsWriting(true);
                  setNewFolderName("Untitled Folder");
                }}
              >
                <object
                  type="image/svg+xml"
                  data="/assets/images/newfolder.svg"
                  style={{ pointerEvents: "none" }}
                  className={styles.folderIcon}
                >
                  <img
                    src="/assets/images/newfolder.svg"
                    alt="Add new folder"
                  />
                </object>
              </button>
              <button className={styles.toolBtn}>
                <img
                  src="/assets/images/heart.png"
                  alt="Favorite Image"
                  className={styles.myfavorite}
                />
              </button>
            </div>
          </div>
        </div>
        
        <div className={styles.divider}>
          <div style={{ backgroundColor: "#ddd" }} className={styles.line} />
          <div style={{ backgroundColor: "#bbb" }} className={styles.line} />
          <div style={{ backgroundColor: "#999" }} className={styles.line} />
          <div style={{ backgroundColor: "#fff" }} className={styles.line} />
        </div>
        
        <div className={styles.gridZone}>
          {fileList && fileList.length > 0 ? (
            imagePaths.map((path, idx) => (
              <div
                key={idx}
                className={`${styles.squareBox} ${
                  isZoomed ? styles.zoomedBox : ""
                }`}
                draggable="true"
                onDragStart={(e) => dragStartHandler(e, idx)}
                onClick={() => toggleCheck(idx)}
              >
                <img
                  src={path}
                  alt={`image ${idx + 1}`}
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
            ))
          ) : (
            <div>No files in this folder</div>
          )}
        </div>
      </div>
    </div>
  );
}