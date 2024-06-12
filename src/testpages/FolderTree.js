import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FolderContext } from "../context/FolderContext";
import styles from "../styles/foldertree.module.css";

export default function FolderTree() {
  const [toggleStatus, setToggleStatus] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const { folderTree, setTopFolderName, topFolderName } = useContext(FolderContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (folderTree) {
      const openAllFolders = (folders, status = {}) => {
        folders.forEach((folder) => {
          if (folder.type === "folder") {
            status[folder.id] = true;
            if (folder.children) {
              openAllFolders(folder.children, status);
            }
          }
        });
        return status;
      };

      const initialToggleStatus = openAllFolders(folderTree);
      setToggleStatus(initialToggleStatus);
    }
  }, [folderTree]);

  const handleToggle = (id) => {
    setToggleStatus((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleSelect = (id, name) => {
    setSelectedId(id);
    setTopFolderName(name);
    console.log(topFolderName);
    navigate(`/home/${id}`);
  };

  const RecursiveComp = ({ rowData, depth }) => {
    const paddingLeft = 10 + depth * 17;

    return (
      <>
        <div
          style={{ paddingLeft }}
          onClick={() => {
            handleSelect(rowData.id, rowData.name);
          }}
          className={`${styles.folderItem} ${
            selectedId === rowData.id ? styles.selected : ""
          }`}
        >
          <div
            className={styles.toggleHash}
            onClick={(e) => {
              e.stopPropagation();
              handleToggle(rowData.id);
            }}
          >
            <span className={styles.arrow}>#</span>
          </div>
          <div className={styles.folderName}>{rowData.name}</div>
        </div>
        {rowData.type === "folder" &&
          toggleStatus[rowData.id] &&
          rowData.children.map((v) => (
            <RecursiveComp key={v.id} rowData={v} depth={depth + 1} />
          ))}
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.treeZone}>
        {Array.isArray(folderTree) ? (
          folderTree.map((child) => (
            <RecursiveComp key={child.id} rowData={child} depth={0} />
          ))
        ) : (
          <p className={styles.loadingText}>Loading folder structure...</p>
        )}
        <div className={styles.divisionLine}>
          <div style={{ backgroundColor: "#ddd" }} className={styles.line} />
          <div style={{ backgroundColor: "#bbb" }} className={styles.line} />
          <div style={{ backgroundColor: "#999" }} className={styles.line} />
          <div style={{ backgroundColor: "#fff" }} className={styles.line} />
        </div>
        <div
          onClick={() => {
            handleSelect(null, "Sunha's folder list");
          }}
          className={`${styles.userRoot} ${
            selectedId === null ? styles.userRootSelected : ""
          }`}
        >
          <object
            type="image/svg+xml"
            data="/assets/images/osface.svg"
            className={styles.faceIcon}
          >
            <img src="/assets/images/osface.svg" alt="Face Icon" />
          </object>
          <div className={styles.userText}>Sunha's folder list</div>
        </div>
      </div>
    </div>
  );
}
