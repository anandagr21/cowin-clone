import { Select } from "antd";
import React from "react";
import { stateData } from "../data/stateData";
const { Option } = Select;

const DropdownComponent = ({ handleStateChange }) => {
  return (
    <div className="row ">
      <div className="col-3 ml-auto">
        {/* render State dropdown */}

        <form className="form-inline">
          <div className="form-group">
            <select
              name="color"
              className="form-control"
              onChange={handleStateChange}
            >
              <option>Select State</option>
              {stateData.map((s) => (
                <option key={s.state_id} value={s.state_id}>
                  {s.state_name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DropdownComponent;
