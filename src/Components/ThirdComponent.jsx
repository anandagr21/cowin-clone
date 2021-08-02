import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { api_one } from "../apis/api";

const ThirdComponent = () => {
  const [aefiDataDataset, setAefiDataDataset] = useState([]);
  const [aefiDataLabels, setAefiDataLabels] = useState(["Total"]);

  const data = {
    labels: aefiDataLabels,
    datasets: aefiDataDataset,
  };

  const options = {
    scales: {
      xAxes: [
        {
          type: "date",
        },
      ],
    },
    elements: {
      line: {
        tension: 0.5, // disables bezier curves
      },
    },
  };

  const aefiApi = () => {
    api_one().then(({ data }) => {
      let aefiChartData = [];
      let aefiDateData = [];
      data.last30DaysAefi.map((d) => {
        return [aefiChartData.push(d.aefi), aefiDateData.push(d.vaccine_date)];
      });

      setAefiDataLabels(aefiDateData);
      setAefiDataDataset([
        {
          label: "Total",
          data: [...aefiChartData],
          fill: false,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgba(255, 99, 132, 0.2)",
        },
      ]);
    });
  };

  useEffect(() => {
    aefiApi();
  }, []);

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="d-flex justify-content-between">
          <p>AEFI Reported</p>
          <p>Overall : 0.007%</p>
        </div>
        <Line data={data} options={options} />
      </div>

      <div className="col-md-6">
        <p>Rural vs Urban Trends</p>
        <Line data={data} options={options} height={100} />
      </div>
    </div>
  );
};

export default ThirdComponent;
