
import { useEffect, useState, useCallback } from "react";
import { Transaction } from "../types/Transaction";
import { useTransactionHub } from "../hooks/useTransactionHub";
import { fetchTransactions } from "../api/transactionService";
import { TransactionCard } from "../components/TransactionCard";
import "../styles/LiveDashboard.css";
import { AnimatePresence, motion } from "framer-motion";
// V0
type FilterStatus = "All" | "Completed" | "Pending" | "Failed";

export default function LiveDashboard() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    // V0
    const [filter, setFilter] = useState<FilterStatus>("All");
    // ..
    const [highlightedTx, setHighlightedTx] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchTransactions();
                setTransactions(data);
            } catch (err) {
                console.error(err);
            }
        };
        load();
    }, []);

    const onTransactionReceived = useCallback((tx: Transaction) => {
        setTransactions(prev => [tx, ...prev]);
        // ..
        setHighlightedTx(tx.transactionId);
        setTimeout(() => setHighlightedTx(null), 2000); // הדגשה 2 שניות
    }, []);

    useTransactionHub(onTransactionReceived, "http://localhost:5295/transactionHub");
    // V0
    const counts = {
        total: transactions.length,
        completed: transactions.filter(t => t.status === "Completed").length,
        pending: transactions.filter(t => t.status === "Pending").length,
        failed: transactions.filter(t => t.status === "Failed").length,
    };

    const filtered = filter === "All"
        ? transactions
        : transactions.filter(t => t.status === filter);

    console.log("transactions")
    console.log(transactions)

    return (
        <div className="dashboard-root">
            <div className="dashboard-page-header">
                <h1 className="dashboard-page-title">Transaction History</h1>
                <p className="dashboard-page-sub">Track all financial transactions in one place</p>
            </div>

            {/* Stats row */}
            <div className="dashboard-stats">
                <div className="stat-card">
                    <div className="stat-card-right">
                        <span className="stat-card-label">Total Transactions</span>
                        <span className="stat-card-value">{counts.total}</span>
                    </div>
                    <div className="stat-card-icon stat-card-icon--blue">🗂</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-right">
                        <span className="stat-card-label">Completed</span>
                        <span className="stat-card-value stat-card-value--green">{counts.completed}</span>
                    </div>
                    <div className="stat-card-icon stat-card-icon--green">✓</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-right">
                        <span className="stat-card-label">Pending</span>
                        <span className="stat-card-value stat-card-value--yellow">{counts.pending}</span>
                    </div>
                    <div className="stat-card-icon stat-card-icon--yellow">⏱</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-right">
                        <span className="stat-card-label">Failed</span>
                        <span className="stat-card-value stat-card-value--red">{counts.failed}</span>
                    </div>
                    <div className="stat-card-icon stat-card-icon--red">✕</div>
                </div>
            </div>

            {/* Filter bar */}
            <div className="dashboard-filter-bar">
                <div className="dashboard-filter-label">
                    <span className="dashboard-filter-icon">⊟</span>
                    Filter:
                </div>
                <div className="dashboard-filters">
                    {(["All", "Completed", "Pending", "Failed"] as FilterStatus[]).map(f => (
                        <button
                            key={f}
                            className={`filter-btn${filter === f ? " filter-btn--active" : ""}`}
                            onClick={() => setFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* List */}
            {filtered.length === 0 ? (
                <div className="dashboard-empty">
                    <div className="dashboard-empty-icon">⏳</div>
                    <p className="dashboard-empty-title">No transactions found</p>
                    <p className="dashboard-empty-sub">
                        {transactions.length === 0
                            ? "Waiting for new transactions..."
                            : `No ${filter} transactions to display`}
                    </p>
                </div>
            ) : (
                <div className="dashboard-list">
                    <AnimatePresence initial={false}>
                        {filtered.map(tx => (
                            <motion.div
                                key={tx.transactionId}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                layout
                            >
                                <TransactionCard transaction={tx} highlightedTx={highlightedTx} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>

    );
}
