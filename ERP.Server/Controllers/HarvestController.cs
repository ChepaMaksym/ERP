using CRM.DTO.Harvest;
using CRM.Models;
using CRM.QueryManagers.Tables;
using CRM.Services.Interface;
using ERP.Server.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace CRM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HarvestController : BaseController<Harvest>
    {
        private readonly IHarvestService _harvestService;
        public HarvestController(
        IHarvestService harvestService,
        ILogger<HarvestController> logger,
        IConfiguration configuration)
        : base(logger, configuration.GetConnectionString("DefaultConnection"))
        {
            _harvestService = harvestService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var harvest = await _harvestService.GetAllAsync();

                var plantsDropdown = await GetDropdownAsync(PlantColumns.TableName, SeedColumns.Name, SeedColumns.TableName, PlantColumns.PlantId, SeedColumns.SeedId);

                var response = new
                {
                    data = harvest,
                    lookups = new Dictionary<string, IEnumerable<DropdownItemDTO>>
                    {
                        { nameof(Harvest.PlantId) , plantsDropdown }
                    },
                    dateFields = new[] { nameof(Harvest.Date) }
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
                var harvest = await _harvestService.GetByIdAsync(id);
                if (harvest == null)
                    return NotFound();

                return Ok(harvest);
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddHarvestDTO harvest)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                int id = await _harvestService.AddAsync(harvest);
                return CreatedAtAction(nameof(GetById), new { id }, new Harvest(id, harvest));
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateHarvestDTO harvest)
        {
            if (id != harvest.HarvestId)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _harvestService.UpdateAsync(harvest);
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
                await _harvestService.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }
    }
}
