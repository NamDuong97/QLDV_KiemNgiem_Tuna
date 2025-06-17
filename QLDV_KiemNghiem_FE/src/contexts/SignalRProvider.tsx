// src/contexts/SignalRContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

interface SignalRContextProps {
  connection: signalR.HubConnection | null;
}

const SignalRContext = createContext<SignalRContextProps>({
  connection: null,
});

export const useSignalR = () => useContext(SignalRContext);

export const SignalRProvider = ({
  token,
  hubUrl,
  children,
}: {
  token?: string;
  hubUrl?: string;
  children: React.ReactNode;
}) => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );

  useEffect(() => {
    if (!token || !hubUrl) return;

    const conn = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7233/NotificationHub", {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    conn
      .start()
      .then(() => console.log("✅ SignalR connected:", hubUrl))
      .catch((err) => console.error("❌ SignalR error", err));

    setConnection(conn);
    return () => {
      conn.stop();
    };
  }, [token, hubUrl]);

  return (
    <SignalRContext.Provider value={{ connection }}>
      {children}
    </SignalRContext.Provider>
  );
};
