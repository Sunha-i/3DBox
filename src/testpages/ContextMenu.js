import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/contextmenu.module.css";
import Divider from "../components/Divider";
import { handleDownload, handleMoveToTrash, copyFile, fetchFileData } from "../api/file";
import { handleFolderToTrash, fetchFolderData } from "../api/folder";
import { FolderContext } from "../context/FolderContext";

export default function ContextMenu({ contextId, contextType }) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { checkedFiles, setEditIndex, setUpdatedFileList, setRenameFolderInfo, isEditing, setIsEditing } = useContext(FolderContext);

  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
      setPosition({ x: event.pageX, y: event.pageY });
      setVisible(true);
    };

    const handleClick = () => {
      setVisible(false);
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleMenuClick = async (action) => {
    const targetIds = checkedFiles.length > 0 ? checkedFiles : [contextId];

    for (const targetId of targetIds) {
      if (contextType === "file") {
        switch (action) {
          case "download":
            await handleDownload(targetId);
            break;
          case "delete":
            await handleMoveToTrash(targetId);
            break;
          case "copy":
            await copyFile(targetId, id);
            break;
          default:
            break;
        }
      } 
    }

    if (contextType === "folder") {
      switch (action) {
        case "deletefolder":
          await handleFolderToTrash(contextId);
          break;
        case "rename":
          setIsEditing(true);
          setEditIndex(contextId);
          break;
        default:
          break;
      }
    }
    
    const updatedFiles = await fetchFileData(id);
    const updatedFolders = await fetchFolderData(id);
    setUpdatedFileList({ files: updatedFiles, folders: updatedFolders });
  };

  return (
    <div
      ref={menuRef}
      className={`${styles.container} ${visible ? styles.active : ""}`}
      style={{ top: position.y, left: position.x }}
    >
      {contextType === "file" ? (
        <>
          <div className={styles["menu-item"]} onClick={() => handleMenuClick("download")}>Download</div>
          <Divider />
          <div className={styles["menu-item"]} onClick={() => handleMenuClick("delete")}>Delete</div>
          <Divider />
          <div className={styles["menu-item"]} onClick={() => handleMenuClick("copy")}>Duplicate</div>
        </>
      ) : contextType === "folder" ? (
        <>
          <div className={styles["menu-item"]} onClick={() => navigate(`/home/${contextId}`)}>Open</div>
          <Divider />
          <div className={styles["menu-item"]} onClick={() => handleMenuClick("rename") }>Rename</div>
          <Divider />
          <div className={styles["menu-item"]} onClick={() => { handleMenuClick("deletefolder"); setRenameFolderInfo(contextId); }}>Delete</div>
        </>
      ) : null}
    </div>
  );
}
