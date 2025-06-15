using CRM.DTO.Seed;

namespace CRM.Models
{
    public class Seed : AgroBase
    {
        public int SeedId { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Cost { get; set; }
        public Seed()
        {
                
        }
        public Seed(int id, AddSeedDTO addSeedDTO)
        {
            SeedId = id;
            Name = addSeedDTO.Name;
            Cost = addSeedDTO.Cost;
        }
    }
}
