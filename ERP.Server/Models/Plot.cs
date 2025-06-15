using CRM.DTO.Plot;

namespace CRM.Models
{
    public class Plot : AgroBase
    {
        public int PlotId { get; set; }
        public int GardenId { get; set; }
        public int SoilTypeId { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Size { get; set; }
        public Plot()
        {
                
        }
        public Plot(int id, AddPlotDTO addPlotDTO)
        {
            PlotId = id;
            GardenId = addPlotDTO.GardenId;
            SoilTypeId = addPlotDTO.SoilTypeId;
            Name = addPlotDTO.Name;
            Size = addPlotDTO.Size;
        }
    }
}
