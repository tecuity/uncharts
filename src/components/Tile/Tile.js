import React from "react";
import styles from "./Tile.css";

export default ({ children, noPadding, hideOverflow }) => {
  return (
    <div
      className={styles.wrapper}
      style={{
        padding: noPadding ? 0 : "",
        overflow: hideOverflow ? "hidden" : ""
      }}
    >
      {children}
    </div>
  );
};
