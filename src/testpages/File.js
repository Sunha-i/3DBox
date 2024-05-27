import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/folder.module.css";
import CheckboxGroup from "../components/CheckBox/CheckboxGroup";
import Checkbox from "../components/CheckBox/Checkbox";
import { FileContext } from "../components/ContextFile";
import Trash from "./Trash";

function File({ onDelete }) {
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const { setCurrentId } = useContext(FileContext);
  const [isOver, setIsOver] = useState(false);
  const [curretnImage, setCurrentImage] = useState(null);

  const importAll = (r) => {
    return r.keys().map(r);
  };

  useEffect(() => {
    const loadedImages = importAll(
      require.context(
        "../../public/assets/images/dummy",
        false,
        /.(png|jpe?g|svg)$/
      )
    );
    setImages(loadedImages);
  }, []);

  // 해당 엘리먼트에 onDragStart 함수를 통해 projectId를 state에 저장한다.
  const onDragStart = (e, projectId) => {
    setCurrentId(projectId);
  };

  // onDrag 함수는 onDragStart가 실행되고 엘리먼트를 드래그할 때 실행되는 함수이다.
  // onDrag 함수가 실행되는 동안 리덕스에 해당 엘리먼트의 projectId를 저장한다.
  const onDrag = (e) => {};

  const onDrop = (e) => {
    // 드래그한 엘리먼트를 드랍했을 때 실행되는 함수이다.
    // onDrop 함수가 실행되었을 때 db에 폴더 id와 파일 id가 post
    setIsOver(false);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsOver(true);
  };

  const onDragLeave = (e) => {
    setIsOver(false);
  };

  return (
    <div className={styles.image_zone}>
      <CheckboxGroup values={files} onChange={setFiles}>
        {images.map((src, index) => (
          <ImageItem
            key={index}
            src={src}
            index={index}
            name={`img-${index}`}
            onDelete={onDelete}
            onDragStart={onDragStart}
          />
        ))}
      </CheckboxGroup>
      <Trash onDragOver={onDragOver} onDrop={onDrop} isOver={isOver} />
    </div>
  );
}

function ImageItem({ src, index, name, onDelete, onDragStart }) {
  const projectId = `project-${index}`;

  const handleDragStart = (e) => {
    onDragStart(e, projectId);
  };

  return (
    <div
      className={styles.image_container}
      draggable
      onDragStart={handleDragStart}
      style={{ cursor: "move" }}
    >
      <Checkbox value={name}>
        <img src={src} alt={`img-${index}`} className={styles.image} />
      </Checkbox>
    </div>
  );
}

export default File;
