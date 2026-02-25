import axios from "axios";
import { Transaction } from "../types/Transaction";

const BASE_URL = "http://localhost:5295/api";

export const fetchTransactions = async (): Promise<Transaction[]> => {
  const response = await axios.get<Transaction[]>(`${BASE_URL}/transaction`);
  return response.data.reverse();
};

export const postTransaction = async (tx: Transaction) => {
  await axios.post(`${BASE_URL}/transaction`, tx);
};