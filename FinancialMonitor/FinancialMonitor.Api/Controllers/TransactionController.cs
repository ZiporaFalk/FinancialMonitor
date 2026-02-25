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

        //private readonly TransactionStore _store;
        //private readonly IHubContext<TransactionHub> _hubContext;
        //private readonly ILogger<TransactionController> _logger;
        public TransactionController(ITransactionService service)
        {
            _service = service;
        }
        //public TransactionController(TransactionStore store,
        //    IHubContext<TransactionHub> hubContext,
        //    ILogger<TransactionController> logger)
        //{
        //    _store = store;
        //    _hubContext = hubContext;
        //    _logger = logger;
        //}

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Transaction transaction)
        {
            //// _store.Add(transaction);
            ////בודק שאין עוד ID כזה
            //if (!_store.Add(transaction))
            //    return Conflict("Transaction already exists");

            //await _hubContext.Clients.All.SendAsync("NewTransaction", transaction);
            ////כותב הלוגים
            //_logger.LogInformation("Transaction received: {Id}", transaction.TransactionId);
            //return Ok();
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
