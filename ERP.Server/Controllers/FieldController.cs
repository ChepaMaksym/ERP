using CRM.DTO.Garden;
using CRM.Models;
using CRM.Services;
using CRM.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FieldController : BaseController<Field>
    {
        private readonly IFieldService _fieldService;
        public FieldController(
        IFieldService fieldService,
        ILogger<FieldController> logger,
        IConfiguration configuration)
        : base(logger, configuration.GetConnectionString("DefaultConnection"))
        {
            _fieldService = fieldService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var gardens = await _fieldService.GetAllAsync();
                return Ok(new { data = gardens});
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
                var garden = await _fieldService.GetByIdAsync(id);
                if (garden == null)
                    return NotFound();

                return Ok(garden);
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddGardenDTO garden)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                int id = await _fieldService.AddAsync(garden);
                return CreatedAtAction(nameof(GetById), new { id }, new Field(id, garden));
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateGardenDTO garden)
        {
            if (id != garden.GardenId)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _fieldService.UpdateAsync(garden);
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
                await _fieldService.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }
    }
}