import { Transaction } from "../types/Transaction";
import { getStatusColor } from "../utils/colorHelpers";
import "../styles/Transactioncard.css"
type Props = { transaction: Transaction; highlightedTx?: string | null };

const getStatusBg = (status: string) => {
    switch (status) {
        case "Completed": return "#f0fdf4";
        case "Failed": return "#fef2f2";
        case "Pending": return "#fffbeb";
        default: return "#f9fafb";
    }
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case "Completed": return "✓";
        case "Failed": return "✕";
        case "Pending": return "⏱";
        default: return "•";
    }
};

export const TransactionCard = ({ transaction, highlightedTx }: Props) => (

    <div
        className="tx-card"
        style={{
            backgroundColor: highlightedTx === transaction.transactionId ? "#484848" : getStatusBg(transaction.status),
            borderLeftColor: getStatusColor(transaction.status),
            transition: "background-color 0.4s ease, border-left-color 0.4s ease"
        }}
    >
        <div className="tx-card-left">
            <div
                className="tx-status-badge"
                style={{
                    color: getStatusColor(transaction.status),
                    backgroundColor: getStatusColor(transaction.status) + "22",
                    borderColor: getStatusColor(transaction.status) + "44",
                    transition: "color 0.4s ease, background-color 0.4s ease, border-color 0.4s ease"
                }}
            >
                <span className="tx-status-dot" style={{ background: getStatusColor(transaction.status) }} />
                {transaction.status}
            </div>
            <div className="tx-timestamp">
                {new Date(transaction.timestamp).toLocaleString("en-GB", {
                    day: "2-digit", month: "2-digit", year: "numeric",
                    hour: "2-digit", minute: "2-digit"
                })}
            </div>
        </div>

        <div className="tx-card-right">
            <div className="tx-id">{transaction.transactionId.slice(0, 12).toUpperCase()}</div>
            <div className="tx-amount-row">
                <span className="tx-amount">
                    {transaction.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
                <span className="tx-currency">{transaction.currency}</span>
            </div>
            <div
                className="tx-icon-circle"
                style={{
                    background: getStatusColor(transaction.status) + "22",
                    color: getStatusColor(transaction.status),
                    border: `1.5px solid ${getStatusColor(transaction.status)}44`,
                }}
            >
                {getStatusIcon(transaction.status)}
            </div>
        </div>
    </div>


);