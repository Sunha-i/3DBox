import React, { useState } from "react";
import styles from "../styles/upload.module.css";

export default function Upload() {
  const [isActive, setActive] = useState(false);
  const [uploadQueue, setUploadQueue] = useState([]);
  const [isPressed, setIsPressed] = useState(false);

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

  const handleDelete = (index) => {
    const newFiles = [...uploadQueue];
    newFiles.splice(index, 1);
    setUploadQueue(newFiles);
  };

  const handleUploadFiles = () => {
    // logic 'll be updated
    console.log("Uploading files:", uploadQueue);
  };

  const handleButtonPressing = () => {
    setIsPressed(true);
  };
  const handleButtonRelease = () => {
    setIsPressed(false);
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
        <div className={`${styles.uploadZone} ${isActive ? styles.active : ''}`} 
            onDragEnter={handleDragStart}
            onDragLeave={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={handleDrop}>
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
          <button className={`${styles.uploadButton} ${isPressed ? styles.active : ''}`}
              onMouseDown={handleButtonPressing} onMouseUp={handleButtonRelease} onClick={handleUploadFiles}>
            <span>upload</span>
          </button>
        </div>
      )}
    </div>
  );
}
