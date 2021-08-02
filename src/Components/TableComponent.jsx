import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { api_one, getDistricts } from "../apis/api";

const TableComponent = ({ state_id }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getTableData();
    // getTableStateData();
  }, []);

  const getTableData = () => {
    getDistricts().then((data) => {
      let tableData = [];
      data.map((d) => {
        return tableData.push({
          key: d.district_id,
          district: d.district_name,
          //   total: apiData.data.topBlock.vaccination.total,
          //   today: apiData.data.topBlock.vaccination.today,
        });
      });

      setData(tableData);
    });
  };

  //   const getTableStateData = () => {
  //     api_one(state_id, "", "").then(({ data }) => {
  //       console.log("31", data);
  //       let tableData = [];
  //       data?.map((d) => {
  //         if (d.state_id === state_id) {
  //           tableData.push({
  //             key: d.district_id,
  //             district: d.district_name,
  //             //   total: apiData.data.topBlock.vaccination.total,
  //             //   today: apiData.data.topBlock.vaccination.today,
  //           });
  //         }
  //         return setData(tableData);
  //       });
  //     });
  //   };

  const columns = [
    {
      title: "Districts",
      dataIndex: "district",
      sorter: {
        compare: (a, b) => a.district - b.district,
        multiple: 1,
      },
    },
    {
      title: "Today",
      dataIndex: "today",
      sorter: {
        compare: (a, b) => a.today - b.today,
        multiple: 3,
      },
    },
    {
      title: "Total",
      dataIndex: "total",
      sorter: {
        compare: (a, b) => a.total - b.total,
        multiple: 2,
      },
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    // console.log("params", pagination, filters, sorter, extra);
  }

  return <Table columns={columns} dataSource={data} onChange={onChange} />;
};

export default TableComponent;
