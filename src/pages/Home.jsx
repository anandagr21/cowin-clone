import React, { useEffect, useState } from "react";
import { api_one } from "../apis/api";
import VaccTrendsChart from "../Components/charts/VaccTrendsChart";
import DropdownComponent from "../Components/DropdownComponent";
import FifthComponent from "../Components/FifthComponent";
import FourthComponent from "../Components/FourthComponent";
import SecondComponent from "../Components/SecondComponent";
import ThirdComponent from "../Components/ThirdComponent";
import TileCards from "../Components/TileCards";

const Home = () => {
  const [stateName, setStateName] = useState([]);
  const [cardTileValue, setCardTileValue] = useState({
    totalVaccination: "",
    dose1: "",
    dose2: "",
    today: "",
    scVaccination: "",
    governmentVacc: "",
    privateVacc: "",
    age_45_plus: "",
    age_18_44: "",
    totalRegistrations: "",
  });

  const [state_id, setState_id] = useState("");

  useEffect(() => {
    fetchApiOne();
  }, [state_id]);

  const handleStateChange = (e) => {
    e.preventDefault();
    if (e.target.value === "Select State") {
      setState_id("");
    } else {
      setState_id(e.target.value);
    }
  };

  const fetchApiOne = () => {
    api_one(state_id, "", "").then(({ data }) => {
      setCardTileValue({
        ...cardTileValue,
        totalVaccination: data.topBlock.vaccination.total,
        dose1: data.topBlock.vaccination.tot_dose_1,
        dose2: data.topBlock.vaccination.tot_dose_2,
        today: data.topBlock.vaccination.today,
        scVaccination: data.topBlock.sites.total,
        governmentVacc: data.topBlock.sites.govt,
        privateVacc: data.topBlock.sites.pvt,
        age_45_plus: data.topBlock.registration.cit_45_above,
        age_18_44: data.topBlock.registration.cit_18_45,
        totalRegistrations: data.topBlock.registration.total,
      });
    });
  };

  return (
    <div className="container">
      <DropdownComponent handleStateChange={handleStateChange} />
      <TileCards cardTileValue={cardTileValue} />
      <VaccTrendsChart state_id={state_id} />
      <SecondComponent state_id={state_id} />
      <ThirdComponent state_id={state_id} />
      <FourthComponent state_id={state_id} />
      <FifthComponent state_id={state_id} />
    </div>
  );
};

export default Home;
