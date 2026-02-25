using System.ComponentModel.DataAnnotations;

namespace FinancialMonitor.Api.Models
{
    public enum TransactionStatus
    {
        Pending,
        Completed,
        Failed
    }
    public class Transaction
    {
        [Required]
        public Guid TransactionId { get; set; }

        [Range(0.01, double.MaxValue)]
        public decimal Amount { get; set; }

        [Required]
        [StringLength(3, MinimumLength = 3)]
        public string Currency { get; set; } = string.Empty;
        public TransactionStatus Status { get; set; }
        public DateTime Timestamp { get; set; }
    }
}