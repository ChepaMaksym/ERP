using ERP.Server.DTO.Analytics;

namespace ERP.Server.Services.Interface
{
    public interface IAgroAnalyticsService
    {
        Task<IEnumerable<YieldBySoilTypeDto>> GetYieldBySoilTypeAsync();
        Task<IEnumerable<AverageDaysToHarvestDto>> GetAverageDaysToHarvestAsync();
        Task<IEnumerable<TopYieldingPlotDto>> GetTopYieldingPlotsAsync();
        Task<IEnumerable<TotalSeedCostByPlotDto>> GetTotalSeedCostByPlotAsync();
    }
}
