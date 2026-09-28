import { ReactNode, useState } from "react";
import styles from "./styles.module.css";

const STEP = 50;
const MAX_WIDTH = 250;
const MIN_WIDTH = 50;

const ZoomBlock = ({ children }: { children: ReactNode }) => {
  const [width, setWidth] = useState(100);

  const increase = () => setWidth((prev) => Math.min(prev + STEP, MAX_WIDTH));
  const decrease = () => setWidth((prev) => Math.max(prev - STEP, MIN_WIDTH));
  const reset = () => setWidth(100);

  return (
    <figure className={styles.zoom}>
      <div className={styles.toolbar} role="toolbar" aria-label="Zoom">
        <button
          type="button"
          className={styles.button}
          onClick={decrease}
          disabled={width === MIN_WIDTH}
          aria-label="Zoom out"
        >
          −
        </button>
        <output className={styles.level} aria-live="polite">
          {width}%
        </output>
        <button
          type="button"
          className={styles.button}
          onClick={increase}
          disabled={width === MAX_WIDTH}
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.reset}`}
          onClick={reset}
          disabled={width === 100}
        >
          Reset
        </button>
      </div>
      <div className={styles.viewport} tabIndex={0}>
        <div style={{ width: `${width}%` }}>{children}</div>
      </div>
    </figure>
  );
};

export default ZoomBlock;
