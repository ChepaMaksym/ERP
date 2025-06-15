namespace ERP.Server.DTO.Analytics
{
    public class TopYieldingPlotDto
    {
        public string PlotName { get; set; }
        public decimal TotalHarvestKg { get; set; }
        public int TotalPlants { get; set; }
        public decimal AvgYieldPerPlant { get; set; }
    }
}
