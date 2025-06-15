using System.ComponentModel.DataAnnotations;

namespace CRM.DTO.Pot
{
    public class AddPotDTO
    {
        [Required]
        [MinLength(5, ErrorMessage = "Type must be at least 5 characters.")]
        [MaxLength(50, ErrorMessage = "Type must be at most 50 characters.")]
        public string Type { get; set; } = string.Empty;
        [Required]
        public int SoilTypeId { get; set; }
    }
}
