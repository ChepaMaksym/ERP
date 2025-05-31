import React from "react";
import Grid from "../components/Grid";
import { EditableRow } from "../types";
import useTableData from "../hooks/useTableData";


interface PotGrid extends EditableRow {
  PotId: number;
  Type: string;
  SoilTypeId: number;
}
enum PotGridKeys {
  PotId = "potId",
}

const PotPage: React.FC = () => {
  const tableData = useTableData<PotGrid>("pot"); 
  return (
    <div>
      <h1>Manage Pot</h1>
      <Grid<PotGrid> tableData={tableData} primaryKey={PotGridKeys.PotId} />
    </div>
  );
};

export default PotPage;
