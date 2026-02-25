using FinancialMonitor.Api.Hubs;
using FinancialMonitor.Api.Models;
using FinancialMonitor.Api.Services;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using Moq;


namespace FinancialMonitor.Tests
{
    public class TransactionServiceTests
    {
        [Fact]
        public async Task AddTransaction_ShouldStoreAndBroadcast()
        {
            var store = new TransactionStore();

            var mockClients = new Mock<IHubClients>();
            var mockClientProxy = new Mock<IClientProxy>();

            mockClients.Setup(c => c.All)
                .Returns(mockClientProxy.Object);

            var mockHub = new Mock<IHubContext<TransactionHub>>();
            mockHub.Setup(h => h.Clients)
                .Returns(mockClients.Object);

            var mockLogger = new Mock<ILogger<TransactionService>>();

            var service = new TransactionService(
                store,
                mockHub.Object,
                mockLogger.Object);

            var transaction = CreateTransaction();

            var result = await service.AddTransactionAsync(transaction);

            Assert.True(result);
            Assert.Single(store.GetAll());

            mockClientProxy.Verify(
                c => c.SendCoreAsync(
                    "NewTransaction",
                    It.Is<object[]>(o => ((Transaction)o[0]).TransactionId == transaction.TransactionId),
                    default),
                Times.Once);
        }
        [Fact]
        public async Task AddTransaction_Duplicate_ShouldReturnFalse()
        {
            var store = new TransactionStore();

            var mockClients = new Mock<IHubClients>();
            var mockClientProxy = new Mock<IClientProxy>();

            mockClients.Setup(c => c.All)
                .Returns(mockClientProxy.Object);

            var mockHub = new Mock<IHubContext<TransactionHub>>();
            mockHub.Setup(h => h.Clients)
                .Returns(mockClients.Object);

            var mockLogger = new Mock<ILogger<TransactionService>>();

            var service = new TransactionService(
                store,
                mockHub.Object,
                mockLogger.Object);

            var transaction = CreateTransaction();

            await service.AddTransactionAsync(transaction);
            var result = await service.AddTransactionAsync(transaction);

            Assert.False(result);

            // לוודא שלא שודר כלום
            mockClientProxy.Verify(
                c => c.SendCoreAsync(
                    It.IsAny<string>(),
                    It.IsAny<object[]>(),
                    default),
                Times.Once); // רק בפעם הראשונה
        }
  

        private Transaction CreateTransaction()
        {
            return new Transaction
            {
                TransactionId = Guid.NewGuid(),
                Amount = 200,
                Currency = "USD",
                Status = TransactionStatus.Completed,
                Timestamp = DateTime.UtcNow
            };
        }
    }
}
