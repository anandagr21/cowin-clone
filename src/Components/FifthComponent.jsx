import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { api_two } from "../apis/api";

const FifthComponent = ({ state_id }) => {
  const [currentRight, setCurrentRight] = useState("30days");
  const [chartDataDataset, setChartDataDataset] = useState([]);
  const [chartDataLabels, setChartDataLabels] = useState([]);
  const [date, setDate] = useState("");

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

  const handleRightClick = (e) => {
    setCurrentRight(e.key);
    setDate(e.key);
    if (e.key === "today") {
      setDate(new Date());
    }
    if (e.key === "30days" || e.key === "all") {
      setDate("");
    }
  };

  useEffect(() => {
    fetchApiTwoData();
  }, [date]);

  const fetchApiTwoData = () => {
    api_two("", "", date).then(({ data }) => {
      if (currentRight === "30days") {
        let totalChartData = [];
        let secondChartData = [];
        let thirdChartData = [];
        let above60ChartData = [];
        let dateData = [];

        data.regReportData?.map((d) => {
          return [
            totalChartData.push(d.total),
            secondChartData.push(d.age18),
            thirdChartData.push(d.age45),
            above60ChartData.push(d.age60),
            dateData.push(d.reg_date),
          ];
        });

        setChartDataLabels(dateData);
        setChartDataDataset([
          {
            label: "Total",
            data: [...totalChartData],
            fill: false,
            backgroundColor: "rgb(20, 232, 251)",
            borderColor: "rgb(20, 232, 251, 0.2)",
          },
          {
            label: "18-44",
            data: [...secondChartData],
            fill: false,
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgba(255, 99, 132, 0.2)",
          },
          {
            label: "45-60",
            data: [...thirdChartData],
            fill: false,
            backgroundColor: "rgb(178, 126, 14)",
            borderColor: "rgb(178, 126, 14, 0.2)",
          },
          {
            label: "Above 60",
            data: [...above60ChartData],
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
      {state_id ? (
        ""
      ) : (
        <>
          <h6 className="pt-5">Registration Trends</h6>
          <div className="d-flex justify-content-end">
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
      )}
    </>
  );
};

export default FifthComponent;
