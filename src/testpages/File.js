import React, { useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import styles from "../styles/folder.module.css";

function File({ onDelte }) {
  const [images, setImages] = useState([]);

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

  return (
    <div className={styles.image_zone}>
      {images.map((src, index) => (
        <ImageItem key={index} src={src} index={index} onDelte={onDelte} />
      ))}
    </div>
  );
}

function ImageItem({ src, index, onDelte }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const opacity = isDragging ? 0.5 : 1;

  return (
    <div ref={drag} className={styles.image_container} style={{ opacity }}>
      <img src={src} alt={`img-${index}`} className={styles.image} />
    </div>
  );
}

export default File;
