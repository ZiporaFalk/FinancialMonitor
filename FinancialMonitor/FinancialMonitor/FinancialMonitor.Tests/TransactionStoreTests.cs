using FinancialMonitor.Api.Models;
using FinancialMonitor.Api.Services;


namespace FinancialMonitor.Tests
{
    public class TransactionStoreTests
    {
        [Fact]
        public void Add_ShouldStoreTransaction()
        {
            var store = new TransactionStore();
            var transaction = CreateTransaction();

            var result = store.Add(transaction);

            Assert.True(result);
            Assert.Single(store.GetAll());
        }

        [Fact]
        public void Add_Duplicate_ShouldReturnFalse()
        {
            var store = new TransactionStore();
            var transaction = CreateTransaction();

            store.Add(transaction);
            var result = store.Add(transaction);

            Assert.False(result);
            Assert.Single(store.GetAll());
        }

        [Fact]
        public void Concurrent_Adds_ShouldNotLoseData()
        {
            var store = new TransactionStore();

            Parallel.For(0, 100, i =>
            {
                store.Add(CreateTransaction());
            });

            Assert.Equal(100, store.GetAll().Count());
        }

        [Fact]
        public void Concurrent_SameId_ShouldOnlyAddOnce()
        {
            var store = new TransactionStore();
            var id = Guid.NewGuid();

            Parallel.For(0, 50, i =>
            {
                var t = CreateTransaction(id);
                store.Add(t);
            });

            Assert.Single(store.GetAll());
        }

        private Transaction CreateTransaction(Guid? id = null)
        {
            return new Transaction
            {
                TransactionId = id ?? Guid.NewGuid(),
                Amount = 100,
                Currency = "USD",
                Status = TransactionStatus.Pending,
                Timestamp = DateTime.UtcNow
            };
        }
    }
}
