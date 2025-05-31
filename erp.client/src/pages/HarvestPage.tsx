import React from "react";
import Grid from "../components/Grid";
import { EditableRow } from "../types";
import useTableData from "../hooks/useTableData";


interface HarvestGrid extends EditableRow {
  HarvestId: number;
  PlantId: number;
  Date: Date;
  QuantityKg: number;
  AverageWeightPerItem: number;
  NumberItems: number;
}
enum HarvestGridKeys {
  HarvestId = "harvestId",
}

const HarvestPage: React.FC = () => {
  const tableData = useTableData<HarvestGrid>("harvest"); 
  return (
    <div>
      <h1>Manage Harvest</h1>
      <Grid<HarvestGrid> tableData={tableData} primaryKey={HarvestGridKeys.HarvestId} />
    </div>
  );
};
export default HarvestPage;
