import React, { useState } from "react";
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
  const [boxCount, setBoxCount] = useState(33);
  const [isChecked, setIsChecked] = useState(Array(imagePaths.length).fill(false));

  const toggleCheck = (index) => {
    setIsChecked((prev) => {
      const newChecked = [...prev];
      newChecked[index] = !newChecked[index];
      return newChecked;
    });
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
          <div className={styles.folderList}>
            <object type="image/svg+xml" data="/assets/images/folder.svg">
              <img src="/assets/images/folder.svg" alt="Upload Zone" />
            </object>
            <div className={styles.blankBox}></div>
            <div>SpongeBob</div>
          </div>
          <div className={styles.folderList}>
            <object type="image/svg+xml" data="/assets/images/blackfolder.svg">
              <img src="/assets/images/blackfolder.svg" alt="Upload Zone" />
            </object>
            <div className={styles.blankBox}></div>
            <div className={styles.clickText}>JingJing</div>
          </div>
          <div className={styles.folderList}>
            <object type="image/svg+xml" data="/assets/images/folder.svg">
              <img src="/assets/images/folder.svg" alt="Upload Zone" />
            </object>
            <div className={styles.blankBox}></div>
            <div className={styles.editText}>
              <div className={styles.tmp}>Plankton</div>
            </div>
          </div>
          
          <div className={styles.options}>

          </div>
        </div>
        <div className={styles.gridZone}>
          {imagePaths.map((path, idx) => (
            <div key={idx} className={styles.squareBox} onClick={() => toggleCheck(idx)}>
              <img src={path} alt={`Image ${idx + 1}`} className={styles.squareImage} />
              <div className={styles.smallBox}>
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
