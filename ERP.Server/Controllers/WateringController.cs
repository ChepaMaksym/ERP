using CRM.DTO.Watering;
using CRM.Models;
using CRM.QueryManagers.Tables;
using CRM.Services.Interface;
using ERP.Server.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Numerics;

namespace CRM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WateringController : BaseController<Watering>
    {
        private readonly IWateringService _wateringService;
        public WateringController(
        IWateringService wateringService,
        ILogger<WateringController> logger,
        IConfiguration configuration)
        : base(logger, configuration.GetConnectionString("DefaultConnection"))
        {
            _wateringService = wateringService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var watering = await _wateringService.GetAllAsync();
                var plotsDropdown = await GetDropdownAsync(PlotColumns.TableName, PlotColumns.Name, primaryKey: PlotColumns.PlotId);

                var response = new
                {
                    data = watering,
                    lookups = new Dictionary<string, IEnumerable<DropdownItemDTO>>
                    {
                        { nameof(Plot.PlotId) , plotsDropdown },
                    },
                    dateFields = new[] { nameof(Watering.Date) }
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
                var watering = await _wateringService.GetByIdAsync(id);
                if (watering == null)
                    return NotFound();

                return Ok(watering);
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddWateringDTO watering)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                int id = await _wateringService.AddAsync(watering);
                return CreatedAtAction(nameof(GetById), new { id }, new Watering(id, watering));
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateWateringDTO watering)
        {
            if (id != watering.WateringId)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _wateringService.UpdateAsync(watering);
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
                await _wateringService.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }
    }
}
