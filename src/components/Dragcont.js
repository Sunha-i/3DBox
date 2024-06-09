import React, { useState } from "react";
import { useDrag } from "react-use-gesture";

function Dragcont(props) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const bindPos = useDrag((params) => {
    setPosition({ x: params.offset[0], y: params.offset[1] });
  });

  return (
    <div
      {...bindPos()}
      style={{
        position: "relative",
        left: position.x,
        top: position.y,
        touchAction: "none",
      }}
    >
      {props.children}
    </div>
  );
}

export default Dragcont;