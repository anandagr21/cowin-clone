import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { api_one } from "../apis/api";

const FourthComponent = () => {
  const [dataset, setDataset] = useState([]);
  const [dataLabels, setDataLabels] = useState([]);

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const data = {
    labels: dataLabels,
    datasets: dataset,
  };

  useEffect(() => {
    vaccineCoverageApi();
  }, []);

  const vaccineCoverageApi = () => {
    api_one().then(({ data }) => {
      let stateName = [];
      let dose_1 = [];
      let dose_2 = [];
      data.getBeneficiariesGroupBy.map((d) => {
        return [
          stateName.push(d.state_name),
          dose_1.push(d.partial_vaccinated),
          dose_2.push(d.totally_vaccinated),
        ];
      });
      setDataLabels(stateName);
      setDataset([
        {
          label: "Dose 1",
          data: [...dose_1],
          fill: false,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgba(255, 99, 132, 0.2)",
        },
        {
          label: "Dose 2",
          data: [...dose_2],
          fill: false,
          backgroundColor: "rgba(54, 162, 235, 1)",
          borderColor: "rgba(54, 162, 235, 1, 0.2)",
        },
      ]);
    });
  };

  return <Bar data={data} options={options} height={100} />;
};

export default FourthComponent;
