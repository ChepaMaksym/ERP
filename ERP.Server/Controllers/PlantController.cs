using Azure;
using CRM.DTO.Plant;
using CRM.Models;
using CRM.QueryManagers.Tables;
using CRM.Services;
using CRM.Services.Interface;
using ERP.Server.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlantController : BaseController<Plant>
    {
        private readonly IPlantService _plantService;
        public PlantController(
        IPlantService plantService,
        ILogger<PlantController> logger,
        IConfiguration configuration)
        : base(logger, configuration.GetConnectionString("DefaultConnection"))
        {
            _plantService = plantService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var plants = await _plantService.GetAllAsync();
                var seedsDropdown = await GetDropdownAsync(SeedColumns.TableName, SeedColumns.Name, primaryKey: SeedColumns.SeedId);
                var potsDropdown = await GetDropdownAsync(PotColumns.TableName, PotColumns.Type, primaryKey: PotColumns.PotId);
                var plotsDropdown = await GetDropdownAsync(PlotColumns.TableName, PlotColumns.Name, primaryKey: PlotColumns.PlotId);

                var response = new
                {
                    data = plants,
                    lookups = new Dictionary<string, IEnumerable<DropdownItemDTO>>
                            {
                                { nameof(Plant.SeedId) , seedsDropdown },
                                { nameof(Plant.PotId) , potsDropdown },
                                { nameof(Plant.PlotId) , plotsDropdown },
                            },
                    dateFields = new[] { nameof(Plant.PlantingDate), nameof(Plant.TransplantDate), nameof(Plant.HarvestDate) }
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var plant = await _plantService.GetByIdAsync(id);
                if (plant == null)
                    return NotFound();

                return Ok(plant);
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddPlantDTO plant)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                int id = await _plantService.AddAsync(plant);
                return CreatedAtAction(nameof(GetById), new { id }, new Plant(id, plant));
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdatePlantDTO plant)
        {
            if (id != plant.PlantId)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _plantService.UpdateAsync(plant);
                return NoContent();
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _plantService.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }
    }
}
