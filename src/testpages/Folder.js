import React, { useState } from "react";
import styles from "../styles/folder.module.css";
import Dragcont from "../components/Dragcont";
import File from "./File";
import Trash from "./Trash";
import { FileProvider } from "../components/ContextFile";

export default function Folder() {
  const [editIndex, setEditIndex] = useState(null);
  const [folderList, setFolderList] = useState([
    "Project",
    "Music",
    "Videos",
    "Work",
  ]);
  const [newName, setNewName] = useState("");
  const [images, setImages] = useState([]);

  const handleDoubleClick = (index) => {
    setEditIndex(index);
    setNewName(folderList[index]);
  };

  const handleInputChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSave = (index) => {
    const updatedNames = [...folderList];
    updatedNames[index] = newName;
    setFolderList(updatedNames);
    setEditIndex(null);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      handleSave(index);
    }
  };

  const handleDelete = (id) => {
    setImages((prevImages) => prevImages.filter((_, index) => index !== id));
  };

  return (
    <FileProvider>
      <div className={styles.background}>
        <Dragcont>
          <div className={styles.folder_zone}>
            <p className={styles.text}>4 items, {} MB available</p>
            <div className={styles.folder_container}>
              {folderList.map((name, index) => (
                <div key={index} className={styles.folder}>
                  <img src="/assets/images/folder.png" alt="folder" />
                  {editIndex === index ? (
                    <div>
                      <input
                        type="text"
                        value={newName}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className={styles.input}
                      />
                      <button
                        onClick={() => handleSave(index)}
                        className={styles.button}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div
                      key={index}
                      className={styles.name}
                      onDoubleClick={() => handleDoubleClick(index)}
                    >
                      {name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Dragcont>
        <File />
      </div>
    </FileProvider>
  );
}
