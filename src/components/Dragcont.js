import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";

function Dragcont(props) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const { x, y } = useSpring({
    x: dragging ? position.x : position.x,
    y: dragging ? position.y : position.y,
    immediate: dragging,
  });

  const bindPos = useDrag((params) => {
    setPosition({ x: params.offset[0], y: params.offset[1] });
    setDragging(params.active);
  });

  return (
    <animated.div
      {...bindPos()}
      style={{
        x,
        y,
      }}
    >
      {props.children}
    </animated.div>
  );
}

export default Dragcont;
