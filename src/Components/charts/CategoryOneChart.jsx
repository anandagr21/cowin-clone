import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { api_one } from "../../apis/api";

const CategoryOneChart = ({ state_id }) => {
  const [ageDataSet, setAgeDataSet] = useState([]);

  const data = {
    labels: ["Male", "Female", "Other"],
    datasets: [
      {
        data: ageDataSet,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
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

  const options = {};

  useEffect(() => {
    fetchAgeWisedata();
  }, [state_id]);

  const fetchAgeWisedata = () => {
    api_one(state_id, "", "").then(({ data }) => {
      let ageDataArr = [];
      ageDataArr.push(data.topBlock.vaccination.male);
      ageDataArr.push(data.topBlock.vaccination.female);
      ageDataArr.push(data.topBlock.vaccination.others);
      setAgeDataSet(ageDataArr);
    });
  };

  return <Doughnut data={data} options={options} height={100} />;
};

export default CategoryOneChart;
