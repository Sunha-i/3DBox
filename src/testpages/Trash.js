import React from "react";
import styles from "../styles/folder.module.css";

function Trash({ onDragOver, onDrop, onDelete, isOver }) {
  // 추후 수정
  const backgroundColor = isOver ? "red" : "transparent";
  const backgroundImage = isOver
    ? "url('/assets/images/trash_full.png')"
    : "url('/assets/images/trash_empty.png')";

  return (
    <div
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={styles.trash}
      style={{ backgroundImage }}
    />
  );
}

export default Trash;
