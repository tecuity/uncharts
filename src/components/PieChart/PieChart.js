import React from "react";
import { ThemeContext } from '../ThemeProvider/ThemeProvider'
import * as d3 from "d3";

export default ({ data }) => {
  const stageRef = React.useRef();
  const theme = React.useContext(ThemeContext);
  const chartRef = React.useRef({});
  const isInitialized = React.useRef(false);

  React.useEffect(() => {
    const stage = stageRef.current.getBoundingClientRect();
    const margin = 15;
    const width = stage.width - margin * 2;
    const height = stage.height - margin * 2;
    const orient = width < height ? width : height;
    const radius = orient / 2 - margin;
    const chart = chartRef.current;
    if (!chart.svg) {
      chart.svg = d3.select(stageRef.current);
    }
    const total = data.reduce((sum, v) => sum + v.value, 0);
    const legendSpacing = 30;
    const legendSquareWidth = 20;

    if (!chart.pieGroup) {
      chart.pieGroup = chart.svg
        .append("g")
        .attr(
          "transform",
          `translate(${stage.width / 2}, ${stage.height / 2})`
        );
    }

    const arc = d3
      .arc()
      .cornerRadius(radius / 15)
      .padAngle(0.03)
      .innerRadius(radius / 2)
      .outerRadius(radius);

    function arcTween(a) {
      const i = d3.interpolate(this._current, a);
      this._current = i(1);
      return t => arc(i(t));
    }

    if(!chart.hoverPercent){
      chart.hoverPercent = chart.svg
        .append("text")
        .style("font-size", "48px")
        .style("font-weight", "800")
        .style("text-transform", "uppercase")
        .style("opacity", 0)
        .style("transition", "opacity 300ms")
        .attr("fill", theme.colors.gray)
        .attr("transform", `translate(${stage.width / 2}, ${(stage.height / 2) +5})`)
        .attr("text-anchor", "middle")
        .text("50%")
    }

    if(!chart.hoverLabel){
      chart.hoverLabel = chart.svg
        .append("text")
        .style("font-size", "18px")
        .style("font-weight", "800")
        .style("text-transform", "uppercase")
        .style("opacity", 0)
        .style("transition", "opacity 300ms")
        .attr("text-anchor", "middle")
        .attr("fill", theme.colors.gray)
        .attr("transform", `translate(${stage.width / 2}, ${(stage.height / 2) + 35})`)
        .text("Label")
    }

    chart.pie = d3
      .pie()
      .value(d => d.value)
      .sort(null)(data);

    if (!chart.arcs) {
      chart.arcs = chart.pieGroup
        .selectAll("g.slice")
        .data(chart.pie)
        .enter()
        .append("g")
        .attr("class", "slice")
    } else {
      chart.arcs.data(chart.pie);
    }

    if (!chart.slices) {
      chart.slices = chart.arcs
        .append("path")
        .attr("fill", (d, i) => d3.interpolateCool(0.9 * (i / data.length)))
        .attr("d", arc)

      chart.slices
        .transition()
        .duration(2000)
        .ease(d3.easeElastic.period(.4))
        .attrTween("d", arcTween)

      chart.slices.on("mouseover", d => {
        chart.hoverPercent
        .text(d.data.value)
        .style("opacity", 1)
        chart.hoverLabel
        .text(d.data.label)
        .style("opacity", 1)
      })

      chart.slices.on("mouseout", d => {
        chart.hoverPercent
        .style("opacity", 0)
        chart.hoverLabel
        .style("opacity", 0)
      })
    } else {
      chart.slices
        .data(chart.pie)
        .transition()
        .duration(2000)
        .ease(d3.easeElastic.period(.4))
        .attrTween("d", arcTween);
    }

    if (!chart.sliceLabels) {
      chart.sliceLabels = chart.arcs
        .append("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .style("font-weight", "800")
        .style("text-transform", "uppercase")
        .style("pointer-events", "none")
        .attr("fill", "#ffffff")
        .text((d, i) => `${Math.round((data[i].value / total) * 100)}%`);
    } else {
      chart.sliceLabels
        .data(chart.pie)
        .transition()
        .duration(2000)
        .ease(d3.easeElastic.period(.4))
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .text((d, i) => `${Math.round((data[i].value / total) * 100)}%`);
    }

    if (!chart.legend) {
      chart.legend = chart.svg.append("g").attr("class", "legend");
    }

    if (!chart.ordinals) {
      chart.ordinals = chart.legend
        .selectAll("g.legend-ordinal")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "legend-ordinal")
        .attr("transform", (d, i) => `translate(0, ${i * legendSpacing})`);
    } else {
      chart.ordinals.data(data);
    }

    if (!chart.ordinalSquares) {
      chart.ordinalSquares = chart.ordinals
        .append("rect")
        .attr("width", legendSquareWidth)
        .attr("height", legendSquareWidth)
        .attr("fill", (d, i) => d3.interpolateCool(0.9 * (i / data.length)))
        .attr("rx", 7)
        .attr("x", 0)
        .attr("y", 0);
    }

    if (!chart.ordinalLabels) {
      chart.ordinalLabels = chart.ordinals
        .append("text")
        .text(d => d.label)
        .style("font-size", "13px")
        .style("font-weight", "800")
        .style("text-transform", "uppercase")
        .attr("x", legendSquareWidth + 10)
        .attr("y", legendSquareWidth - legendSquareWidth / 4);
    }
  }, [data]);

  return <svg width={600} height={450} ref={stageRef}></svg>;
};
