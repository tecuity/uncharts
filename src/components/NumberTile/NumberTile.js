import React from "react";
import styles from "./NumberTile.css";
import Tile from "../Tile/Tile";
import Transition from "react-prop-transition";
import { ThemeContext } from "../ThemeProvider/ThemeProvider";
const nanoid = require("nanoid");

export default ({
  label,
  intervals: initalIntervals = [],
  color = "blue",
  prefix = ""
}) => {
  const theme = React.useContext(ThemeContext);
  const [intervals, setIntervals] = React.useState(null);
  const [selectedInterval, setSelectedInterval] = React.useState(null);

  const getMappedIntervals = ents => ents.map(e => ({ ...e, id: nanoid(10) }));

  React.useEffect(() => {
    const newIntervals = getMappedIntervals(initalIntervals);
    setIntervals(newIntervals);
    setSelectedInterval(newIntervals.length ? newIntervals[0].id : null);
  }, [initalIntervals]);

  const themeColor = theme.colors[color] || theme.colors.blue;
  const selectedNumber = selectedInterval
    ? intervals.find(i => i.id === selectedInterval).value
    : 0;

  return (
    <Tile noPadding hideOverflow>
      <div className={styles.wrapper}>
        <div className={styles.leftColumn}>
          <label className={styles.label}>{label}</label>
          <div className={styles.intervals}>
            {intervals
              ? intervals.map(int => {
                  const isSelected = int.id === selectedInterval;
                  return (
                    <button
                      className={styles.interval}
                      style={{
                        background: isSelected ? themeColor : ""
                      }}
                      data-interval-selected={isSelected}
                      key={int.id}
                      onClick={() => setSelectedInterval(int.id)}
                    >
                      {int.label}
                    </button>
                  );
                })
              : null}
          </div>
        </div>
        <div
          className={styles.numberWrapper}
          style={{ background: themeColor }}
        >
          <span
            className={styles.number}
            data-number-length={selectedNumber.toString().length}
            data-has-prefix={!!prefix}
          >
            <Transition
              props={{ number: selectedNumber }}
              duration={400}
              easing="cubic"
            >
              {({ number }) => (
                <span>
                  {prefix ? (
                    <span className={styles.prefix}>{prefix}</span>
                  ) : null}
                  {number.toFixed(0)}
                </span>
              )}
            </Transition>
          </span>
        </div>
      </div>
    </Tile>
  );
};
