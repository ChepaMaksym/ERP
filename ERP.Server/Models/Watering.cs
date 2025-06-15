using CRM.DTO.Watering;

namespace CRM.Models
{
    public class Watering : AgroBase
    {
        public int WateringId { get; set; }
        public int PlotId { get; set; }
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
        public Watering()
        {
                
        }
        public Watering(int id, AddWateringDTO addWateringDTO)
        {
            WateringId = id;
            PlotId = addWateringDTO.PlotId;
            Date = addWateringDTO.Date;
            Amount = (decimal)addWateringDTO.Amount;
        }
    }
}
