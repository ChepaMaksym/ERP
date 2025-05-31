import React from "react";
import Grid from "../components/Grid";
import { EditableRow } from "../types";
import useTableData from "../hooks/useTableData";


interface PlantGrid extends EditableRow {
  PlantId: number;
  SeedId: number;
  PotId: number;
  PlotId: number;
  PlantingDate: Date;
  TransplantDate: Date | null;
  HarvestDate: Date | null;
}
enum PlantGridKeys {
  PlantId = "plantId",
}

const PlantPage: React.FC = () => {
  const tableData = useTableData<PlantGrid>("plant"); 
  return (
    <div>
      <h1>Manage Plant</h1>
      <Grid<PlantGrid> tableData={tableData} primaryKey={PlantGridKeys.PlantId} />
    </div>
  );
};

export default PlantPage;
