import React from "react";
import Grid from "../components/Grid";
import { EditableRow } from "../types";
import useTableData from "../hooks/useTableData";


interface GardenGrid extends EditableRow {
  GardenId: number;
  Size: number;
}

const GardenPage: React.FC = () => {
  const tableData = useTableData<GardenGrid>("garden"); 
  return (
    <div>
      <h1>Manage Gardens</h1>
      <Grid<GardenGrid> tableData={tableData} />
    </div>
  );
};

export default GardenPage;
