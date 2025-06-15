using CRM.DTO.Garden;

namespace CRM.Models
{
    public class Field : AgroBase
    {
        public int GardenId { get; set; }
        public decimal Size { get; set; }
        public Field()
        {
                
        }
        public Field(int id, AddGardenDTO addGardenDTO)
        {
            GardenId = id;
            Size = addGardenDTO.Size;  
        }
    }
}
