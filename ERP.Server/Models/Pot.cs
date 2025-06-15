using CRM.DTO.Pot;

namespace CRM.Models
{
    public class Pot : AgroBase
    {
        public int PotId { get; set; }
        public int SoilTypeId { get; set; }
        public string Type { get; set; } = string.Empty;
        public Pot()
        {
                
        }

        public Pot(int id, AddPotDTO addPotDTO)
        {
            PotId = id;
            SoilTypeId = addPotDTO.SoilTypeId;
            Type = addPotDTO.Type;
        }
    }
}
