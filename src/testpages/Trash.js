import React from "react";
import { useDrop } from "react-dnd";
import styles from "../styles/folder.module.css";

function Trash({ onDelete }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => {
      onDelete(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  // 추후 수정
  const backgroundColor = isOver ? "red" : "transparent";
  const backgroundImage = isOver
    ? "url('/assets/images/trash_full.png')"
    : "url('/assets/images/trash_empty.png')";

  return (
    <div
      ref={drop}
      className={styles.trash}
      style={{ backgroundColor, backgroundImage }}
    />
  );
}

export default Trash;
