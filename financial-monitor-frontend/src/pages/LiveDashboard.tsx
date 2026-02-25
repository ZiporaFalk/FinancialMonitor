
//fetch
// import { useState, useCallback, useEffect } from "react";
// import { useTransactionHub } from "../hooks/useTransactionHub";
// import { Transaction } from "../types/Transaction";

// export default function LiveDashboard() {
//     // מתחילים עם מערך ריק כדי להציג רק עסקאות חדשות
//     const [transactions, setTransactions] = useState<Transaction[]>([]);
//     useEffect(() => {
//         const fetchInitialTransactions = async () => {
//             try {
//                 const response = await fetch("http://localhost:5295/api/transaction");
//                 if (!response.ok) {
//                     throw new Error("Failed to fetch transactions");
//                 }

//                 const data: Transaction[] = await response.json();

//                 // שומר אותם בסטייט (החדשים ביותר למעלה אם צריך)
//                 setTransactions(data.reverse());
//             } catch (error) {
//                 console.error("❌ Error loading initial transactions:", error);
//             }
//         };

//         fetchInitialTransactions();
//     }, []);
//     // פונקציה שמתעדכנת בכל פעם שמגיעה עסקה
//     const onTransactionReceived = useCallback((tx: Transaction) => {
//         setTransactions(prev => [tx, ...prev]);
//     }, []);

//     // שימוש ב-Hook שיצרנו
//     useTransactionHub(onTransactionReceived, "http://localhost:5295/transactionHub");
//     const getStatusColor = (status: "Pending" | "Completed" | "Failed") => {
//         switch (status) {
//             case "Completed":
//                 return "#27ae60"; // ירוק
//             case "Failed":
//                 return "#e74c3c"; // אדום
//             case "Pending":
//             default:
//                 return "#f1c40f"; // צהוב
//         }
//     };
//     return (
//         <div style={{ padding: "20px", direction: "rtl", fontFamily: "Arial, sans-serif" }}>
//             <h2 style={{ color: "#2c3e50" }}>Real-time transaction monitor</h2>
//             <hr />

//             {transactions.length === 0 ? (
//                 <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "5px" }}>
//                     ℹ️ Waiting for new transactions...
//                 </div>
//             ) : (
//                 <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
//                     {transactions.map((tx) => (
//                         <div key={tx.transactionId} style={{
//                             borderRight: `5px solid ${getStatusColor(tx.status)}`, padding: "15px",
//                             backgroundColor: "#fff",
//                             boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//                             borderRadius: "4px"
//                         }}>
//                             <strong>סכום: {tx.amount} {tx.currency}</strong>
//                             <div style={{ fontSize: "0.9em", color: "#555" }}>
//                                 סטטוס: <span style={{ fontWeight: "bold" }}>{tx.status}</span>
//                             </div>
//                             <div style={{ fontSize: "0.8em", color: "#999" }}>
//                                 מזהה: {tx.transactionId}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }
//axios

// import { useState, useCallback, useEffect } from "react";
// import axios from "axios"; // הוספנו axios
// import { useTransactionHub } from "../hooks/useTransactionHub";
// import { Transaction } from "../types/Transaction";

// export default function LiveDashboard() {
//     const [transactions, setTransactions] = useState<Transaction[]>([]);

//     useEffect(() => {
//         const fetchInitialTransactions = async () => {
//             try {
//                 const response = await axios.get<Transaction[]>(
//                     "http://localhost:5295/api/transaction"
//                 );

//                 // ב-axios, הנתונים נמצאים ב-response.data
//                 setTransactions(response.data.reverse());
//             } catch (error) {
//                 console.error("❌ Error loading initial transactions:", error);
//             }
//         };

//         fetchInitialTransactions();
//     }, []);

//     const onTransactionReceived = useCallback((tx: Transaction) => {
//         setTransactions(prev => [tx, ...prev]);
//     }, []);

//     useTransactionHub(onTransactionReceived, "http://localhost:5295/transactionHub");

//     const getStatusColor = (status: "Pending" | "Completed" | "Failed") => {
//         switch (status) {
//             case "Completed":
//                 return "#27ae60";
//             case "Failed":
//                 return "#e74c3c";
//             case "Pending":
//             default:
//                 return "#f1c40f";
//         }
//     };

