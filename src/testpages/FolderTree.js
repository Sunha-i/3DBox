import React, { useState } from "react";
import styles from "../styles/foldertree.module.css";

export default function FolderTree() {
  const [toggleStatus, setToggleStatus] = useState({});

  const folder1 = {
    id: "folder1",
    type: "folder",
    name: "i am folder1",
    children: [
      {
        id: "file1",
        type: "file",
        name: "i am file1",
        value: "...",
      },
      {
        id: "folder2",
        type: "folder",
        name: "i am folder2",
        children: [
          {
            id: "file2",
            type: "file",
            name: "i am file2",
            value: "...",
          },
          {
            id: "file3",
            type: "file",
            name: "i am file3",
            value: "...",
          },
          {
            id: "folder3",
            type: "folder",
            name: "i am folder3",
            children: [
              {
                id: "file4",
                type: "file",
                name: "i am file4",
                value: "...",
              },
            ],
          },
        ],
      },
    ],
  };

  const handleToggle = (id) => {
    setToggleStatus((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const RecursiveComp = ({ rowData, paddingLeft }) => {
    return (
      <div style={{ paddingLeft }}>
        <div onClick={() => rowData.type === "folder" && handleToggle(rowData.id)} className={styles.folderItem}>
          {rowData.type === "folder" && (
            <span className={styles.arrow}>
              {toggleStatus[rowData.id] ? "▼" : "▶"}
            </span>
          )}
          {rowData.name}
        </div>
        {rowData.type === "folder" && toggleStatus[rowData.id] &&
          rowData.children.map((v) => (
            <RecursiveComp key={v.id} rowData={v} paddingLeft={paddingLeft + 10} />
          ))}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <object type="image/svg+xml" data="/assets/images/foldertree.svg">
        <img src="/assets/images/foldertree.svg" alt="Folder Tree" />
      </object>
      <div className={styles.treeZone}>
        <RecursiveComp rowData={folder1} paddingLeft={10} />
      </div>
    </div>
  );
}
