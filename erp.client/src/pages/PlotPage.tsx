import React from "react";
import Grid from "../components/Grid";
import { EditableRow } from "../types";
import useTableData from "../hooks/useTableData";


interface PlotGrid extends EditableRow {
  PlotId: number;
  GardenId: number;
  SoilTypeId: number;
  Name: string;
  Size: number;
}
enum PlotGridKeys {
  PlotId = "plotId",
}

const PlotPage: React.FC = () => {
  const tableData = useTableData<PlotGrid>("plot"); 
  return (
    <div>
      <h1>Manage Plot</h1>
      <Grid<PlotGrid> tableData={tableData} primaryKey={PlotGridKeys.PlotId} />
    </div>
  );
};

export default PlotPage;
