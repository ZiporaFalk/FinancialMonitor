using System.Collections.Concurrent;
using FinancialMonitor.Api.Models;

namespace FinancialMonitor.Api.Services
{
    public class TransactionStore
    {
        private readonly ConcurrentDictionary<Guid, Transaction> _transactions = new();

        public bool Add(Transaction transaction)
        {
            return _transactions.TryAdd(transaction.TransactionId, transaction);
        }
        public IEnumerable<Transaction> GetAll()
        {
            return _transactions.Values;
        }
    }
}