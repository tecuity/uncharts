import React from 'react'
// import { ThemeContext } from '../ThemeProvider/ThemeProvider'
import * as d3 from 'd3'
import usePrevious from '../../hooks/usePrevious'

export default ({ data, xLabel, yLabel }) => {
  const stageRef = React.useRef()
  // const theme = React.useContext(ThemeContext);
  const chartRef = React.useRef({})
  const isInitialized = React.useRef(false)
  const prevDataLength = usePrevious(data.length);

  const getYExtent = (dt) => {
    const yExtent = d3.extent(dt, d => d.y)
    if(yExtent[0] !== 0){
      yExtent[0] = yExtent[0] - ((yExtent[1] - yExtent[0]) / 15)
    }
    return yExtent
  }

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
    if(!chart.svg){
      chart.svg = d3.select(stageRef.current)
    }
    const stage = stageRef.current.getBoundingClientRect()
    const margin = 15;
    const width = stage.width - (margin * 2);
    const height = stage.height - (margin * 2);
    const barOffset = 10
    const barWidth = (width / data.length) - barOffset;
    const yExtent = getYExtent(data)

    if(!chart.xScale){
      chart.xScale = d3.scaleBand()
      .rangeRound([margin * 2, width])
      .domain(data.map(d => d.x).reverse())
    }else{
      chart.xScale.domain(data.map(d => d.x).reverse())
    }

    if(!chart.yScale){
      chart.yScale = d3.scaleLinear()
      .domain(yExtent)
      .range([height, margin]);
    }else{
      chart.yScale.domain(yExtent)
    }

    if(!chart.xAxis){
      chart.xAxis = chart.svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(${margin},${height})`)
      .call(d3.axisBottom(chart.xScale));
    }else{
      chart.xAxis
      .transition()
      .call(d3.axisBottom(chart.xScale));
    }

    if(!chart.yAxis){
      chart.yAxis = chart.svg
      .append("g")
      .attr("class", "y axis")
      .attr("transform", `translate(${margin * 3},0)`)
      .call(d3.axisLeft(chart.yScale));
    }else{
      chart.yAxis
      .transition()
      .call(d3.axisLeft(chart.yScale));
    }

    if(!chart.xLabel){
      chart.xLabel = chart.svg
      .append("text")
      .style("font-size", "13px")
      .style("font-weight", "800")
      .style("text-anchor", "middle")
      .style("text-transform", "uppercase")
      .attr("transform", `translate(${stage.width / 2}, ${stage.height})`)
      .text(xLabel)
    }else{
      chart.xLabel.text(xLabel)
    }

    if(!chart.yLabel){
      chart.yLabel = chart.svg
      .append("text")
      .style("font-size", "13px")
      .style("font-weight", "800")
      .style("text-anchor", "middle")
      .style("text-transform", "uppercase")
      .attr("transform", `rotate(-90, 10, ${stage.height / 2})`)
      .attr("x", 10)
      .attr("y", stage.height / 2)
      .text(yLabel)
    }else{
      chart.yLabel.text(yLabel)
    }

    const createBars = () => {
      chart.bars = chart.svg.selectAll('rect')
      .data(data.map(d => d.y))
      .enter()
        .append('rect')
        .attr('fill', (d, i) => d3.interpolateCool(.8 * (i / data.length)))
        .attr('width', barWidth)
        .attr('height', d => chart.yScale(d) + margin)
        .attr('x', (d, i) => margin + 5 + chart.xScale(data[data.length - 1 - i].x))
        .attr('y', d => height - chart.yScale(d) - margin)
        .attr('rx', 5)
    }

    if(!chart.bars){
      createBars()
    }else{
      if(data.length !== prevDataLength){
        chart.bars.remove()
        createBars()
      }else{
        console.log(yExtent);
        chart.bars
        .data(data.map(d => d.y))
        .transition()
        .duration(2000)
        .ease(d3.easeElastic.period(.4))
        .delay((d, i) => i * 50)
          .attr('width', barWidth)
          .attr('height', d => chart.yScale(d) + margin)
          .attr('x', (d, i) => margin + 5 + chart.xScale(data[data.length - 1 - i].x))
          .attr('y', d => height - chart.yScale(d) - margin)
      }
    }

    // bars.transition()
    //   .attr('height', d => yScale(d))
    //   .attr('y', d => height - yScale(d))
    //   .delay((d, i) => i * 20)
    //   .duration(2000)
    //   .ease(d3.easeElastic);
    isInitialized.current = true;
  }, [data])

  return (
    <svg width={600} height={450} ref={stageRef}>

    </svg>
  )
}
