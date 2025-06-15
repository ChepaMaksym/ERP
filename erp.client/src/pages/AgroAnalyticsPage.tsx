import React from "react";
import Grid from "../components/Grid";
import { EditableRow } from "../types";
import useTableData from "../hooks/useTableData";


interface YieldBySoilTypeDto extends EditableRow{
  soilType: string;
  totalHarvestKg: number;
  plantCount: number;
  avgYieldPerPlant: number;
}

interface AverageDaysToHarvestDto extends EditableRow {
  seedName: string;
  avgDaysToHarvest: number;
}

interface TopYieldingPlotDto extends EditableRow {
  plotName: string;
  totalHarvestKg: number;
  totalPlants: number;
  avgYieldPerPlant: number;
}

interface TotalSeedCostByPlotDto extends EditableRow {
  plotName: string;
  totalSeedCost: number;
}

const AgroAnalyticsPage: React.FC = () => {
  const yieldBySoilType = useTableData<YieldBySoilTypeDto>("agroanalytics/yield-by-soil-type");
  const averageDaysToHarvest = useTableData<AverageDaysToHarvestDto>("agroanalytics/average-days-to-harvest");
  const topYieldingPlots = useTableData<TopYieldingPlotDto>("agroanalytics/top-yielding-plots");
  const totalSeedCostByPlot = useTableData<TotalSeedCostByPlotDto>("agroanalytics/total-seed-cost-by-plot");
  return (
    <>
    <div>
        <h2>Yield by Soil Type</h2>
        <Grid<YieldBySoilTypeDto> tableData={yieldBySoilType} isReadOnly={true} />
      </div>

      <div>
        <h2>Average Days to Harvest</h2>
        <Grid<AverageDaysToHarvestDto> tableData={averageDaysToHarvest} isReadOnly={true} />
      </div>

      <div>
        <h2>Top Yielding Plots</h2>
        <Grid<TopYieldingPlotDto> tableData={topYieldingPlots} isReadOnly={true}/>
      </div>

      <div>
        <h2>Total Seed Cost by Plot</h2>
        <Grid<TotalSeedCostByPlotDto> tableData={totalSeedCostByPlot} isReadOnly={true}/>
      </div>
    </>
  );
};
export default AgroAnalyticsPage;
