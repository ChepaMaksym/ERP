namespace ERP.Server.DTO.Analytics
{
    public class YieldBySoilTypeDto
    {
        public string SoilType { get; set; }
        public decimal TotalHarvestKg { get; set; }
        public int PlantCount { get; set; }
        public decimal AvgYieldPerPlant { get; set; }
    }
}
