using CRM.DTO.Seed;
using CRM.DTO.SoilType;

namespace CRM.Models
{
    public class SoilType : AgroBase
    {
        public int SoilTypeId { get; set; }
        public string SoilTypeName { get; set; } = string.Empty;
        public SoilType()
        {
                
        }
        public SoilType(int id, AddSoilTypeDTO addSoilTypeDTO)
        {
            SoilTypeId = id;
            SoilTypeName = addSoilTypeDTO.SoilTypeName;
        }
    }
}
