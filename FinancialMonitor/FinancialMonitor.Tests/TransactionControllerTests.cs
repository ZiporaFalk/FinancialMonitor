using FinancialMonitor.Api.Controllers;
using FinancialMonitor.Api.Models;
using FinancialMonitor.Api.Services;
using FinancialMonitor.Api.Hubs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Mvc;
using Moq;


namespace FinancialMonitor.Tests
{
    public class TransactionControllerTests
    {
        [Fact]
        public async Task Post_ShouldReturnOk()
        {
            var mockService = new Mock<ITransactionService>();
            mockService.Setup(s => s.AddTransactionAsync(It.IsAny<Transaction>()))
                .ReturnsAsync(true);

            var controller = new TransactionController(mockService.Object);

            var result = await controller.Post(CreateTransaction());

            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async Task Post_Duplicate_ShouldReturnConflict()
        {
            var mockService = new Mock<ITransactionService>();
            mockService.Setup(s => s.AddTransactionAsync(It.IsAny<Transaction>()))
                .ReturnsAsync(false);

            var controller = new TransactionController(mockService.Object);

            var result = await controller.Post(CreateTransaction());

            Assert.IsType<ConflictObjectResult>(result);
        }

        private Transaction CreateTransaction()
        {
            return new Transaction
            {
                TransactionId = Guid.NewGuid(),
                Amount = 10,
                Currency = "USD",
                Status = TransactionStatus.Pending,
                Timestamp = DateTime.UtcNow
            };
        }
    }
}