//     return (
//         <div style={{ padding: "20px", direction: "rtl", fontFamily: "Arial, sans-serif" }}>
//             <h2 style={{ color: "#2c3e50" }}>Real-time transaction monitor</h2>
//             <hr />

//             {transactions.length === 0 ? (
//                 <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "5px" }}>
//                     ℹ️ Waiting for new transactions...
//                 </div>
//             ) : (
//                 <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
//                     {transactions.map((tx) => (
//                         <div key={tx.transactionId} style={{
//                             borderRight: `5px solid ${getStatusColor(tx.status)}`,
//                             padding: "15px",
//                             backgroundColor: "#fff",
//                             boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//                             borderRadius: "4px"
//                         }}>
//                             <strong>סכום: {tx.amount} {tx.currency}</strong>
//                             <div style={{ fontSize: "0.9em", color: "#555" }}>
//                                 סטטוס: <span style={{ fontWeight: "bold" }}>{tx.status}</span>
//                             </div>
//                             <div style={{ fontSize: "0.8em", color: "#999" }}>
//                                 מזהה: {tx.transactionId}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }


//with services
import { useEffect, useState, useCallback } from "react";
import { Transaction } from "../types/Transaction";
import { useTransactionHub } from "../hooks/useTransactionHub";
import { fetchTransactions } from "../api/transactionService";
import { TransactionCard } from "../components/TransactionCard";
import "../styles/LiveDashboard.css";
// V0
type FilterStatus = "All" | "Completed" | "Pending" | "Failed";

export default function LiveDashboard() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    // V0
    const [filter, setFilter] = useState<FilterStatus>("All");

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

    return (
        // <div style={{ padding: 20, direction: "rtl" }}>
        //   <h2>Real-time transaction monitor</h2>
        //   <hr />
        //   {transactions.length === 0 ? (
        //     <div>ℹ️ Waiting for new transactions...</div>
        //   ) : (
        //     <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        //       {transactions.map(tx => <TransactionCard key={tx.transactionId} transaction={tx} />)}
        //     </div>
        //   )}
        // </div>
        // חדש
        //  <div className="dashboard-root">
        //     <div className="dashboard-header">
        //         <div className="dashboard-title-group">
        //             <span className="dashboard-live-badge">
        //                 <span className="dashboard-live-dot" />
        //                 LIVE
        //             </span>
        //             <h2 className="dashboard-title">Transaction Monitor</h2>
        //         </div>
        //         <div className="dashboard-count">
        //             {transactions.length} <span>transactions</span>
        //         </div>
        //     </div>

        //     <div className="dashboard-divider" />

        //     {transactions.length === 0 ? (
        //         <div className="dashboard-empty">
        //             <div className="dashboard-empty-icon">⏳</div>
        //             <p className="dashboard-empty-title">Awaiting Transactions</p>
        //             <p className="dashboard-empty-sub">New payments will appear here in real time</p>
        //         </div>
        //     ) : (
        //         <div className="dashboard-list">
        //             {transactions.map(tx => (
        //                 <TransactionCard key={tx.transactionId} transaction={tx} />
        //             ))}
        //         </div>
        //     )}
        // </div>
        // עיצוב בהיר
        // <div className="dashboard-root">
        //     <div className="dashboard-header">
        //         <div className="dashboard-header-glow" />
        //         <div className="dashboard-title-row">
        //             <span className="dashboard-live-badge">● LIVE</span>
        //             <h2 className="dashboard-title">Real-time transaction monitor</h2>
        //         </div>
        //         <div className="dashboard-divider" />
        //     </div>

        //     {transactions.length === 0 ? (
        //         <div className="dashboard-empty">
        //             <span className="dashboard-empty-icon">⏳</span>
        //             <span>Waiting for new transactions...</span>
        //         </div>
        //     ) : (
        //         <div className="dashboard-list">
        //             {transactions.map(tx => (
        //                 <TransactionCard key={tx.transactionId} transaction={tx} />
        //             ))}
        //         </div>
        //     )}
        // </div>
        // V0
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
                    {filtered.map(tx => (
                        <TransactionCard key={tx.transactionId} transaction={tx} />
                    ))}
                </div>
            )}
        </div>

    );
}