import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { Line } from "react-chartjs-2";
import { api_two } from "../../apis/api";

const { SubMenu } = Menu;

const VaccTrendsChart = ({ state_id }) => {
  const [currentLeft, setCurrentLeft] = useState("byDose");
  const [currentRight, setCurrentRight] = useState("30days");
  const [chartDataDataset, setChartDataDataset] = useState([]);
  const [chartDataLabels, setChartDataLabels] = useState([]);

  const data = {
    labels: chartDataLabels,
    datasets: chartDataDataset,
  };

  const options = {
    scales: {
      xAxes: [
        {
          type: "time",
        },
      ],
    },
    elements: {
      line: {
        tension: 0.5, // disables bezier curves
      },
    },
  };

  const handleLeftClick = (e) => {
    setCurrentLeft(e.key);
  };

  const handleRightClick = (e) => {
    setCurrentRight(e.key);
  };

  useEffect(() => {
    fetchApiTwoData();
  }, [state_id]);

  const fetchApiTwoData = () => {
    api_two(state_id, "", "").then(({ data }) => {
      if (currentLeft === "byDose") {
        let doseChartData = [];
        let doseOneChartData = [];
        let doseTwoChartData = [];
        let dateData = [];
        data.last30DaysVaccination.map((d) => {
          return [
            doseChartData.push(d.total),
            doseOneChartData.push(d.dose_1),
            doseTwoChartData.push(d.dose_2),
            dateData.push(d.vaccine_date),
          ];
        });

        setChartDataLabels(dateData);
        setChartDataDataset([
          {
            label: "Total Doses",
            data: [...doseChartData],
            fill: false,
            backgroundColor: "rgb(20, 232, 251)",
            borderColor: "rgb(20, 232, 251, 0.2)",
          },
          {
            label: "Dose One",
            data: [...doseOneChartData],
            fill: false,
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgba(255, 99, 132, 0.2)",
          },
          {
            label: "Dose Two",
            data: [...doseTwoChartData],
            fill: false,
            backgroundColor: "rgb(178, 126, 14)",
            borderColor: "rgb(178, 126, 14, 0.2)",
          },
        ]);
      }
    });
  };

  return (
    <>
      <h6 className="pt-5">Vaccination Trends</h6>
      <div className="d-flex justify-content-between">
        <Menu
          onClick={handleLeftClick}
          selectedKeys={[currentLeft]}
          mode="horizontal"
        >
          <Menu.Item key="byDose">By Doses</Menu.Item>
          <Menu.Item key="byAge">By Age</Menu.Item>
        </Menu>
        <Menu
          onClick={handleRightClick}
          selectedKeys={[currentRight]}
          mode="horizontal"
        >
          <Menu.Item key="today">Today</Menu.Item>
          <Menu.Item key="30days">Last 30 Days</Menu.Item>
          <Menu.Item key="all">All</Menu.Item>
        </Menu>
      </div>

      <div>
        <Line data={data} options={options} height={100} />
      </div>
    </>
  );
};

export default VaccTrendsChart;
