import React from "react";
import HarvestTable from "../components/tables/HarvestTable";

const HarvestPage: React.FC = () => {
  return (
    <div>
      <h1>Manage Harvest</h1>
      <HarvestTable />
    </div>
  );
};

export default HarvestPage;
