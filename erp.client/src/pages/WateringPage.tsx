import React from "react";
import Grid from "../components/Grid";
import { EditableRow } from "../types";
import useTableData from "../hooks/useTableData";


interface WateringGrid extends EditableRow {
  WateringId: number;
  PlotId: number;
  Date: Date;
  Amount: number;
}
enum WateringGridKeys {
  WateringId = "wateringId",
}

const SoilTypePage: React.FC = () => {
  const tableData = useTableData<WateringGrid>("watering"); 
  return (
    <div>
      <h1>Manage Watering</h1>
      <Grid<WateringGrid> tableData={tableData} primaryKey={WateringGridKeys.WateringId} />
    </div>
  );
};

export default SoilTypePage;
