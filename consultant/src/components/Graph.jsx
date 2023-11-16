import React, { useEffect } from "react";
import "../styles/Graph.css";
import * as d3 from "d3";
import { Spinner } from "reactstrap";

function Graph(props) {
  useEffect(() => {
    const svgContainer = d3.select("#graph-container");
    svgContainer.selectAll("*").remove();
    const svgList = d3.select("#list-container");
    svgList.selectAll("*").remove();

    const data = props.jsonData;
    //[
    //   { load_type: "RECYCLING - SINGLE STREAM", total: 1452741062.0 },
    //   { load_type: "RECYCLING - PAPER", total: 25277320.0 },
    //   { load_type: "RECYCLING - COMINGLE", total: 22683850.0 },
    //   { load_type: "SWEEPING", total: 144137354.0 },
    //   { load_type: "BRUSH", total: 195333878.0 },
    //   { load_type: "TIRES", total: 5512514.0 },
    //   { load_type: "BULK", total: 251790513.0 },
    //   { load_type: "RECYCLED METAL", total: 741868.0 },
    // ];

    // SVG Canvas Dimensions
    const width = 800; // Ancho del lienzo ajustado
    const height = 400;
    const radius = Math.min(width, height) / 2;

    // Create the main container
    const container = d3
      .select("#graph-container")
      .append("div")
      .attr("class", "container");

    // Create the SVG container for the graph
    const svg = container
      .append("svg")
      .attr("width", width / 2)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 4 + "," + height / 2 + ")");

    // Create the arc generator
    const arc = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    // Create the color scale function
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // Create the foot data generation function
    const pie = d3.pie().value((d) => d.total);

    // Select arc elements and bind data
    const arcs = svg
      .selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => colorScale(i))
      .attr("stroke", "white")
      .style("stroke-width", "2px");

    // Add labels with percentages
    svg
      .selectAll("text")
      .data(pie(data))
      .enter()
      .append("text")
      .filter((d) => ((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100 > 4)
      .attr("transform", (d) => "translate(" + arc.centroid(d) + ")")
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(
        (d) =>
          `${Math.round(((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100)}%`
      );

    // Create the container for the list on the right side
    const listContainer = container
      .append("div")
      .attr("class", "list-container")
      .style("float", "right")
      .style("margin-left", "20px");

    // Sort the list by percentage in descending order
    const sortedData = data.slice().sort((a, b) => b.total - a.total);

    //Details list
    const detailsList = listContainer
      .append("ul")
      .style("list-style", "none")
      .selectAll("li")
      .data(sortedData)
      .enter()
      .append("li")
      .html(
        (d) =>
          `<span style="color: ${colorScale(
            data.indexOf(d)
          )}; font-size: 24px;">&#8226;</span> ${
            d.load_type
          } - ${d.total.toFixed(1)}Kg (${(
            (d.total / data.reduce((acc, curr) => acc + curr.total, 0)) *
            100
          ).toFixed(1)}%)`
      );
  }, [props.jsonData]);
  const isListEmpty = props.jsonData.length === 0;
  if (props.loading) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <Spinner color="primary">Loading...</Spinner>
      </div>
    );
  }
  if (isListEmpty) {
    return <div>No data in this range</div>;
  }
  return (
    <div>
      <div id="graph-container"></div>
      <div id="list-container"></div>
    </div>
  );
}

export default Graph;
