import React from "react";

const TileCards = ({ cardTileValue }) => {
  const {
    totalVaccination,
    dose1,
    dose2,
    today,
    scVaccination,
    governmentVacc,
    privateVacc,
    totalRegistrations,
    age_18_44,
    age_45_plus,
  } = cardTileValue;
  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <p>Total Vaccination Doses</p>
              <p>Today: {today}</p>
            </div>
            <div>{totalVaccination}</div>
            <div className="row">
              <div className="col-6">
                <div className="d-flex-column">
                  <p>Dose 1</p>
                  {dose1}
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex-column">
                  <p>Dose 2</p>
                  {dose2}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <div>
              <p>Site Conducting Vaccination</p>
            </div>
            <div>{scVaccination}</div>
            <div className="row">
              <div className="col-6">
                <div className="d-flex-column">
                  <p>Government</p>
                  {governmentVacc}
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex-column">
                  <p>Private</p>
                  {privateVacc}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <div>
              <p>Total Registrations</p>
            </div>
            <div>{totalRegistrations}</div>
            <div className="row">
              <div className="col-6">
                <div className="d-flex-column">
                  <p>Age 18 - 44</p>
                  {age_18_44}
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex-column">
                  <p>Age 45+</p>
                  {age_45_plus}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TileCards;
