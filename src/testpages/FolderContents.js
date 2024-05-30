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
  const [boxCount, setBoxCount] = useState(11);
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheck = () => {
    setIsChecked((prev) => !prev);
  };

  const boxes = Array.from({ length: boxCount }, (_, index) => (
    <div key={index} className={styles.box}>
      <img src={imagePaths[index]} alt={`Image ${index + 1}`} className={styles.image} />
    </div>
  ));

  return (
    <div className={styles.container}>
      <object type="image/svg+xml" data="/assets/images/foldercontents.svg">
        <img src="/assets/images/foldercontents.svg" alt="Upload Zone" />
      </object>
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
          <div className={styles.squareBox} onClick={toggleCheck}>
            <img src={imagePaths[1]} alt="Square Box Image" className={styles.squareImage} />
            <div className={styles.smallBox}>
              {isChecked && (
                <object type="image/svg+xml" data="/assets/images/checkmark.svg" className={styles.check}>
                  <img src="/assets/images/checkmark.svg" alt="Upload Zone" />
                </object>
              )}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
