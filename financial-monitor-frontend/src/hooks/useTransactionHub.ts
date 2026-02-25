
import { useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import { Transaction } from "../types/Transaction";

export const useTransactionHub = (
  onTransactionReceived: (tx: Transaction) => void,
  hubUrl: string
) => {
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, { withCredentials: true })
      .withAutomaticReconnect()
      .build();

    connectionRef.current = connection;

    const startHub = async () => {
      try {
        await connection.start();
        console.log("✅ SignalR Connected");

        // רישום המאזין רק לאחר שהחיבור הצליח
        connection.on("NewTransaction", (tx: Transaction) => {
          onTransactionReceived(tx);
        });
      } catch (err) {
        console.error("❌ SignalR Connection Error:", err);
      }
    };

    startHub();

    // ניקוי המשאבים בעת סגירת הקומפוננטה
    return () => {
      if (connection) {
        connection.off("NewTransaction");
        connection.stop();
        console.log("🔌 SignalR Disconnected");
      }
    };
  }, [hubUrl, onTransactionReceived]); // מבטיח שהמאזין יתעדכן אם הפונקציה משתנה
};