using CRM.Controllers;
using CRM.Models;
using ERP.Server.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace ERP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgroAnalyticsController(
        IAgroAnalyticsService agroAnalyticsService,
        ILogger<AgroAnalyticsController> logger)
        : BaseController<AgroBase>(logger)
    {
        private readonly IAgroAnalyticsService _agroAnalyticsService = agroAnalyticsService;

        [HttpGet("yield-by-soil-type")]
        public async Task<IActionResult> GetYieldBySoilType()
        {
            try
            {
                var result = await _agroAnalyticsService.GetYieldBySoilTypeAsync();
                return Ok(new { data = result });
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }
        //issue
        [HttpGet("average-days-to-harvest")]
        public async Task<IActionResult> GetAverageDaysToHarvest()
        {
            try
            {
                var result = await _agroAnalyticsService.GetAverageDaysToHarvestAsync();
                return Ok(new { data = result });
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpGet("top-yielding-plots")]
        public async Task<IActionResult> GetTopYieldingPlots()
        {
            try
            {
                var result = await _agroAnalyticsService.GetTopYieldingPlotsAsync();
                return Ok(new { data = result });
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpGet("total-seed-cost-by-plot")]
        public async Task<IActionResult> GetTotalSeedCostByPlot()
        {
            try
            {
                var result = await _agroAnalyticsService.GetTotalSeedCostByPlotAsync();
                return Ok(new { data = result });
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }
    }

}
