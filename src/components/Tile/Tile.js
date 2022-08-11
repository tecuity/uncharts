import React from "react";
import styles from "./Tile.css";

export const Tile = React.forwardRef(
  ({ children, noPadding, hideOverflow, customStyles }, ref) => {
    return (
      <div
        className={styles.wrapper}
        style={{
          padding: noPadding ? 0 : "",
          overflow: hideOverflow ? "hidden" : "",
          ...customStyles
        }}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);