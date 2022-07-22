import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";

function BarChart({ chartData, options }) {
  return (
    <Bar data={chartData} options={options} height={400} width={600}></Bar>
  );
}

export default BarChart;
