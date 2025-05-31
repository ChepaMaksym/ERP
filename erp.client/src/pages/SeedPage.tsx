import React from "react";
import Grid from "../components/Grid";
import { EditableRow } from "../types";
import useTableData from "../hooks/useTableData";


interface SeedGrid extends EditableRow {
  PlantId: number;
  Name: string;
  Cost: number;
}
enum SeedGridKeys {
  SeedId = "seedId",
}

const SeedPage: React.FC = () => {
  const tableData = useTableData<SeedGrid>("seed"); 
  return (
    <div>
      <h1>Manage Seed</h1>
      <Grid<SeedGrid> tableData={tableData} primaryKey={SeedGridKeys.SeedId} />
    </div>
  );
};

export default SeedPage;
