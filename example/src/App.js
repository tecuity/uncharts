import React, { Component, useState } from "react";
import "normalize.css";
import {
  LineGraph,
  NumberTile,
  BarGraph,
  PieChart,
  Tile,
  ThemeProvider,
  ResponsiveProvider,
  useResponsive
} from "@tecuity/uncharts";
import GDPData from "./data";
import { requestInterval, clearRequestInterval } from "./animationTimeout";

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
};

const aspectRatio = 400 / 600;

const getHeightByWidth = width => width * aspectRatio;

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <ResponsiveProvider>
          <ThemeProvider>
            <div className="flex-row">
              <div className="spacer flex-column col-6">
                <RandomLineGraph />
              </div>
              <div className="spacer flex-column col-6" style={{ width: 500 }}>
                <div className="column-spacer">
                  <NumberTile
                    label="UCC Info Request"
                    intervals={[
                      {
                        label: "Week",
                        value: 30,
                        onClick: () => {
                          console.log("example on click function - clicked!");
                        }
                      },
                      {
                        label: "Month",
                        value: 6289
                      },
                      {
                        label: "Year",
                        value: 22941
                      }
                    ]}
                    customStyles = {{"transform": "scale(1.1)"}}
                  />
                </div>
                <div className="column-spacer">
                  <NumberTile
                    label="Payments"
                    color="green"
                    prefix="$"
                    intervals={[
                      {
                        label: "Hour",
                        value: 42
                      },
                      {
                        label: "Day",
                        value: 773
                      },
                      {
                        label: "Week",
                        value: 6289
                      }
                    ]}
                  />
                </div>
                <div>
                  <NumberTile
                    label="Active Users"
                    color="gray"
                    intervals={[
                      {
                        label: "Hour",
                        value: 13
                      },
                      {
                        label: "Day",
                        value: 29
                      },
                      {
                        label: "Week",
                        value: 328
                      }
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className="flex-row">
              <div className="spacer flex-colum col-6">
                <RandomBarGraph />
              </div>
              <div className="spacer flex-colum col-6">
                <RandomPieChart />
              </div>
            </div>
          </ThemeProvider>
        </ResponsiveProvider>
      </div>
    );
  }
}

const foodData = [
  {
    label: "Fruit",
    value: 35
  },
  {
    label: "Vegetables",
    value: 53
  },
  {
    label: "Meat",
    value: 12
  },
  {
    label: "Grains",
    value: 19
  }
];

const RandomPieChart = () => {
  const getRandomData = () =>
    foodData.map(d => ({ ...d, value: d.value + getRandomInt(0, 30) }));
  const [data, setData] = React.useState(getRandomData());
  const [width, setWidth] = React.useState(600);
  const [height, setHeight] = React.useState(450);
  const { page } = useResponsive();
  const tile = React.useRef();

  React.useEffect(() => {
    const interval = requestInterval(() => {
      setData(getRandomData());
    }, 3000);
    return () => {
      clearRequestInterval(interval);
    };
  }, []);

  React.useEffect(() => {
    const tileWidth = tile.current.getBoundingClientRect().width;
    const newWidth = tileWidth - 40;
    const newHeight = getHeightByWidth(tileWidth);
    setWidth(newWidth);
    setHeight(newHeight);
  }, [page.width, tile]);

  return (
    <Tile ref={tile}>
      <PieChart data={data} width={width} height={height} />
    </Tile>
  );
};

const RandomLineGraph = () => {
  const getRandomData = () =>
    GDPData.slice(
      getRandomInt(0, 10),
      GDPData.length - getRandomInt(0, 10)
    ).map(g => ({
      x: parseInt(g.date, 10),
      y: (parseInt(g.value, 10) / 1000000000000) * getRandom(0.75, 1.25)
    }));
  const [data, setData] = React.useState(getRandomData());
  const [width, setWidth] = React.useState(600);
  const [height, setHeight] = React.useState(450);
  const { page } = useResponsive();
  const tile = React.useRef();

  React.useEffect(() => {
    const interval = requestInterval(() => {
      setData(getRandomData());
    }, 3000);
    return () => {
      clearRequestInterval(interval);
    };
  }, []);

  React.useEffect(() => {
    const tileWidth = tile.current.getBoundingClientRect().width;
    const newWidth = tileWidth - 40;
    const newHeight = getHeightByWidth(tileWidth);
    setWidth(newWidth);
    setHeight(newHeight);
  }, [page.width, tile]);

  return (
    <Tile ref={tile}>
      <LineGraph
        data={data}
        xLabel="Years"
        yLabel="GDP in Millions"
        width={width}
        height={height}
      />
    </Tile>
  );
};

const RandomBarGraph = () => {
  const getRandomData = () =>
    GDPData.slice(0, 7).reverse().map(g => ({
      x: parseInt(g.date, 10),
      y: (parseInt(g.value, 10) / 1000000000000) * getRandom(0.95, 1.05)
    }));

  
  const [data, setData] = useState(getRandomData);
  // const data = [
  //   {x: 1, y: 5},
  //   {x: 2, y: 11},
  //   {x: 3, y: 4},
  //   {x: 4, y: 1},
  // ]
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(450);
  const [fromZero, setFromZero] = useState(false);
  const { page } = useResponsive();
  const tile = React.useRef();

  // React.useEffect(() => {
  //   const interval = requestInterval(() => {
  //     setData(getRandomData());
  //     setFromZero((prev) => !prev);
  //   }, 3000);
  //   return () => {
  //     clearRequestInterval(interval);
  //   };
  // }, []);

  React.useEffect(() => {
    const tileWidth = tile.current.getBoundingClientRect().width;
    const newWidth = tileWidth - 40;
    const newHeight = getHeightByWidth(tileWidth);
    setWidth(newWidth);
    setHeight(newHeight);
  }, [page.width, tile]);

  return (
    <Tile ref={tile}>
      <BarGraph
        data={data}
        yLabel="GDP in Millions"
        xLabel="Years"
        width={width}
        height={height}
        // yFromZero={true}
        title="GDP / Year"
      />
    </Tile>
  );
};
