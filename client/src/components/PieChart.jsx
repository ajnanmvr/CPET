import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";

function PieChart({ chartData, options }) {
  return (
    <Pie data={chartData} options={options} height={400} width={600}></Pie>
  );
}

export default PieChart;
