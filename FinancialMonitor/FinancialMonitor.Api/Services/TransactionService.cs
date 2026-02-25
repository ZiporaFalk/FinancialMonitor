using FinancialMonitor.Api.Hubs;
using FinancialMonitor.Api.Models;
using Microsoft.AspNetCore.SignalR;

namespace FinancialMonitor.Api.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly TransactionStore _store;
        private readonly IHubContext<TransactionHub> _hubContext;
        private readonly ILogger<TransactionService> _logger;

        public TransactionService(
            TransactionStore store,
            IHubContext<TransactionHub> hubContext,
            ILogger<TransactionService> logger)
        {
            _store = store;
            _hubContext = hubContext;
            _logger = logger;
        }

        public async Task<bool> AddTransactionAsync(Transaction transaction)
        {
            var added = _store.Add(transaction);

            if (!added)
                return false;

            await _hubContext.Clients.All
                .SendAsync("NewTransaction", transaction);

            _logger.LogInformation("Transaction received: {Id}", transaction.TransactionId);

            return true;
        }

        public IEnumerable<Transaction> GetAll()
        {
            return _store.GetAll();
        }
    }

}
