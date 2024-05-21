import React from "react";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";

function Dragcont(props) {
  const pos = useSpring({ x: 0, y: 0 });

  const bindPos = useDrag((params) => {
    pos.x.set(params.offset[0]);
    pos.y.set(params.offset[1]);
  });

  return (
    <animated.div
      {...bindPos()}
      style={{
        x: pos.x,
        y: pos.y,
      }}
    >
      {props.children}
    </animated.div>
  );
}

export default Dragcont;
