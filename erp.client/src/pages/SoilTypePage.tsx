import React from "react";
import Grid from "../components/Grid";
import { EditableRow } from "../types";
import useTableData from "../hooks/useTableData";


interface SoilTypeGrid extends EditableRow {
  SoilTypeId: number;
  SoilTypeName: string;
}
enum SoilTypeGridKeys {
  SoilTypeId = "soilTypeId",
}

const SoilTypePage: React.FC = () => {
  const tableData = useTableData<SoilTypeGrid>("soilType"); 
  return (
    <div>
      <h1>Manage Soil Type</h1>
      <Grid<SoilTypeGrid> tableData={tableData} primaryKey={SoilTypeGridKeys.SoilTypeId} />
    </div>
  );
};

export default SoilTypePage;
