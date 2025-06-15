using CRM.Models;
using ERP.Server.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System;

namespace CRM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController<TEntity> : ControllerBase where TEntity : AgroBase
    {
        protected readonly ILogger _logger;
        protected readonly string _connectionString;

        protected BaseController(ILogger logger, string connectionString)
        {
            _logger = logger;
            _connectionString = connectionString;
        }
        protected BaseController(ILogger logger)
        {
            _logger = logger;
        }
        protected IActionResult HandleError(Exception ex)
        {
            _logger.LogError(ex, "An error occurred");
            IActionResult result = StatusCode(500, "Internal server error");
            switch (ex)
            {
                case InvalidOperationException invalid:
                    result = StatusCode(400, invalid.Message);
                    break;
                case ArgumentNullException argument:
                    result = StatusCode(400, argument.Message);
                    break;
            }
            return result;
        }

        protected async Task<IEnumerable<DropdownItemDTO>> GetDropdownAsync(
            string table,
            string column,
            string? relatedTable = null,
            string? foreignKey = null,
            string? relatedKey = null,
            string? primaryKey = null)
        {
            var result = new List<DropdownItemDTO>();
            using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();

            string query;

            if (!string.IsNullOrEmpty(relatedTable) && !string.IsNullOrEmpty(foreignKey) && !string.IsNullOrEmpty(relatedKey))
            {
                query = $@"
                    SELECT 
                        id = CAST([{table}].[{foreignKey}] AS INT),
                        label = CAST([{relatedTable}].[{column}] AS NVARCHAR(MAX))
                    FROM [{table}]
                    INNER JOIN [{relatedTable}] 
                        ON [{table}].[{foreignKey}] = [{relatedTable}].[{relatedKey}]";
            }
            else
            {
                query = $@"
                    SELECT 
                        id = CAST([{table}].[{primaryKey}] AS INT), 
                        label = CAST([{column}] AS NVARCHAR(MAX)) 
                    FROM [{table}]";
            }

            using var command = new SqlCommand(query, connection);
            using var reader = await command.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                result.Add(new DropdownItemDTO
                {
                    Id = (int)reader["id"],
                    Label = reader["label"].ToString() ?? string.Empty
                });
            }

            return result;
        }
    }
}
