import React from "react";
import Grid from "../components/Grid";
import { EditableRow } from "../types";
import useTableData from "../hooks/useTableData";


interface FieldGrid extends EditableRow {
  GardenId: number;
  Size: number;
}
enum GardenGridKeys {
  GardenId = "gardenId",
}

const FieldPage: React.FC = () => {
  const tableData = useTableData<FieldGrid>("field"); 
  return (
    <div>
      <h1>Manage Fields</h1>
      <Grid<FieldGrid> tableData={tableData} primaryKey={GardenGridKeys.GardenId} />
    </div>
  );
};

export default FieldPage;
