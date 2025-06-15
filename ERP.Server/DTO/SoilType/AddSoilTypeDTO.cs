using System.ComponentModel.DataAnnotations;

namespace CRM.DTO.SoilType
{
    public class AddSoilTypeDTO
    {
        [Required]
        [MinLength(5, ErrorMessage = "SoilTypeName must be at least 5 characters.")]
        [MaxLength(50, ErrorMessage = "SoilTypeName must be at most 50 characters.")]
        public string SoilTypeName { get; set; } = string.Empty;
    }
}
