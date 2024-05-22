import React, { useState } from "react";
import styles from "../styles/upload.module.css";

export default function Upload() {
  const [isActive, setActive] = useState(false);
  const [uploadQueue, setUploadQueue] = useState([]);

  const handleDragStart = () => setActive(true);
  const handleDragEnd = () => setActive(false);
  const handleDragOver = (event) => { 
    event.preventDefault();
    setActive(true);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setActive(false);

    const files = event.dataTransfer.files;
    handleFiles(files);
  };

  const handleUpload = (event) => {
    const files = event.target.files;
    handleFiles(files);
  };
  
  /* 로직 체크 */
  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    fileArray.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        setUploadQueue(prevFiles => [...prevFiles, { file, dataUrl }]);
      };
      reader.readAsDataURL(file);
    });
  };

  /* 로직 체크 */
  const handleDelete = (index) => {
    const newFiles = [...uploadQueue];
    newFiles.splice(index, 1);
    setUploadQueue(newFiles);
  };

  return (
    <div className={styles.container}>
      <object type="image/svg+xml" data="/assets/images/uploadzone.svg">
        <img src="/assets/images/uploadzone.svg" alt="Upload Zone" />
      </object>
      {uploadQueue.length === 0 ? (
        <label className={`${styles.dragZone} ${isActive ? styles.active : ''}`} 
              onDragEnter={handleDragStart}
              onDragLeave={handleDragEnd}
              onDragOver={handleDragOver}
              onDrop={handleDrop}>
          <input type="file" className={styles.file} onChange={handleUpload} multiple />
          <p className={`${styles.message} ${isActive ? styles.active : ''}`} >
            Drag and Drop!
          </p>
        </label>
      ) : (
        /* 수정 예정 */
        <div className={styles.uploadZone}>
          {uploadQueue.map((fileObj, index) => (
            <div key={index} className={styles.thumbnail}>
              <img src={fileObj.dataUrl} alt={fileObj.file.name} />
              <button className={styles.deleteButton} onClick={() => handleDelete(index)}>
                x
              </button>
            </div>
          ))}
          <label className={styles.addButton}>
            <input type="file" className={styles.file} onChange={handleUpload} multiple />
            <span>+</span>
          </label>
        </div>
      )}
    </div>
  );
}
