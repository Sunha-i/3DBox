import React, { useContext, useState, useEffect } from "react";
import { FolderContext } from "../context/FolderContext";
import styles from "../styles/foldertree.module.css";
import Dragcont from "../components/Dragcont";

export default function FolderTree() {
  const [toggleStatus, setToggleStatus] = useState({});
  const [folderInfo, setFolderInfo] = useState(null);
  const { folderTree } = useContext(FolderContext);

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

  const handleFetchFolder = async (id) => {
    try {
      const response = await fetch(`http://144.24.83.40:8080/file/${id}`);
      const data = await response.json();
      setFolderInfo(data);
    } catch (error) {
      console.error("Error fetching folder info:", error);
      setFolderInfo(null);
    }
  };

  const RecursiveComp = ({ rowData, paddingLeft }) => {
    return (
      <div style={{ paddingLeft }}>
        <div
          onClick={() => rowData.type === "folder" && handleToggle(rowData.id)}
          className={styles.folderItem}
        >
          {rowData.type === "folder" && (
            <span className={styles.arrow}>
              {toggleStatus[rowData.id] ? "▼" : "▶"}
            </span>
          )}
          {rowData.name}
        </div>
        {rowData.type === "folder" &&
          toggleStatus[rowData.id] &&
          rowData.children.map((v) => (
            <RecursiveComp
              key={v.id}
              rowData={v}
              paddingLeft={paddingLeft + 10}
            />
          ))}
        {rowData.type === "file" && (
          <button
            onClick={() => handleFetchFolder(rowData.id)}
            className={styles.fetchButton}
          >
            Fetch Info
          </button>
        )}
      </div>
    );
  };

  return (
    <Dragcont>
      <div className={styles.container}>
        <object type="image/svg+xml" data="/assets/images/foldertree1.svg">
          <img src="/assets/images/foldertree1.svg" alt="Folder Tree" />
        </object>
        <div className={styles.treeZone}>
          {Array.isArray(folderTree) ? (
            folderTree.map((child) => (
              <RecursiveComp key={child.id} rowData={child} paddingLeft={10} />
            ))
          ) : (
            <p>Loading folder structure...</p>
          )}
        </div>
      </div>
      <div className={styles.container}>
        {folderInfo && (
          <div className={styles.fileInfo}>
            <h3>File Information</h3>
            <p>ID: {folderInfo.id}</p>
            <p>Name: {folderInfo.name}</p>
            <p>Type: {folderInfo.type}</p>
            {/* Add more fields as necessary */}
          </div>
        )}
      </div>
    </Dragcont>
  );
}
