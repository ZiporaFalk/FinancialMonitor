using FinancialMonitor.Api.Models;
using FinancialMonitor.Api.Services;
using FinancialMonitor.Api.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace FinancialMonitor.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _service;

        public TransactionController(ITransactionService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Transaction transaction)
        {
            var success = await _service.AddTransactionAsync(transaction);

            if (!success)
                return Conflict("Transaction already exists");

            return Ok();
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_service.GetAll());
        }


    }
}
