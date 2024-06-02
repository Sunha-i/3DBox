import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/foldercontents.module.css";

// Manually list the image paths
const imagePaths = [
  "/assets/images/dummy/IMG_0002 1.png",
  "/assets/images/dummy/IMG_0014 1.png",
  "/assets/images/dummy/IMG_0018 1.png",
  "/assets/images/dummy/IMG_0033 1.png",
  "/assets/images/dummy/IMG_0047 1.png",
  "/assets/images/dummy/IMG_0057 1.png",
  "/assets/images/dummy/IMG_0058 1.png",
  "/assets/images/dummy/IMG_0060 1.png",
  "/assets/images/dummy/IMG_0063 1.png",
  "/assets/images/dummy/IMG_0075 1.png",
  "/assets/images/dummy/IMG_0120 1.png",
];

export default function FolderContents() {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isChecked, setIsChecked] = useState(Array(imagePaths.length).fill(false));

  const [editIndex, setEditIndex] = useState(null);
  const [newName, setNewName] = useState("");
  const [folderList, setFolderList] = useState([
    "Project",
    "Music",
    "Videos",
    "Work",
  ]);

  const spanRef = useRef(null);
  const [inputWidth, setInputWidth] = useState(0);

  useEffect(() => {
    if (spanRef.current) {
      setInputWidth(spanRef.current.getBoundingClientRect().width + 10);
    }
  }, [newName]);

  const toggleCheck = (index) => {
    setIsChecked((prev) => {
      const newChecked = [...prev];
      newChecked[index] = !newChecked[index];
      return newChecked;
    });
  };

  const toggleZoom = () => {
    setIsZoomed((prev) => !prev);
  };

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
            {folderList.map((name, index) => (
              <div key={index} className={styles.folderList}>
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
                    <span ref={spanRef} className={styles.hiddenSpan}>{newName}</span>
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
          <div className={styles.options}>
            <div className={styles.toolBar}>
              <button className={`${styles.toolBtn} ${styles['tool-GAN']}`}>
                <object type="image/svg+xml" data="/assets/images/GAN.svg" style={{ pointerEvents: 'none' }}>
                  <img src="/assets/images/GAN.svg" alt="GAN" />
                </object>
              </button>
              <button
                className={`${styles.toolBtn} ${isZoomed ? styles.zoomedBtn : ""}`}
                onClick={toggleZoom}
              >
                <object type="image/svg+xml" data="/assets/images/zoom.svg" style={{ pointerEvents: 'none' }}>
                  <img src="/assets/images/zoom.svg" alt="Zoom" />
                </object>
              </button>
              <button className={styles.toolBtn}>
                <object type="image/svg+xml" data="/assets/images/download.svg" style={{ pointerEvents: 'none' }}>
                  <img src="/assets/images/download.svg" alt="Download" />
                </object>
              </button>
              <button className={styles.toolBtn}>
                <object type="image/svg+xml" data="/assets/images/delete.svg" style={{ pointerEvents: 'none' }}>
                  <img src="/assets/images/delete.svg" alt="Delete" />
                </object>
              </button>
              <button className={styles.toolBtn}>
                <object type="image/svg+xml" data="/assets/images/newfolder.svg" style={{ pointerEvents: 'none' }}>
                  <img src="/assets/images/newfolder.svg" alt="Add new folder" />
                </object>
              </button>
              <button className={styles.toolBtn}>
                <object type="image/svg+xml" data="/assets/images/newfolder.svg" style={{ pointerEvents: 'none' }}>
                  <img src="/assets/images/newfolder.svg" alt="Add new folder" />
                </object>
              </button>
              <button className={styles.toolBtn}>
                <object type="image/svg+xml" data="/assets/images/newfolder.svg" style={{ pointerEvents: 'none' }}>
                  <img src="/assets/images/newfolder.svg" alt="Add new folder" />
                </object>
              </button>
            </div>
          </div>
        </div>
        <div className={styles.gridZone}>
          {imagePaths.map((path, idx) => (
            <div
              key={idx}
              className={`${styles.squareBox} ${isZoomed ? styles.zoomedBox : ""}`}
              onClick={() => toggleCheck(idx)}
            >
              <img src={path} alt={`Image ${idx + 1}`} className={styles.squareImage} />
              <div className={`${styles.smallBox} ${isZoomed ? styles.zoomedSmall : ""}`}>
                {isChecked[idx] && (
                  <object type="image/svg+xml" data="/assets/images/checkmark.svg" className={styles.check} style={{ pointerEvents: 'none' }}>
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
