import React from "react";
import styles from "./Tile.css";

export default React.forwardRef(({ children, noPadding, hideOverflow }, ref) => {
  return (
    <div
      className={styles.wrapper}
      style={{
        padding: noPadding ? 0 : "",
        overflow: hideOverflow ? "hidden" : ""
      }}
      ref={ref}
    >
      {children}
    </div>
  );
})
