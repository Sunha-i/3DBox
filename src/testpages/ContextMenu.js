import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/contextmenu.module.css";

export default function ContextMenu() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);

  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
      setPosition({ x: event.pageX, y: event.pageY });
      setVisible(true);
    };

    const handleClick = () => {
      setVisible(false);
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className={`${styles.container} ${visible ? styles.active : ""}`}
      style={{ top: position.y, left: position.x }}
    >
      <div className={styles["menu-item"]}>Delete</div>
      <div className={styles["menu-item"]}>Rename</div>
      <div className={styles["menu-item"]}>Option 3</div>
    </div>
  );
}
