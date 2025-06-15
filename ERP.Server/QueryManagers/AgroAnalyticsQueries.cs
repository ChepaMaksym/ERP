namespace ERP.Server.QueryManagers
{
    public static  class AgroAnalyticsQueries
    {
        public const string YieldBySoilType = @"
            SELECT 
                st.soil_type,
                SUM(h.quantity_kg) AS total_harvest_kg,
                COUNT(DISTINCT p.plant_id) AS plant_count,
                SUM(h.quantity_kg) / COUNT(DISTINCT p.plant_id) AS avg_yield_per_plant
            FROM SoilTypes st
            JOIN Plots pl ON st.soil_type_id = pl.soil_type_id
            JOIN Plants p ON pl.plot_id = p.plot_id
            JOIN Harvest h ON p.plant_id = h.plant_id
            GROUP BY st.soil_type
            ORDER BY avg_yield_per_plant DESC;
            ";
        public const string AverageDaysToHarvest = @"
            SELECT 
                s.name AS seed_name,
                AVG(DATEDIFF(DAY, p.planting_date, p.harvest_date)) AS avg_days_to_harvest
            FROM Plants p
            JOIN Seeds s ON p.seed_id = s.seed_id
            WHERE p.harvest_date IS NOT NULL
            GROUP BY s.name
            ORDER BY avg_days_to_harvest;
            ";
        public const string TopYieldingPlots = @"
            SELECT 
                pl.name AS plot_name,
                SUM(h.quantity_kg) AS total_harvest_kg,
                COUNT(DISTINCT p.plant_id) AS total_plants,
                SUM(h.quantity_kg) / NULLIF(COUNT(DISTINCT p.plant_id), 0) AS avg_yield_per_plant
            FROM Plots pl
            JOIN Plants p ON pl.plot_id = p.plot_id
            JOIN Harvest h ON p.plant_id = h.plant_id
            GROUP BY pl.name
            ORDER BY total_harvest_kg DESC;
            ";
        public const string TotalSeedCostByPlot = @"
            SELECT 
                pl.name AS plot_name,
                SUM(s.cost) AS total_seed_cost
            FROM Plants p
            JOIN Seeds s ON p.seed_id = s.seed_id
            JOIN Plots pl ON p.plot_id = pl.plot_id
            GROUP BY pl.name
            ORDER BY total_seed_cost DESC;
            ";
    }
}
