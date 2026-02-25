import { useState } from "react";
import { postTransaction } from "../api/transactionService";
import { Transaction } from "../types/Transaction";
import "../styles/AddTransaction.css";
type Status = "Pending" | "Completed" | "Failed";

const generateMockTransaction = (): Transaction => {
  const statuses: Status[] = ["Pending", "Completed", "Failed"];
  return {
    transactionId: crypto.randomUUID(),
    amount: parseFloat((Math.random() * 5000 + 1).toFixed(2)),
    currency: "USD",
    status: statuses[Math.floor(Math.random() * statuses.length)],
    timestamp: new Date().toISOString()
  };
};

export default function AddTransaction() {
  const [loading, setLoading] = useState(false);
  const [lastSent, setLastSent] = useState<Transaction | null>(null);

  const sendTransaction = async () => {
    setLoading(true);
    const tx = generateMockTransaction();

    try {
      await postTransaction(tx);
      setLastSent(tx);
      console.log("✅ Transaction sent:", tx);
    } catch (err) {
      console.error("❌ Error sending transaction:", err);
    }

    setLoading(false);
  };

  return (
    
    <div className="add-root">
      <div className="add-page-header">
        <h1 className="add-page-title">Add Transaction</h1>
        <p className="add-page-sub">Generate and send a mock payment to the live stream</p>
      </div>

      <div className="add-card">
        <div className="add-card-section">
          <div className="add-card-icon">⚡</div>
          <div>
            <p className="add-card-eyebrow">PAYMENT SIMULATOR</p>
            <h2 className="add-card-title">Generate Random Transaction</h2>
          </div>
        </div>

        <p className="add-card-description">
          A randomized transaction will be generated with a random status (Completed / Pending / Failed) and pushed to the live monitoring stream instantly.
        </p>

        <button
          className={`add-btn${loading ? " add-btn--loading" : ""}`}
          onClick={sendTransaction}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="add-btn-spinner" />
              Sending...
            </>
          ) : (
            <>
              <span>→</span>
              Generate Transaction
            </>
          )}
        </button>

        {lastSent && (
          <div className="add-last-sent">
            <span className="add-last-sent-label">Last sent:</span>
            <span className="add-last-sent-amount">
              {lastSent.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })} {lastSent.currency}
            </span>
            <span
              className="add-last-sent-status"
              data-status={lastSent.status}
            >
              {lastSent.status}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}