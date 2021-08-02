import React from "react";
import ByAgePieChart from "./charts/ByAgePieChart";
import CategoryOneChart from "./charts/CategoryOneChart";
import CategoryTwoChart from "./charts/CategoryTwoChart";
import TableComponent from "./TableComponent";

const SecondComponent = ({ state_id }) => {
  return (
    <div className="row pt-5">
      <div className="col-md-3">
        <h6>Vaccination - Category</h6>
        <div className="d-flex-column">
          <CategoryOneChart state_id={state_id} />
          <CategoryTwoChart state_id={state_id} />
        </div>
      </div>

      <div className="col-md-4">
        <ByAgePieChart />
      </div>

      <div className="col-md-5">
        <TableComponent state_id={state_id} />
      </div>
    </div>
  );
};

export default SecondComponent;
