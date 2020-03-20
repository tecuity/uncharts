import React from 'react'
import * as d3 from 'd3'

const LineGraph = ({ data, xLabel, yLabel }) => {
  const stageRef = React.useRef()

  React.useEffect(() => {
    const svg = d3.select(stageRef.current);
    const stage = stageRef.current.getBoundingClientRect()
    const width = stage.width - 40;
    const height = stage.height - 30;

    const xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.x))
    .range([10, width]);


    const yScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.y))
    .range([height, 10]);

    const line = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y))
    .curve(d3.curveMonotoneX)
    //
    // var dataset = data.map(d => ({y: d.value}))

    svg
    .append("g")
    .attr("transform", "translate(" + 0 + "," + 0 + ")")

    svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(30," + height + ")")
    .call(d3.axisBottom(xScale));

    svg
    .append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(40,0)")
    .call(d3.axisLeft(yScale));

    svg
    .append("path")
    .datum(data)
    .attr("transform", "translate(30, 0)")
    .attr("stroke-linecap", "round")
    .attr("class", "line")
    .attr("d", line);

    svg
    .append("text")
    .style("font-size", "13px")
    .style("font-weight", "800")
    .style("text-anchor", "middle")
    .style("text-transform", "uppercase")
    .attr("transform", `translate(${stage.width / 2}, ${stage.height})`)
    .text(xLabel)

    svg
    .append("text")
    .style("font-size", "13px")
    .style("font-weight", "800")
    .style("text-anchor", "middle")
    .style("text-transform", "uppercase")
    .attr("transform", `rotate(-90, 10, ${stage.height / 2})`)
    .attr("x", 10)
    .attr("y", stage.height / 2)
    .text(yLabel)
  }, [])

  return (
    <svg width={600} height={450} ref={stageRef}>
      <defs>
        <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#7605e7"/>
          <stop offset="100%" stopColor="#1ab4ed"/>
        </linearGradient>
      </defs>
      <style>
        {`
          .line {
    fill: none;
    stroke: url(#linear);
    stroke-width: 6;
}

.overlay {
  fill: none;
  pointer-events: all;
}

/* Style the dots by assigning a fill and stroke */
.dot {
    fill: url(#linear);
    stroke: #fff;
}

  .focus circle {
  fill: none;
  stroke: steelblue;
}
        `}
      </style>

    </svg>
  )
}

export default LineGraph
