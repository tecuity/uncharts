# @tecuity/uncharts [![NPM](https://img.shields.io/npm/v/uncharts.svg)](https://www.npmjs.com/package/uncharts) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Demo page

[See uncharts in action here.](https://tecuity.github.io/uncharts/)

## Install

```bash
npm install --save @tecuity/uncharts
```

## Usage

```jsx
import React from 'react'

import { Tile, LineGraph, BarGraph, PieChart, NumberTile, ThemeProvider} from '@tecuity/uncharts'

function App(){
  return (
    <ThemeProvider>
      <Tile>
        <LineGraph
          width={600}
          height={450}
          xLabel="Years"
          yLabel="GDP in Millions"
          data={[
            {x: 30, y: 1987},
            {x: 24, y: 1988},
            {x: 49, y: 1989},
            {x: 12, y: 1990}
          ]}
        />
      </Tile>
    </ThemeProvider>
  )
}
```

## License

MIT © [tecuity](https://github.com/tecuity)
