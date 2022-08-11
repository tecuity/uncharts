import React from "react";
import styles from "./NumberTile.css";
import { Tile } from "../Tile/Tile";
import Transition from "react-prop-transition";
import { ThemeContext } from "../ThemeProvider/ThemeProvider";
const nanoid = require("nanoid");

export const NumberTile = ({
  label,
  intervals: initalIntervals = [],
  color = "blue",
  prefix = "",
  customStyles,
}) => {
  const theme = React.useContext(ThemeContext);
  const [intervals, setIntervals] = React.useState(null);
  const [selectedInterval, setSelectedInterval] = React.useState(null);

  const getMappedIntervals = ents => ents.map(e => {
    if (e.id) {
      return e;
    }
    else return { ...e, id: nanoid(10) };
  });
  // const getMappedIntervals = ents => ents.map(e => ({ ...e }));


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
    <Tile noPadding hideOverflow customStyles={customStyles}>
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
                      onClick={() => {
                        console.log("int", int)
                        setSelectedInterval(int.id);
                        console.log("int.onClick", int.onClick);
                        int.onClick && int.onClick();
                      }}
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
                  {typeof number === 'number' ? number.toFixed(0) : ''}
                </span>
              )}
            </Transition>
          </span>
        </div>
      </div>
    </Tile>
  );
};
