import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "../../Axios";
import BarChart from "../../components/PieChart";

function AllBranchPie() {
  const [details, setDetails] = useState([]);
  const getStudentsDetails = async () => {
    try {
      let { data } = await Axios.post("/student/all-details?branch=true");
      setDetails(data);
    } catch (error) {
      console.log(error);
    }
  };
  const chartData = {
    labels: details?.map((x) => x.branch[0]?.branchName),
    datasets: [
      {
        label: `${details?.length} Sections`,
        data: details?.map((x) => x.numStudents),
        backgroundColor: [
          "#395B64",
          "#5A8F7B",
          "#A5C9CA",
          "#876445",
          "#513252",
          "#D61C4E",
          "#3AB4F2",
          "#231955",
          "#1F4690",
          "#E8AA42",
          "#CCD6A6",
          "#495C83",
          "#7A86B6",
          "#495C83",
          "#66BFBF",
          "#B2C8DF",
          "#F37878",
          "#F8F9D7",
          "#90C8AC",
          "#377D71",
          "#E4DCCF",
          "#576F72",
          "#FFC4C4",
          "#3F4E4F",
          "#937DC2",
          "#FF869E",
          "#9CB4CC",
          "#810955",
          "#748DA6",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    scales: {},
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  };

  useEffect(() => {
    getStudentsDetails();
  }, []);
  return (
    <>
      <h1 className="text-center font-bold text-3xl text-teal-600">
        All Students <span className="text-sm">(Branch Based)</span>
      </h1>
      <div className="mx-auto w-1/2">
        <BarChart chartData={chartData} options={options} />
      </div>
    </>
  );
}

export default AllBranchPie;
