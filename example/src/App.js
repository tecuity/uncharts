import React, { Component } from "react";
import "normalize.css";
import { LineGraph, NumberTile, BarGraph, Tile, ThemeProvider } from "react-dashboard";

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
}

const GDPData = [
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "20544343456936.5",
    decimal: "0",
    date: "2018"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "19485393853000",
    decimal: "0",
    date: "2017"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "18707188235000",
    decimal: "0",
    date: "2016"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "18219297584000",
    decimal: "0",
    date: "2015"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "17521746534000",
    decimal: "0",
    date: "2014"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "16784849190000",
    decimal: "0",
    date: "2013"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "16197007349000",
    decimal: "0",
    date: "2012"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "15542581104000",
    decimal: "0",
    date: "2011"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "14992052727000",
    decimal: "0",
    date: "2010"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "14448933025000",
    decimal: "0",
    date: "2009"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "14712844084000",
    decimal: "0",
    date: "2008"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "14451858650000",
    decimal: "0",
    date: "2007"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "13814611414000",
    decimal: "0",
    date: "2006"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "13036640229000",
    decimal: "0",
    date: "2005"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "12213729147000",
    decimal: "0",
    date: "2004"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "11458243878000",
    decimal: "0",
    date: "2003"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "10936419054000",
    decimal: "0",
    date: "2002"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "10581821399000",
    decimal: "0",
    date: "2001"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "10252345464000",
    decimal: "0",
    date: "2000"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "9630664202000",
    decimal: "0",
    date: "1999"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "9062818211000",
    decimal: "0",
    date: "1998"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "8577554463000",
    decimal: "0",
    date: "1997"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "8073122000000",
    decimal: "0",
    date: "1996"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "7639749000000",
    decimal: "0",
    date: "1995"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "7287236000000",
    decimal: "0",
    date: "1994"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "6858559000000",
    decimal: "0",
    date: "1993"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "6520327000000",
    decimal: "0",
    date: "1992"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "6158129000000",
    decimal: "0",
    date: "1991"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "5963144000000",
    decimal: "0",
    date: "1990"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "5641580000000",
    decimal: "0",
    date: "1989"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "5236438000000",
    decimal: "0",
    date: "1988"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "4855215000000",
    decimal: "0",
    date: "1987"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "4579631000000",
    decimal: "0",
    date: "1986"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "4338979000000",
    decimal: "0",
    date: "1985"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "4037613000000",
    decimal: "0",
    date: "1984"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "3634038000000",
    decimal: "0",
    date: "1983"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "3343789000000",
    decimal: "0",
    date: "1982"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "3207042000000",
    decimal: "0",
    date: "1981"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "2857307000000",
    decimal: "0",
    date: "1980"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "2627334000000",
    decimal: "0",
    date: "1979"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "2351599000000",
    decimal: "0",
    date: "1978"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "2081826000000",
    decimal: "0",
    date: "1977"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "1873412000000",
    decimal: "0",
    date: "1976"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "1684904000000",
    decimal: "0",
    date: "1975"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "1545243000000",
    decimal: "0",
    date: "1974"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "1425376000000",
    decimal: "0",
    date: "1973"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "1279110000000",
    decimal: "0",
    date: "1972"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "1164850000000",
    decimal: "0",
    date: "1971"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "1073303000000",
    decimal: "0",
    date: "1970"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "1019900000000",
    decimal: "0",
    date: "1969"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "942500000000",
    decimal: "0",
    date: "1968"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "861700000000",
    decimal: "0",
    date: "1967"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "815000000000",
    decimal: "0",
    date: "1966"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "743700000000",
    decimal: "0",
    date: "1965"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "685800000000",
    decimal: "0",
    date: "1964"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "638600000000",
    decimal: "0",
    date: "1963"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "605100000000",
    decimal: "0",
    date: "1962"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "563300000000",
    decimal: "0",
    date: "1961"
  },
  {
    indicator: { id: "NY.GDP.MKTP.CD", value: "GDP (current US$)" },
    country: { id: "US", value: "United States" },
    value: "543300000000",
    decimal: "0",
    date: "1960"
  }
];

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <ThemeProvider>
          <div className="spacer">
            <RandomLineGraph />
          </div>
          <div className="spacer flex-column" style={{width: 420}}>
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
        </ThemeProvider>
      </div>
    );
  }
}

const RandomLineGraph = () => {
  const getRandomData = () => (
    GDPData.slice(getRandomInt(0, 10), GDPData.length - getRandomInt(0, 10)).map(g => ({
      x: parseInt(g.date, 10),
      y: (parseInt(g.value, 10) / 1000000000000) * getRandom(.75, 1.25)
    }))
  )
  const [data, setData] = React.useState(getRandomData())

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setData(getRandomData())
    }, 3000)
    return () => {
      window.clearInterval(interval)
    }
  }, [])

  return (
    <Tile>
      <LineGraph
        data={data}
        xLabel="Years"
        yLabel="GDP in Millions"
      />
    </Tile>
  )
}

const RandomBarGraph = () => {
  const getRandomData = () => (
    GDPData.slice(0, 7).map(g => ({
      x: parseInt(g.date, 10),
      y: (parseInt(g.value, 10) / 1000000000000) * getRandom(.95, 1.05)
    }))
  )
  const [data, setData] = React.useState(getRandomData())

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setData(getRandomData())
    }, 3000)
    return () => {
      window.clearInterval(interval)
    }
  }, [])

  return (
    <Tile>
      <BarGraph
        data={data}
        yLabel="GDP in Millions"
        xLabel="Years"
      />
    </Tile>
  )
}
