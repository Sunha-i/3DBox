import React, { useState, useContext } from "react";
import styles from "../styles/upload.module.css";
import { useParams } from "react-router-dom";
import { FolderContext } from "../context/FolderContext";

export default function Upload() {
  const {id: folderId} = useParams();
  const { setUploadImages } = useContext(FolderContext);
  
  const [isActive, setActive] = useState(false);
  const [uploadQueue, setUploadQueue] = useState([]);
  const [isPressed, setIsPressed] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

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

  // 업로드 api 연결
  const handleUploadFiles = async () => {
    const formData = new FormData();
    uploadQueue.forEach(({ file }) => {
      formData.append('files', file);
    });

    try {
      const response = await fetch(`http://3.38.95.127:8080/file/upload/${folderId}`, {
        method: 'POST',
        body: formData
      });

      if (response.status === 201) {
        const result = await response.json();
        setIsSaved(true);
        const uploadedImages = result.files.map(file => file.s3_key);
        setUploadImages(uploadedImages);

        setUploadQueue([]);
        // 2초 후에 상태 바꾸기
        setTimeout(() => {
          setIsSaved(false);
          console.log(uploadedImages);
        }, 2000);
      } else {
        alert('Failed to upload files');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Failed to upload files');
    }
  };

  const handleButtonPressing = () => {
    setIsPressed(true);
  };
  const handleButtonRelease = () => {
    setIsPressed(false);
  };

  return (
    <div className={styles.container}>
      {uploadQueue.length === 0 ? (
        <label className={`${styles.dragZone} ${isActive ? styles.active : ''}`} 
              onDragEnter={handleDragStart}
              onDragLeave={handleDragEnd}
              onDragOver={handleDragOver}
              onDrop={handleDrop}>
          <input type="file" className={styles.file} onChange={handleUpload} multiple />
          {isSaved ? (
            <p className={`${styles.message} ${styles.active}`}>
              Upload Complete!
            </p>
          ) : (
            <p className={`${styles.message} ${isActive ? styles.active : ''}`}>
              Drag and Drop!
            </p>
          )}
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
