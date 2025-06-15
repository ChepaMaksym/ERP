using CRM.DTO.Pot;
using CRM.Models;
using CRM.QueryManagers.Tables;
using CRM.Services.Interface;
using ERP.Server.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Reflection.Metadata.BlobBuilder;

namespace CRM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PotController : BaseController<Pot>
    {
        private readonly IPotService _potService;
        public PotController(
        IPotService potService,
        ILogger<PotController> logger,
        IConfiguration configuration)
        : base(logger, configuration.GetConnectionString("DefaultConnection"))
        {
            _potService = potService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var pots = await _potService.GetAllAsync();
                var soilDropdown = await GetDropdownAsync(SoilTypeColumns.TableName, SoilTypeColumns.SoilType, primaryKey: SoilTypeColumns.SoilTypeId);

                var response = new
                {
                    data = pots,
                    lookups = new Dictionary<string, IEnumerable<DropdownItemDTO>>
                    {
                        { nameof(Plot.SoilTypeId) , soilDropdown }
                    },
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
                var pot = await _potService.GetByIdAsync(id);
                if (pot == null)
                    return NotFound();

                return Ok(pot);
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddPotDTO pot)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                int id = await _potService.AddAsync(pot);
                return CreatedAtAction(nameof(GetById), new { id }, new Pot(id, pot));
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdatePotDTO pot)
        {
            if (id != pot.PotId)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _potService.UpdateAsync(pot);
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
                await _potService.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }
    }
}
