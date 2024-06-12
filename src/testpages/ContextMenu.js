import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/contextmenu.module.css";
import { handleDownload, handleMoveToTrash, copyFile } from "../api/file";
import { FolderContext } from "../context/FolderContext";

export default function ContextMenu({ contextId, contextType }) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);
  const { id } = useParams();
  const { checkedFiles } = useContext(FolderContext);

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
          <div className={styles["menu-item"]}>Open</div>
          <div className={styles["menu-item"]}>Rename</div>
          <div className={styles["menu-item"]}>Delete</div>
        </>
      ) : null}
    </div>
  );
}
