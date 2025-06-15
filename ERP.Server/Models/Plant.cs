using CRM.DTO.Harvest;
using CRM.DTO.Plant;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace CRM.Models
{
    public class Plant : AgroBase
    {
        public int PlantId { get; set; }
        public int SeedId { get; set; }
        public int? PotId { get; set; }
        public int? PlotId { get; set; }
        public DateTime PlantingDate { get; set; }
        public DateTime? TransplantDate { get; set; }
        public DateTime? HarvestDate { get; set; }
        public Plant()
        {
                
        }
        public Plant(int id, AddPlantDTO addPlant)
        {
            PlantId = id;
            SeedId = addPlant.SeedId;
            PotId = addPlant.PotId;
            PlotId = addPlant.PlotId;
            PlantingDate = addPlant.PlantingDate;
            TransplantDate = addPlant.TransplantDate;
            HarvestDate = addPlant.HarvestDate;
        }
    }
}
