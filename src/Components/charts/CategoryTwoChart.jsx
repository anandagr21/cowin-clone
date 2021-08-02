import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { api_one } from "../../apis/api";

const CategoryTwoChart = ({ state_id }) => {
  const [brandDataSet, setBrandDataSet] = useState([]);

  const data = {
    labels: ["Covishield", "Covaxin", "Sputnik V"],
    datasets: [
      {
        data: brandDataSet,
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
  useEffect(() => {
    fetchBrandWisedata();
  }, [state_id]);

  const fetchBrandWisedata = () => {
    api_one(state_id, "", "").then(({ data }) => {
      let brandDataArr = [];
      brandDataArr.push(data.topBlock.vaccination.covishield);
      brandDataArr.push(data.topBlock.vaccination.covaxin);
      brandDataArr.push(data.topBlock.vaccination.sputnik);
      setBrandDataSet(brandDataArr);
    });
  };
  return <Doughnut data={data} height={100} />;
};

export default CategoryTwoChart;
