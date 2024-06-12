import React, { useRef, useState, useContext } from "react";
import styles from "../styles/home.module.css";
import Dragcont from "../components/Dragcont";
import Upload from "../testpages/Upload";
import FolderTree from "../testpages/FolderTree";
import FolderContents from "../testpages/FolderContents";
import { useParams } from "react-router-dom";
import Bin from "../testpages/Bin";

export default function Home() {
  const { id: folderId } = useParams();
  const [isTrashOpen, setIsTrashOpen] = useState(false);

  const handleTrashDoubleClick = () => {
    if (!isTrashOpen) {
      setIsTrashOpen(true);
    }
  };

  const handleCloseBin = () => {
    setIsTrashOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.menuBar}>
        <div className={`${styles.menuContents} ${styles.logOut}`}>LogOut</div>
        <object type="image/svg+xml" data="/assets/images/menuResizer.svg" className={styles.menuResizer}>
          <img src="/assets/images/menuResizer.svg" alt="Menu Resizer" />
        </object>
        <div className={`${styles.menuContents} ${styles.userName}`}>Sunha</div>
      </div>
      <Dragcont>
        <div className={styles.uploadBox}>
          <Upload />
        </div>
      </Dragcont>
      <Dragcont>
        <div className={styles.folderTreeBox}>
          <FolderTree />
        </div>
      </Dragcont>
      <div className={styles.folderContentsBox}>
        <FolderContents folderId={folderId} />
      </div>
      <div 
        className={`${styles.trashIcon} ${isTrashOpen ? styles.open : ''}`} 
        onDoubleClick={handleTrashDoubleClick}
      >
        <object type="image/svg+xml" data="/assets/images/trashempty.svg">
          <img src="/assets/images/trashempty.svg" alt="Recycle Bin" />
        </object>
        <div>Trash</div>
      </div>
      {isTrashOpen && (
        <Dragcont>
          <div className={`${styles.binBox} ${isTrashOpen ? styles.open : ''}`}>
            <Bin onClose={handleCloseBin} />
          </div>
        </Dragcont>
      )}
    </div>
  );
}
