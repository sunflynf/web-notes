import { useState } from "react";
import "./ZoomBlock.css";
import ButtonControl from "./ButtonControl";

const STEP = 50;
const MAX_WIDTH = 250;
const MIN_WIDTH = 50;

const ZoomBlock = ({ children }) => {
  const [width, setWidth] = useState(100);

  const increase = () => {
    setWidth((prev) => (prev === MAX_WIDTH ? prev : prev + STEP));
  };
  const decrease = () => {
    setWidth((prev) => (prev === MIN_WIDTH ? prev : prev - STEP));
  };
  const reset = () => setWidth(100);

  return (
    <div className="zoom-container">
      <div style={{ overflowX: "auto" }}>
        <div style={{ width: width + "%" }}>{children}</div>
      </div>
      <ButtonControl onClick={increase} disabled={width === MAX_WIDTH}>
        ➕
      </ButtonControl>
      <ButtonControl onClick={decrease} disabled={width === MIN_WIDTH} top={50}>
        ➖
      </ButtonControl>
      <ButtonControl onClick={reset} top={100}>
        🔁
      </ButtonControl>
    </div>
  );
};

export default ZoomBlock;
