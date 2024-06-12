import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/contextmenu.module.css";
import { handleDownload, handleMoveToTrash, copyFile } from "../api/file";
import { handleFolderToTrash } from "../api/folder";
import { FolderContext } from "../context/FolderContext";

export default function ContextMenu({ contextId, contextType }) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { checkedFiles, setEditIndex } = useContext(FolderContext);

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
        case "deletefolder":
          await handleFolderToTrash(targetId);
          break;
        case "rename":
          setEditIndex(targetId);
          break;
        default:
          break;
      }
    }
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
          <div className={styles["menu-item"]} onClick={() => handleMenuClick("delete")}>Delete</div>
          <div className={styles["menu-item"]} onClick={() => handleMenuClick("copy")}>Copy</div>
        </>
      ) : contextType === "folder" ? (
        <>
          <div className={styles["menu-item"]} onClick={() => navigate(`/home/${contextId}`)}>Open</div>
          <div className={styles["menu-item"]} onClick={() => handleMenuClick("rename")}>Rename</div>
          <div className={styles["menu-item"]} onClick={() => handleMenuClick("deletefolder")}>Delete</div>
        </>
      ) : null}
    </div>
  );
}
