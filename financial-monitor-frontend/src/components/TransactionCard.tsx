import { Transaction } from "../types/Transaction";
import { getStatusColor } from "../utils/colorHelpers";
import "../styles/Transactioncard.css"
type Props = { transaction: Transaction };
// ------עבור ה-V0




const getStatusBg = (status: string) => {
  switch (status) {
    case "Completed": return "#f0fdf4";
    case "Failed":    return "#fef2f2";
    case "Pending":   return "#fffbeb";
    default:          return "#f9fafb";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Completed": return "✓";
    case "Failed":    return "✕";
    case "Pending":   return "⏱";
    default:          return "•";
  }
};
// -----
export const TransactionCard = ({ transaction }: Props) => (
//   <div style={{
//     borderRight: `5px solid ${getStatusColor(transaction.status)}`,
//     padding: "15px",
//     backgroundColor: "#fff",
//     boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//     borderRadius: "4px"
//   }}>
//     <strong>סכום: {transaction.amount} {transaction.currency}</strong>
//     <div style={{ fontSize: "0.9em", color: "#555" }}>
//       סטטוס: <span style={{ fontWeight: "bold" }}>{transaction.status}</span>
//     </div>
//     <div style={{ fontSize: "0.8em", color: "#999" }}>
//       מזהה: {transaction.transactionId}
//     </div>
//   </div>
// V0


<div
    className="tx-card"
    style={{
      backgroundColor: getStatusBg(transaction.status),
      borderLeftColor: getStatusColor(transaction.status),
    }}
  >
    {/* Left: status badge + timestamp */}
    <div className="tx-card-left">
      <div
        className="tx-status-badge"
        style={{
          color: getStatusColor(transaction.status),
          backgroundColor: getStatusColor(transaction.status) + "22",
          borderColor: getStatusColor(transaction.status) + "44",
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

    {/* Right: amount + ID + icon */}
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
// ..חדש בהיר
/* <div className="tx-card">
    <div
      className="tx-card-stripe"
      style={{ backgroundColor: getStatusColor(transaction.status) }}
    />
    <div className="tx-card-content">
      <div className="tx-card-top">
        <div className="tx-card-amount-block">
          <span className="tx-card-amount">{transaction.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
          <span className="tx-card-currency">{transaction.currency}</span>
        </div>
        <div
          className="tx-card-status-badge"
          style={{
            backgroundColor: getStatusColor(transaction.status) + "1a",
            color: getStatusColor(transaction.status),
            borderColor: getStatusColor(transaction.status) + "40",
          }}
        >
          <span
            className="tx-card-status-dot"
            style={{ backgroundColor: getStatusColor(transaction.status) }}
          />
          {transaction.status}
        </div>
      </div>
      <div className="tx-card-footer">
        <span className="tx-card-id-label">TXN</span>
        <span className="tx-card-id">{transaction.transactionId}</span>
      </div>
    </div>
  </div> */

// עיצוב כהה
//  <div
//     className="tx-card"
//     style={{ "--status-color": getStatusColor(transaction.status) } as React.CSSProperties}
//   >
//     <div className="tx-card-accent-bar" />

//     <div className="tx-card-body">
//       <div className="tx-card-top">
//         <span className="tx-card-amount">
//           {transaction.amount}
//           <span className="tx-card-currency">{transaction.currency}</span>
//         </span>
//         <span className="tx-card-status">
//           <span className="tx-card-status-dot" />
//           {transaction.status}
//         </span>
//       </div>

//       <div className="tx-card-footer">
//         <span className="tx-card-label">TXN</span>
//         <span className="tx-card-id">{transaction.transactionId}</span>
//       </div>
//     </div>
//   </div>

);