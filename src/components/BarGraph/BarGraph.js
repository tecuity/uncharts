import React from "react";
// import { ThemeContext } from '../ThemeProvider/ThemeProvider'
import * as d3 from "d3";
import usePrevious from "../../hooks/usePrevious";

export const BarGraph = ({
  data,
  xLabel,
  yLabel,
  width,
  height,
  yFromZero,
  title = "",
  barOffset = 15
}) => {
  const stageRef = React.useRef();
  // const theme = React.useContext(ThemeContext);
  const chartRef = React.useRef({});
  const isInitialized = React.useRef(false);
  const prevDataLength = usePrevious(data.length);

  const getYExtent = dt => {
    const yExtent = d3.extent(dt, d => d.y);
    if (yExtent[0] !== 0) {
      yExtent[0] = yExtent[0] - (yExtent[1] - yExtent[0]) / 15;
    }
    return yExtent;
  };

  // // Update the chart
  // React.useEffect(() => {
  //   if(isInitialized.current){
  //     const chart = chartRef.current;
  //     chart.xScale.domain(data.map(d => d.x).reverse())
  //     chart.yScale.domain(getYExtent(data))
  //     chart.svg.call(d3.axisBottom(chart.xScale));
  //     chart.svg.call(d3.axisBottom(chart.yScale));
  //     console.log("new stuff");
  //   }
  // }, [data])

  // Initialize the chart
  React.useEffect(() => {
    const chart = chartRef.current;
    if (!chart.svg) {
      chart.svg = d3.select(stageRef.current);
    }
    // const stage = stageRef.current.getBoundingClientRect()
    const margin = 15;
    const calculatedWidth = width - margin * 2;
    const calculatedHeight = height - margin * 2;
    const displayWidth = calculatedWidth - margin * 2;
    const barWidth = (displayWidth / data.length) * 0.85
    const offSet = (displayWidth / data.length) * 0.15;
    const yExtent = getYExtent(data);

    if (yFromZero) {
      yExtent[0] = "0";
    }

    if (!chart.xScale) {
      chart.xScale = d3
        .scaleBand()
        .rangeRound([margin * 2, calculatedWidth])
        .domain(data.map(d => d.x));
    } else {
      chart.xScale
        .rangeRound([margin * 2, calculatedWidth])
        .domain(data.map(d => d.x));
    }

    if (!chart.yScale) {
      chart.yScale = d3
        .scaleLinear()
        .domain(yExtent)
        .range([calculatedHeight, margin]);
    } else {
      chart.yScale.domain(yExtent).range([calculatedHeight, margin]);
    }

    if (!chart.xAxis) {
      // rotate(-65deg) translate(-8px, -8px)
      chart.xAxis = chart.svg
        .append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(${margin},${calculatedHeight})`)
        .call(d3.axisBottom(chart.xScale));
      // .selectAll("text")
      // .style("text-anchor", "end")
      // .attr("dx", "-.8em")
      // .attr("dy", ".15em")
      // .attr("transform", "rotate(-65)");
    } else {
      chart.xAxis
        .transition()
        .attr("transform", `translate(${margin},${calculatedHeight})`)
        .call(d3.axisBottom(chart.xScale));
      // .selectAll("text")
      // .style("text-anchor", "end")
      // .attr("dx", "-.8em")
      // .attr("dy", ".15em")
      // .attr("transform", "rotate(-65)");
    }

    if (!chart.yAxis) {
      chart.yAxis = chart.svg
        .append("g")
        .attr("class", "y axis")
        .attr("transform", `translate(${margin * 3},0)`)
        .call(d3.axisLeft(chart.yScale));
    } else {
      chart.yAxis.transition().call(d3.axisLeft(chart.yScale));
    }

    if (!chart.xLabel) {
      chart.xLabel = chart.svg
        .append("text")
        .style("font-size", "13px")
        .style("font-weight", "800")
        .style("text-anchor", "middle")
        .style("text-transform", "uppercase")
        .attr("transform", `translate(${width / 2}, ${height})`)
        .text(xLabel);
    } else {
      chart.xLabel
        .attr("transform", `translate(${width / 2}, ${height})`)
        .text(xLabel);
    }

    if (!chart.yLabel) {
      chart.yLabel = chart.svg
        .append("text")
        .style("font-size", "13px")
        .style("font-weight", "800")
        .style("text-anchor", "middle")
        .style("text-transform", "uppercase")
        .attr("transform", `rotate(-90, 10, ${height / 2})`)
        .attr("x", 10)
        .attr("y", height / 2)
        .text(yLabel);
    } else {
      chart.yLabel
        .attr("transform", `rotate(-90, 10, ${height / 2})`)
        .attr("y", height / 2)
        .text(yLabel);
    }

    if (!chart.title) {
      chart.title = chart.svg
        .append("text")
        .style("font-size", "20px")
        .style("font-weight", "800")
        .style("text-anchor", "middle")
        .style("text-transform", "uppercase")
        .attr("transform", `translate(${width / 2}, ${margin})`)
        .text(title);
    } else {
      chart.title
        .attr("transform", `translate(${width / 2}, ${margin})`)
        .text(title);
    }

    const createBars = () => {
      chart.bars = chart.svg
        .selectAll("rect")
        .data(data.map(d => d.y))
        .enter()
        .append("rect")
        .attr("fill", (d, i) => d3.interpolateCool(0.8 * (i / data.length)))
        .attr("width", barWidth)
        .attr("height", d => 0)
        // .attr("height", d => calculatedHeight - chart.yScale(d))
        .attr("x", (d, i) => margin + chart.xScale(data[i].x) + (offSet/2))
        // .attr("y", d => calculatedHeight - margin)
        .attr("y", d => calculatedHeight)
        .attr("rx", 5);
    };

    const animateBars = () => {
      chart.bars
        .data(data.map(d => d.y))
        .transition()
        .duration(500)
        // .ease(d3.easeElastic.period(0.4))
        .ease(d3.easeCubicInOut)
        .delay((d, i) => i * 12)
        .attr("width", barWidth)
        .attr("height", d => calculatedHeight - chart.yScale(d))
        .attr("x", (d, i) => margin + chart.xScale(data[i].x) + (offSet/2))
        // .attr('y', d => calculatedHeight - chart.yScale(d) - margin)
        .attr("y", d => chart.yScale(d));
    };

    if (!chart.bars) {
      createBars();
      animateBars();
    } else {
      if (prevDataLength !== undefined && data.length !== prevDataLength) {
        chart.bars.remove();
        createBars();
        animateBars();
      } else {
        animateBars();
      }
    }

    // bars.transition()
    //   .attr('height', d => yScale(d))
    //   .attr('y', d => height - yScale(d))
    //   .delay((d, i) => i * 20)
    //   .duration(2000)
    //   .ease(d3.easeElastic);
    isInitialized.current = true;
  }, [data, width, height, xLabel, yLabel, prevDataLength, yFromZero, title]);

  return <svg width={width} height={height} ref={stageRef}></svg>;
};
