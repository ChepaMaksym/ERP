using ERP.Server.DTO.Analytics;
using ERP.Server.QueryManagers;
using ERP.Server.Services.Interface;
using Microsoft.Data.SqlClient;

namespace ERP.Server.Services
{
    public class AgroAnalyticsService(string connectionString) : IAgroAnalyticsService
    {
        private readonly string _connectionString = connectionString;

        public async Task<IEnumerable<YieldBySoilTypeDto>> GetYieldBySoilTypeAsync()
        {
            var result = new List<YieldBySoilTypeDto>();
            using var connection = new SqlConnection(_connectionString);
            var command = new SqlCommand(AgroAnalyticsQueries.YieldBySoilType, connection);
            await connection.OpenAsync();
            using var reader = await command.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                result.Add(new YieldBySoilTypeDto
                {
                    SoilType = reader["soil_type"].ToString(),
                    TotalHarvestKg = (decimal)reader["total_harvest_kg"],
                    PlantCount = (int)reader["plant_count"],
                    AvgYieldPerPlant = (decimal)reader["avg_yield_per_plant"]
                });
            }

            return result;
        }

        public async Task<IEnumerable<AverageDaysToHarvestDto>> GetAverageDaysToHarvestAsync()
        {
            var result = new List<AverageDaysToHarvestDto>();
            using var connection = new SqlConnection(_connectionString);
            var command = new SqlCommand(AgroAnalyticsQueries.AverageDaysToHarvest, connection);
            await connection.OpenAsync();
            using var reader = await command.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                result.Add(new AverageDaysToHarvestDto
                {
                    SeedName = reader["seed_name"].ToString(),
                    AvgDaysToHarvest = (int)reader["avg_days_to_harvest"]
                });
            }

            return result;
        }

        public async Task<IEnumerable<TopYieldingPlotDto>> GetTopYieldingPlotsAsync()
        {
            var result = new List<TopYieldingPlotDto>();
            using var connection = new SqlConnection(_connectionString);
            var command = new SqlCommand(AgroAnalyticsQueries.TopYieldingPlots, connection);
            await connection.OpenAsync();
            using var reader = await command.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                result.Add(new TopYieldingPlotDto
                {
                    PlotName = reader["plot_name"].ToString(),
                    TotalHarvestKg = (decimal)reader["total_harvest_kg"],
                    TotalPlants = (int)reader["total_plants"],
                    AvgYieldPerPlant = (decimal)reader["avg_yield_per_plant"]
                });
            }

            return result;
        }

        public async Task<IEnumerable<TotalSeedCostByPlotDto>> GetTotalSeedCostByPlotAsync()
        {
            var result = new List<TotalSeedCostByPlotDto>();
            using var connection = new SqlConnection(_connectionString);
            var command = new SqlCommand(AgroAnalyticsQueries.TotalSeedCostByPlot, connection);
            await connection.OpenAsync();
            using var reader = await command.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                result.Add(new TotalSeedCostByPlotDto
                {
                    PlotName = reader["plot_name"].ToString(),
                    TotalSeedCost = (decimal)reader["total_seed_cost"]
                });
            }

            return result;
        }
    }
}
