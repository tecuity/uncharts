import React, { Component } from "react";
import "normalize.css";
import {
  LineGraph,
  NumberTile,
  BarGraph,
  PieChart,
  Tile,
  ThemeProvider
} from "react-dashboard";
import GDPData from "./data";

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
};

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <ThemeProvider>
          <div className="spacer">
            <RandomLineGraph />
          </div>
          <div className="spacer flex-column" style={{ width: 420 }}>
            <div className="column-spacer">
              <NumberTile
                label="Businesses"
                intervals={[
                  {
                    label: "Day",
                    value: 2
                  },
                  {
                    label: "Week",
                    value: 24
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
          <div className="spacer">
            <RandomBarGraph />
          </div>
          <div className="spacer">
            <RandomPieChart />
          </div>
        </ThemeProvider>
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

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setData(getRandomData());
    }, 3000);
    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return (
    <Tile>
      <PieChart data={data} />
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

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setData(getRandomData());
    }, 3000);
    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return (
    <Tile>
      <LineGraph data={data} xLabel="Years" yLabel="GDP in Millions" />
    </Tile>
  );
};

const RandomBarGraph = () => {
  const getRandomData = () =>
    GDPData.slice(0, 7).map(g => ({
      x: parseInt(g.date, 10),
      y: (parseInt(g.value, 10) / 1000000000000) * getRandom(0.95, 1.05)
    }));
  const [data, setData] = React.useState(getRandomData());

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setData(getRandomData());
    }, 3000);
    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return (
    <Tile>
      <BarGraph data={data} yLabel="GDP in Millions" xLabel="Years" />
    </Tile>
  );
};
