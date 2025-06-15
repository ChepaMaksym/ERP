using System.ComponentModel.DataAnnotations;

namespace CRM.DTO.Plot
{
    public class UpdatePlotDTO
    {
        [Required]
        public int PlotId { get; set; }

        [Required]
        public int GardenId { get; set; }

        [Required]
        public int SoilTypeId { get; set; }
        [Required]
        [MinLength(5, ErrorMessage = "Name must be at least 5 characters.")]
        [MaxLength(50, ErrorMessage = "Name must be at most 50 characters.")]
        public string Name { get; set; } = string.Empty;

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Size must be greater than 0.")]
        public int Size { get; set; }
    }
}
