import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { api_one } from "../../apis/api";

const ByAgePieChart = () => {
  const [ageData, setAgeData] = useState([]);
  const data = {
    labels: ["18-44", "45-60", "Above 60"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    fetchVaccAgedata();
  }, []);

  const fetchVaccAgedata = () => {
    api_one().then(({ data }) => {
      let ageDataArr = [];
      ageDataArr.push(data.vaccinationByAge.vac_18_45);
      ageDataArr.push(data.vaccinationByAge.vac_45_60);
      ageDataArr.push(data.vaccinationByAge.above_60);
      setAgeData(ageDataArr);
    });
  };

  return <Pie data={data} height={100} />;
};

export default ByAgePieChart;
