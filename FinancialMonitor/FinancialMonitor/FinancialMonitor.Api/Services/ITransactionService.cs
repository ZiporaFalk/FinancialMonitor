using FinancialMonitor.Api.Models;

namespace FinancialMonitor.Api.Services
{
    public interface ITransactionService
    {
        Task<bool> AddTransactionAsync(Transaction transaction);
        IEnumerable<Transaction> GetAll();
    }
}
