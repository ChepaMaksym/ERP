using System.ComponentModel.DataAnnotations;

namespace CRM.DTO.Seed
{
    public class AddSeedDTO
    {
        [Required]
        [MinLength(5, ErrorMessage = "Name must be at least 5 characters.")]
        [MaxLength(50, ErrorMessage = "Name must be at most 50 characters.")]
        public string Name { get; set; } = string.Empty;
        [Required]
        public decimal Cost { get; set; }
    }
}
