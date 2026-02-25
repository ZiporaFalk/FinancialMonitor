// Types.ts

export type Transaction = {
  transactionId: string;
  amount: number;
  currency: string;
  status: "Pending" | "Completed" | "Failed";
  timestamp: string;
};